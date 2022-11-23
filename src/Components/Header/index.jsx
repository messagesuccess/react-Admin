import React, { Fragment, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./header.scss";
import storage from "../../utils/storageUtils.js";
import weather from "../../assets/images/weather.jpg";
import axios from "axios";
import moment from "moment";
import { Button, Modal, Space } from "antd";

const LocalizedModal = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const okHideModal = () => {
  setTimeout(() => {
    navigate("/login");
    storage.remove();
  }, 1000);
  };
  const cancelHideModal = () => {
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        退出登录
      </Button>
      <Modal
        title="退出登录"
        open={open}
        onOk={okHideModal}
        onCancel={cancelHideModal}
        okText="确认"
        cancelText="取消"
      >
        <p>确定退出登录吗？</p>
      </Modal>
    </>
  );
};
export default function Header() {
  const [date, setDate] = useState("");
  const [Weather, setWeather] = useState("");
  const [title, setTitle] = useState("首页");
  let path = useLocation().pathname;
  if(path.indexOf('/produc') === 0){
  
    path='/produc'
  }
  useMemo(() => {
    const obj = {
      "/": "首页",
      "/category": "品类管理",
      "/produc": "商品管理",
      "/user": "用户管理",
      "/role": "角色管理",
    };
   
    setTitle(obj[path]);
  }, [path]);
  const user = storage.getUser();
  useEffect(() => {
    // 发送天气请求
    axios({
      url: "https://restapi.amap.com/v3/weather/weatherInfo?key=e7f3e77f7b5b4363cae890b0192b241d&city=330100",
      method: "GET",
    }).then((responce) => {
      setWeather(responce.data.lives[0].weather);
    });
    const timer = setInterval(() => {
      const time = moment().format("YYYY-MM-DD hh:mm:ss");
      setDate(time);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Fragment>
      <div className="header">
        <div className="header-top">
          欢迎,{user}&nbsp;&nbsp;
          <Space>
            <LocalizedModal />
          </Space>
        </div>

        <div className="header-bottom">
          <p>{title}</p>
          <div>
            <span>{date}</span>&nbsp;&nbsp;
            <img src={weather} alt="" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span>{Weather}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
        </div>
      </div>
    </Fragment>
  );
}
