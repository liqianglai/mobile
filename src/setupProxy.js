const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api_okayapi", {
      target: "http://hb5.api.okayapi.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api_okayapi": "/"
      }
    })
  );
  app.use(
    proxy("/api_weixin", {
      target: "https://api.weixin.qq.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api_weixin": "/"
      }
    })
  );
};
