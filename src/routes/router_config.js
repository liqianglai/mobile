// component 文件路径，相对 /src/views
import router_weixin from "./router_weixin";

export default {
  navigation: {
    path: "/",
    component: "/navigation"
  },
  home: { path: "/home", component: "/home" },
  news: {
    path: "/news",
    component: "/news",
    exact: false,
    children: {
      list: {
        path: "/news/list",
        component: "/news/list"
      },
      add: {
        path: "/news/add",
        component: "/news/add"
      },
      hot: {
        path: "/news/hot",
        component: "/news/hot",
        exact: false,
        children: {
          list: {
            path: "/news/hot/list",
            component: "/news/hot/list"
          }
        }
      }
    }
  },
  weixin: router_weixin
};
