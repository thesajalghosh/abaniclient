import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = ({ children, headerEle, backButton }) => {
  return (
    <>
      <Header headerEle={headerEle} backButton={backButton} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
