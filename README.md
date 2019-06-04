# Mobile

![node>=8.9.0](https://img.shields.io/badge/node-%3E%3D8.9.0-green.svg)

## 环境搭建

- [Node.js 环境 >= 8.9.0](https://nodejs.org/en/)
- 包管理工具 npm Node.js 自带，推荐使用 [Yarn](https://yarnpkg.com/zh-Hant/)
- CSS 预处理，如果使用 [Sass](https://www.sass.hk/install/) 需要 [Ruby 环境](https://rubyinstaller.org/downloads/)

## 运行、发布

```bash
# 运行
npm run dev/start # or yarn dev/start

# 发布
npm run build # or yarn build
```

## 增量更新

```bash
# 需要部署的必须文件
/build/*.*
/build/static/js/修改的页面
/build/static/js/runtime~main.xxx.js
# 第三方库，添加或删除需要
/build/static/js/[数字].xxx.js
```

## 部署 相对路径

- 打包前修改如下文件
  - `/src/routes/index.js@basename`

## 部分功能

- CSS

  - 预处理 Less
  - Module 文件格式 `index.module.css index.module.less`

- JavaScript 新特性 ES6/Async/Await/Object Rest/Spread/动态 import

- React 内置代码分割，懒加载 `Suspense lazy`

- Ant Design Mobile 按需加载、主题定制 `/config-overrides.js@modifyVars`

- 多个代理设置 `/src/setupProxy.js`

- 路由嵌套（子路由）

- 路由跳转确认 Prompt
  - 已知问题，点击浏览器的前进按钮，触发 `Prompt` ，此时取消，浏览器地址栏已经变更

## 技术栈

### JavaScript

- [ECMAScript 6](http://es6.ruanyifeng.com/)
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Fetch API](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)
- [Axios](https://www.npmjs.com/package/axios)

### CSS

- [Flex](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Sass](https://www.sass.hk/)
- [Less](https://www.html.cn/doc/less/)
- [CSS Modules](https://github.com/css-modules/css-modules)

### UI 库

- [Ant Design](https://ant.design/docs/react/introduce-cn)
- [Ant Design Mobile](https://mobile.ant.design/docs/react/introduce-cn)

### 构建工具

- [webpack](https://webpack.js.org/)

### 脚手架

- [Create React App](https://facebook.github.io/create-react-app/)
- [DvaJS](https://dvajs.com/guide/)
- [UmiJS](https://umijs.org/zh/guide/)

## 一些问题

- 代码格式化问题，推荐使用 [Prettier](https://prettier.io/)，代码提交前，请尽量格式化 _可以设置保存自动格式化，不同编辑器自行查找设置方法_
- 一般脚手架搭建的环境都有代码校验支持（ESLint，TSLint 等），请注意提示信息，尽量改掉，还代码一个整洁干净的环境
- 页面大小改变时导致页面可能出现空白的问题

  ```js
  // 跟路由页面监听 resize 事件，重新 render，主要代码如下
  // 节流函数，避免频繁 render
  const throttle = (fn, interval = 300, ...args) => {
    let canExecute = true;
    return function() {
      if (!canExecute) return;
      canExecute = false;
      setTimeout(() => {
        fn.apply(this, args);
        canExecute = true;
      }, interval);
    };
  };

  componentDidMount() {
    window.addEventListener("resize", throttle(this.refresh));
  }

  refresh = () => {
    this.setState({ _r: Date.now() });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", throttle(this.refresh));
  }
  ```

- 页面的一些问题（使用 React Router 做路由管理）

  - 新增

  ```js
  // 基本使用，简单易懂，页面多使用较麻烦，跳转页面时需要写死 pathname
  import ComponentA from "../pages/a";

  <Router>
    <Switch>
      <Route path="/a" component={ComponentA} />
    </Switch>
  </Router>;

  // 使用配置方式，做配置即可，具体参考 /src/routes/index.js
  // router.config.js
  const routerConfig = {
    navigation: {
      path: "/",
      component: "/navigation"
    },
    home: { path: "/home", component: "/home" },
    news: {
      path: "/news",
      component: "/news",
      exact: false, // 是否和后代的路由为父子关系，默认为 true，true-没有关系 false-父子关系
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
    }
  };
  ```

  - 传值

  ```bash
  # 方式一
  /router?p1=v1&p2=v2
  # 取值
  解析 window.location.search(?p1=v1&p2=v2) 即可

  # 方式二
  /router/:p1/:p2
  # 取值
  const {p1, p2} = this.props.match.params;

  # 方式三
  const path = {
    pathname : '/router',
    query : {
      p1: v1,
      p2: v2
    }
  }
  # 取值，页面刷新 v1 v2 丢失
  const {p1, p2} = this.props.location.query;

  # 方式四
  const path = {
    pathname : '/router',
    state : {
      p1: v1,
      p2: v2
    }
  }
  # 取值
  const {p1, p2} = this.props.location.state;
  ```

  - 查找页面，根据路径查找即可

  - 依赖加载，可以使用 `Suspense lazy` 或 `lazy-load-react` 或 `react-loadable`

- 单页面应用部署问题

  - 前后台一块部署

  ```bash
  # JAVA拦截器拦截特定字符做统一跳转
  ```

  - 前后台分开部署

  ```bash
  # Nginx修改反回状态码
  # 接口 location
  location /api {
    proxy_pass http://api.server.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    rewrite ^/api(/.*)$ $1 break;
  }
  # 前端代码 location
  location /front_end {
    root /data;
    error_page 404 =200 /front_end/index.html;
  }
  ```

## 一些项目

- 京师爱幼 `svn://192.168.0.204/PlatformProduction/src/mobile/jingshixinya`
- 高中智慧课堂 `svn://192.168.0.204/UCBook3.0/src/highSchool`

## License

![协议](https://img.shields.io/apm/l/vim-mode.svg)
