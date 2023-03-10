import React from "react";
import { Button,Form,Input,Checkbox } from 'antd';
import { Link,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import { hideLoading,showLoading } from "../../redux/reducer/alertSlice";

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onFinish =async (values) => {
        try {
            dispatch(showLoading());
            console.log('values',values)
            const response = await axios.post("/api/user/register", values);
            dispatch(hideLoading());
            if (response.data.success) {
              toast.success(response.data.message);
              navigate("/login");
            } else {
              toast.error(response.data.message);
            }
          } catch (error) {
            dispatch(hideLoading());
            toast.error("Something went wrong");
          }
      };
    
    return (
        <div className="authentication">
          <div className="authentication-form card p-3">
            <h1 className="card-title">Nice To Meet U</h1>
            <Form 
            layout="vertical"    
            onFinish={onFinish}    
           >
              <Form.Item label="First Name" name="fname">
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lname">
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input placeholder="Password" type="password" />
              </Form.Item>
              <Form.Item name="isDoctor" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Applying as a Doctor</Checkbox>
              </Form.Item>
    
              <Button
                className="primary-button my-2 full-width-button"
                htmlType="submit"
              >
                REGISTER
              </Button>
    
              <Link to="/login" className="anchor mt-2">
                CLICK HERE TO LOGIN
              </Link>
            </Form>
          </div>
        </div>
      );
  }
  
  export default Register;