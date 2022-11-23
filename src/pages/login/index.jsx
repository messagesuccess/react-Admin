import React from "react";
import {useNavigate,Navigate} from "react-router-dom";
import "./login.scss";
import logo from "../../assets/images/logo.png";
import { Button, Checkbox, Form, Input,message } from "antd";
import { reqlogin } from "../../api";
import  storage  from "../../utils/storageUtils.js";
//登陆的路由组件
export default function Login() {
  const navigate = useNavigate()
  const onFinish = async (values) => {
  
    storage.saveUser(values.username)
        navigate('/',{replace:true})

    //在这里表单验证成功发送akax请求
    // const { username, password } = values;
    
    //   const result = await reqlogin(username, password);
    
    //   if(result.status === 0 ){
    //     message.success('登陆成功')
    //     storage.saveUser(result.data.username)
    //     navigate('/',{replace:true})

    //   }else{
    //     message.error(result.msg)
    //   }



  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  if(localStorage.getItem('user_key')){
   return  <Navigate to='/' />
  }
  return (
    <div className="login">
      <header>
        <img src={logo} alt="" />
        <h1>后台管理系统</h1>
      </header>
      <Form
        name="basic"
        labelCol={{
          span: 9,
        }}
        wrapperCol={{
          span: 7,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入用户名",
            },
            { min: 4, message: "用户名至少四位" },
            { max: 8, message: "用户名最多八位" },
            {
              whitespace: true,

              pattern: /^admin$/,
              message: "用户名初始是admin"
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "请输入密码",
            },
            { min: 4, message: "密码至少四位" },
            { max: 8, message: "密码最多八位" },
            {
              whitespace: true,

              pattern: /^admin$/,
              message: "密码初始是admin",

            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 9,
            span: 10,
          }}
        >
          <Checkbox>记住密码</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 11,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
