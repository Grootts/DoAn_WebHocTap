import React from "react";
import { Outlet } from "react-router-dom";
import About from "../about/About";
import Head from "../common/header/Head";
import styles from "./Home.module.css";
const Home = () => {
  return (
    <>
      <Head />
      <Outlet />
    </>
  );
};

export default Home;
