import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../common/footer/Footer";
import Head from "../../common/header/Head";

const Home = () => {
  return (
    <>
      <Head />
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
