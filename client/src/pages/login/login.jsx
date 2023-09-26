import React from "react";
import { Button,Form,Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import axios from "axios";
import { hideLoading,showLoading } from "../../redux/reducer/alertSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish =async (values) => {
   try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      console.log('login-api',response)
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        toast("Redirecting to your Dashboard")
        localStorage.setItem('sh-token',response.data.data.token)
        localStorage.setItem('sh-user-id',response.data.data.id)
        navigate("/dashboard");
      } else {
        dispatch(hideLoading());
        toast.error(response.data.message);
      }
    } catch (error) {
     
      toast.error("Something went wrong");
    }
      };
  
    return (
        <div className="authentication">
          <div className="authentication-form card p-3">
            <h1 className="card-title">Welcome Back</h1>
            <Form layout="vertical"  onFinish={onFinish}>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>
    
              
              <Button className="primary-button my-2 full-width-button" htmlType="submit">
                LOGIN
              </Button>
    
              <Link to="/register" className="anchor mt-2">
                CLICK HERE TO REGISTER
              </Link>
             
            </Form>
          </div>
        </div>
      );
  }
  
  export default Login;