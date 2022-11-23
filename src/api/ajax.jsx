import axios from "axios";
import { message } from "antd";
export default function ajax(url,method='GET',data={}) {
    //优化   返回一个promise，内部调用resovle向下传递then，而错误信息在这里统一处理不向下传递
   return new Promise((resolve, reject) => {
    
   const promise =  axios({
        url:'http://localhost:3000/api1' + url,
        method:method,
        data:data
    })
    promise.then((resbonce)=>{
        resolve(resbonce.data)
    })
    .catch((error)=>{
          message.error('请求出错'+ error)
    })


   })
     
}