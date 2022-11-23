import ajax from "./ajax";
//登录请求
export const reqlogin = (username,password)=> ajax('/login','POST',{username,password})
//添加用户
export const reqsdduser = (user)=> ajax('/manage/user/add','POST',user)
//获取一级二级列表
export const reqCategory = (parentId)=>ajax('/manage/category/list','GET',{parentId})
//添加列表数据
export const reqAddCategory = (categoryName,parentId)=>ajax('/manage/category/add','POST',{categoryName,parentId})
//更新列表数据
export const reqUpdateCategory = ({categoryName,categorytId})=>ajax('/manage/category/update','POST',{categoryName,categorytId})
//获取商品列表数据
export const reqproduction= ({pageNum,pageSize})=>ajax('/manage/product/list','GET',{pageNum,pageSize})