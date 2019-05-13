import React, { Component } from "react";
import { Link } from "react-router-dom";

import router_config from "../routes/router_config";
import styles from "./navigatin.module.less";

const LinkList = [];
function renderLinks(obj = router_config) {
  for (let key in obj) {
    const item = obj[key];
    LinkList.push(
      <Link key={item.path} to={item.path}>
        {item.path}
      </Link>
    );
    if (typeof item.children === "object") renderLinks(item.children);
  }
}
renderLinks();

class Navigation extends Component {
  render() {
    return (
      <div className={styles.nav}>
        <h3 className={styles.title}>导航页面</h3>
        <section>{LinkList}</section>
      </div>
    );
  }
}

export default Navigation;
