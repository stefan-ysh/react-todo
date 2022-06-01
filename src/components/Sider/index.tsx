// import React from "react";
// import type { MenuProps } from "antd";
import { Menu } from "antd";
// import { NavLink} from "react-router-dom";
import "./index.css";

const { Link } = require("react-router-dom");

function Sider() {
  return (
    <div style={{ width: 256 }} className="sider">
      <div className="menu-wrap">
        <Menu theme="dark" defaultSelectedKeys={["/index"]} mode="inline">
          <Menu.Item key="/index">
            <Link to="/index">Index</Link>
          </Menu.Item>
          <Menu.Item key="/todo-list">
            <Link to="/todo-list">Todo List</Link>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default Sider;
