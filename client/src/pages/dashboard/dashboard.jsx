import React,{useEffect} from "react";
import axios from "axios";
import Layout from "../../components/layout/layout";


function Dashboard() {
  const getData = async () => {
    try {
      const response = await axios.post('/api/user/get-user-info-by-id',{}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("sh-token"),
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
      <Layout>
     Home
    </Layout>
      );
  }
  
  export default Dashboard;