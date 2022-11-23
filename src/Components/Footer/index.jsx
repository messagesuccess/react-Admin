import React from 'react'
import "./footer.scss";
import logo from "../../assets/images/GitHublogo.png";
export default function Footer() {
  return (
    <footer>后台管理系统<a target='blank' href='https://github.com/messagesuccess/react-Admin/tree/master'><img src={logo} alt=''/></a></footer>
  )
}
