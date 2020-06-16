import React from "react";
import ReactDOM from "react-dom";
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import "./index.css";
import ApiApp from "./components/gitAPI";
import Main from "./components/clickIncrement";
import PlayNine from "./components/PlayNine";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    {/*<Main />*/}
    {/* <ApiApp/> */}
    <PlayNine />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
