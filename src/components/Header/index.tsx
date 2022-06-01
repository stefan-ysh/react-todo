import React, { useState } from "react";
import { Avatar, Menu, Dropdown, Space, Button, Modal, Row, Col } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import Logo from "../Logo";
import { UserInfo, UserDetailRow } from "./types/user";
import "./index.css";
const { Link } = require("react-router-dom");

let title = "Custom React Platform";

// const menu = (
//   <Menu
//     items={[
//       {
//         label: <Button type="text">个人信息</Button>,
//         icon: <UserOutlined />,
//         key: "user-info",
//         onClick: () => {
//           showModal();
//         },
//       },
//       {
//         label: <Button type="text">后台管理</Button>,
//         icon: <UserOutlined />,
//         key: "go-to-admin",
//       },
//       {
//         type: "divider",
//       },
//       {
//         label: <Button type="text">退出系统</Button>,
//         icon: <LogoutOutlined />,
//         key: "logout",
//         disabled: false,
//       },
//     ]}
//   />
// );

let userInfo: UserInfo = {
  name: "刘德华",
  age: 18,
  address: "吉林市长春市九台区其塔木镇刘家村十四社",
};

const rowArr: Array<UserDetailRow> = [
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Age",
    value: "age",
  },
  {
    label: "Address",
    value: "address",
  },
];

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showLogoutConfirm = () => {
    // setIsModalVisible(false);
  };
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/index">
          <Logo />
        </Link>
        <span className="title">{title}</span>
      </div>
      <div className="header-right">
        <Dropdown
          overlay={
            <Menu
              items={[
                {
                  label: <Button type="text">Profile</Button>,
                  icon: <UserOutlined />,
                  key: "user-info",
                  onClick: () => {
                    showModal();
                  },
                },
                {
                  label: <Button type="text">Admin</Button>,
                  icon: <UserOutlined />,
                  key: "go-to-admin",
                },
                {
                  type: "divider",
                },
                {
                  label: (
                    <Button type="text" onClick={showLogoutConfirm}>
                      Logout
                    </Button>
                  ),

                  icon: <LogoutOutlined />,
                  key: "logout",
                  disabled: false,
                },
              ]}
            />
          }
        >
          <Space>
            <Avatar src="https://joeschmoe.io/api/v1/random" size="large" />
          </Space>
        </Dropdown>
      </div>
      <Modal
        title="Personal Information"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {rowArr.map((v, k) => {
          return (
            <Row gutter={16} key={k}>
              <Col span={4}>{v.label}</Col>
              <Col span={20}>{userInfo[v.value as keyof typeof userInfo]}</Col>
            </Row>
          );
        })}
      </Modal>
    </div>
  );
}

export default Header;
