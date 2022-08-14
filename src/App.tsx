import React from "react";
import "./App.css";
// import Header from "./components/Header";
// import Sider from "./components/Sider";
import Content from "./components/Content";
function App() {
  return (
    <div className="app">
      {/* <div className="app-top">
        <Header></Header>
      </div> */}
      <div className="app-bottom">
        {/* <Sider></Sider> */}
        <Content />
      </div>
    </div>
  );
}

export default App;
