//配置代理解决跨域
const proxy = require('http-proxy-middleware');
module.exports = function (app) {

  return  app.use(
        proxy.createProxyMiddleware('/api1', {
            target: "http://localhost:5000",    //访问路径
            changOrigin: true,
            pathRewrite: { "^/api1": "" }
        })
        
    )
}