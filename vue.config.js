module.exports = {
  // 配置 axios 代理请求
  devServer: {
    proxy: {
      "/api": {
        target: "http://cloud2.test", //目标域名
        changeOrigin: true, //默认false，changes the origin of the host header to the target URL
        // ws: true, //是否需要proxy websockets
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求https://www.cloud2.test/XXXXX这个地址的时候直接写成/api即可
          "^/api": "/"
        }
      }
    }
  }
};
