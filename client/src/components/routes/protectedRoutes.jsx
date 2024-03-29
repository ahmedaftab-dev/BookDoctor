import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../../redux/reducer/userSlice";
import { showLoading, hideLoading } from "../../redux/reducer/alertSlice";

export const ProtectedRoute=(props)=> {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("sh-token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sh-token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        localStorage.clear()
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear()
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);

  if (localStorage.getItem("sh-token")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

