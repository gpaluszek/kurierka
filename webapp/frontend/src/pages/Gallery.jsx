import React, { useEffect } from "react";
import Layout from "./Layout";
import      DisplayImages from "../components/Image/MainImage.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams  } from "react-router-dom";
import { getMe } from "../features/authSlice";

const MainGallery = () => {
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
      <DisplayImages />
    </Layout>
  );
};

export default MainGallery;