import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Modal } from "antd-mobile";

import router_config from "./router_config";
import loadingSvg from "../assets/images/loading.svg";

const isDevelopment = process.env.NODE_ENV === "development";

const getRoute = ({ path, component, exact = true }) => (
  <Route
    key={path}
    exact={exact}
    path={path}
    component={lazy(() =>
      import(
        /* webpackChunkName: "[request]" */ `../views/${component.slice(1)}`
      )
    )}
  />
);

const RouteList = [];

function renderRoute(obj = router_config) {
  for (let key in obj) {
    const item = obj[key];
    RouteList.push(getRoute(item));
    if (typeof item.children === "object") renderRoute(item.children);
  }
}
renderRoute();

const Loading = (
  <div
    style={{
      height: "100vh",
      background: `no-repeat center url(${loadingSvg})`
    }}
  />
);

export default () => (
  <Router
    getUserConfirmation={(message, callback) => {
      Modal.alert("提示", message, [
        { text: "取消", onPress: () => callback(false) },
        { text: "确定", onPress: () => callback(true) }
      ]);
    }}
  >
    {isDevelopment && (
      <button
        style={{ position: "fixed", top: "0", right: "0", zIndex: 9999 }}
        onClick={() => {
          window.history.back();
        }}
      >
        返回
      </button>
    )}
    <Suspense maxDuration={300} fallback={Loading}>
      {RouteList}
    </Suspense>
  </Router>
);
