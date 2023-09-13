import React from "react";
import { Tabs, TimePicker } from "antd";
import Layout from "../../components/layout/layout";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";


function Notifications() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();


  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <hr />
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={0}>
          {/* <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=>markAllAsSeen()}>Mark all as seen</h1>
          </div>

          {user?.unseenNotifications.map((notification) => (
            <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          ))} */}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          {/* <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={()=>deleteAll()}>Delete all</h1>
          </div>
          {user?.seenNotifications.map((notification) => (
            <div className="card p-2 mt-2" onClick={()=>navigate(notification.onClickPath)}>
                <div className="card-text">{notification.message}</div>
            </div>
          ))} */}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;