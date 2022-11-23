import React, { Fragment } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Layout } from "antd";

import Footer from "../../Components/Footer";
import Leftnav from "../../Components/Left-nav";
import Header from "../../Components/Header";
// import Content from "../../Components/Content";


//用于管理后台的路由页面
export default function Admin() {
  const { Sider ,Content} = Layout;
  
  if (!localStorage.getItem("user_key")) {
    return <Navigate to="/login" />;
  }
  return (
    <Fragment>
      <Layout style={{ height: "100%" }}>
        <Sider>
          <Leftnav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{margin:'20px',backgroundColor:'white'}}>
          
            <Outlet/>
          </Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
}
