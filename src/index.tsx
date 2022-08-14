// import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./mock/index";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter } from "react-router-dom";
const { BrowserRouter } = require("react-router-dom");
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// ts项目里不要使用React.StrictMode会导致路由出错，地址栏会改变，但是组件不会马上更新，留个坑，后面研究明白了再回来填
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
reportWebVitals();
