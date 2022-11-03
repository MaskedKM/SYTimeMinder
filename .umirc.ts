export default {
  npmClient: "yarn",
  title: "周末提醒小助手",
  publicPath: "/",
  runtimePublicPath: {},
  proxy: {
    "/api": {
      target: "http://39.108.64.233:8080",
      // target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
};
