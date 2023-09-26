import React from "react";
import { Tabs, TimePicker } from "antd";
import Layout from "../../components/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { Await, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/reducer/alertSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { setUser } from "../../redux/reducer/userSlice";


function Notifications() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const config={
    headers: {
      Authorization: `Bearer ${localStorage.getItem("sh-token")}`,
    },
  }
  const markSeenNotifivcation=async ()=>{
    try{
      dispatch(showLoading())
      const response=await axios.post('api/user/mark-unseen-as-seen-notifications',{ userID : user._id},config)
      if(response.data.success){
        toast.success(response.data.message)
        dispatch(setUser(response.data.data))
      }
      else{
        toast.error('failed to mark as seen, try again')
      }
      dispatch(hideLoading())
    }
    catch{
      console.log('error')
      toast.error('failed to mark as seen, try again')
      dispatch(hideLoading())
    }
  }
const deleteAll=async ()=>{
  try{
    dispatch(showLoading())
    const response=await axios.post('api/user/delete-all-notifications',{ userID : user._id},config)
    if(response.data.success){
      toast.success(response.data.message)
      dispatch(setUser(response.data.data))
    }
    else{
      toast.error('failed to mark as seen, try again')
    }
    dispatch(hideLoading())
  }
  catch{
    console.log('error')
    toast.error('failed to mark as seen, try again')
    dispatch(hideLoading())
  }
}
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <hr />
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=>markSeenNotifivcation()} >Mark all as seen</h1>
          </div>

          {user?.unseenNotifications.map((notification) => (
            <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=>deleteAll()}>Delete all</h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;