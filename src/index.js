import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Router from "./routes";
import "./assets/stylesheets/_reset.css";
import "./assets/stylesheets/common.less";

ReactDOM.render(<Router />, document.getElementById("root"));

serviceWorker.unregister();
