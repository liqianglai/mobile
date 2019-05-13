import React, { Component } from "react";
import { Button } from "antd-mobile";

import api_weixin from "../../server/api_weixin";
import styles from "./location.module.less";

class WeixinLocation extends Component {
  componentDidMount() {
    this.sign();
    this.addScript();
  }

  sign = () => {
    api_weixin
      .token()
      .then(api_weixin.getticket)
      .then(res => {
        console.log(res);
      })
      .catch();
  };

  addScript = () => {
    const script = document.createElement("script");
    script.setAttribute("defer", true);
    script.setAttribute("src", "http://res.wx.qq.com/open/js/jweixin-1.4.0.js");
    script.onload = this.loadAfter;
    document.body.appendChild(script);
  };

  loadAfter = () => {
    const wx = window.wx;
    if (wx) {
      wx.config({
        debug: false,
        appId: "wx46d79d44faabe832",
        timestamp: "1414587457",
        nonceStr: "lailiqiang",
        signature: "04589325b6eadb3e556eae4dcca5eb4c95bc1339",
        jsApiList: ["getLocation", "openLocation"]
      });
    }
  };

  go = () => {
    const wx = window.wx;
    wx.ready(function() {
      wx.openLocation({
        latitude: 39.917854,
        longitude: 116.397006, // 经度，浮点数，范围为180 ~ -180。
        name: "故宫", // 位置名
        address: "故宫博物院", // 地址详情说明
        infoUrl: "http://www.baidu.com" // 在查看位置界面底部显示的超链接,可点击跳转
      });
    });
    window.wx.error(function(err) {
      console.log("err", err);
    });
  };

  render() {
    return (
      <div className={styles.location}>
        <Button onClick={this.go}>导航去故宫</Button>
        <Button
          onClick={() => {
            window.wx.closeWindow();
          }}
        >
          关闭网页
        </Button>
      </div>
    );
  }
}

export default WeixinLocation;
