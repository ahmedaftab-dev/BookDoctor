import React,{useEffect} from "react";
import axios from "axios";


function Dashboard() {
  const getData = async () => {
    try {
      const response = await axios.post('/api/user/get-user-info-by-id',{}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    getData();
  }, []);
    return (
        <div className="authentication">
          <div className="authentication-form card p-3">
            <h1 className="card-title">Dashboard</h1>
            
          </div>
        </div>
      );
  }
  
  export default Dashboard;