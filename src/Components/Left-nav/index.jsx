import React, { Fragment, useState, } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  ContainerOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import "./leftnav.scss";
import logo from "../../assets/images/logo.png";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    "首页",
    "/",
    <Link to="/">
      <MailOutlined />
    </Link>
  ),
  getItem("商品", "/ca", <AppstoreOutlined />, [
    getItem("品类管理", "/category", <Link to="/category"></Link>),
    getItem("商品管理", "/produc", <Link to="/produc"></Link>),
  ]),

  getItem(
    "用户管理",
    "/user",
    <Link to="/user">
      <SettingOutlined />
    </Link>
  ),
  getItem(
    "角色管理",
    "/role",
    <Link to="role">
      <DesktopOutlined />
    </Link>
  ),
  getItem("图形图表", "sub5", <ContainerOutlined />, [
    getItem("柱形图", "7"),
    getItem("饼图", "8"),
    getItem("折线图", "9"),
  ]),
];
export default function Leftnav() {

  let path = useLocation().pathname;
  let [current, setCurrent] = useState(path);
  const [theme, setTheme] = useState("dark");
if(path.indexOf('/produc') === 0){
  current='/produc'
  path='/produc'
}
  
  return (
    <Fragment>
      <div className="leftnav-div">
        <img src={logo} alt="请刷新重试" />
        <p>导航</p>
      </div>
      <Menu
        theme={theme}
      
        style={{
          width: 200,
          position: "absolute",
          left: "0px",
        }}
       
        defaultOpenKeys={[current==='/category'||current==='/produc' ? '/ca' : path ]}
        selectedKeys={[path]}
        
        mode="inline"
        items={items}
      />
    </Fragment>
  );
}
