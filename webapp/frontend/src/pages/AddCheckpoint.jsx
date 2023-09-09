import React, { useEffect } from "react";
import Layout from "./Layout";
import AddCheckpoint from "../components/Routes/AddCheckpoint";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams  } from "react-router-dom";
import { getMe } from "../features/authSlice";

const CheckpointAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  return (
    <Layout>
      <AddCheckpoint />
    </Layout>
  );
};

export default CheckpointAdd;