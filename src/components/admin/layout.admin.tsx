import { callLogout } from "@/config/api/business/auth.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLogoutAction } from "@/redux/slice/business/auth/accountSlide";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Layout, Menu, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import Account from "./../../assets/iconMenu/account.svg";
import ActiveAccount from "./../../assets/iconMenu/activeAccount.svg";
import ActiveManagement from "./../../assets/iconMenu/activeManagement.svg";
import ActivePermission from "./../../assets/iconMenu/activePermission.svg";
import ActiveRole from "./../../assets/iconMenu/activeRole.svg";
import Management from "./../../assets/iconMenu/management.svg";
import Permission from "./../../assets/iconMenu/permission.svg";
import Role from "./../../assets/iconMenu/role.svg";

const { Content, Footer, Sider } = Layout;

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);

  const user = useAppSelector((state) => state.account.user);

  useEffect(() => {
    const full: MenuProps["items"] = [
      {
        label: <Link to="/user">Quản lý tài Khoản</Link>,
        key: "/user",
        icon: (
          <img
            src={activeMenu === "/user" ? ActiveAccount : Account}
            alt="Account"
          />
        ),
      },
      {
        label: "Quản lý chung",
        key: "/management",
        icon: (
          <img
            src={
              activeMenu.startsWith("/management")
                ? ActiveManagement
                : Management
            }
            alt="Management"
          />
        ),
        children: [
          {
            label: <Link to="/management/permission">Quản lý truy cập</Link>,
            key: "/management/permission",
            icon: (
              <img
                src={
                  activeMenu === "/management/permission"
                    ? ActivePermission
                    : Permission
                }
                alt="Permission"
              />
            ),
          },
          {
            label: <Link to="/management/role">Quản lý quyền hạn</Link>,
            key: "/management/role",
            icon: (
              <img
                src={
                  activeMenu === "/management/role" ? ActiveRole : Role
                }
                alt="Role"
              />
            ),
          },
        ],
      },
    ];

    setMenuItems(full);
  }, [activeMenu]);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      message.success("Đăng xuất thành công");
      navigate("/login");
    }
  };

  const itemsDropdown = [
    {
      label: (
        <div style={{ cursor: "pointer" }} onClick={handleLogout}>
          Đăng xuất
        </div>
      ),
      key: "logout",
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} className="layout-admin">
      {!isMobile ? (
        <Sider
          width={250}
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ height: 42, margin: 16, textAlign: "center" }}>
            {/* Logo nếu cần */}
          </div>
          <Menu
            selectedKeys={[activeMenu]}
            mode="inline"
            items={menuItems}
            onClick={(e) => setActiveMenu(e.key)}
          />
        </Sider>
      ) : (
        <Menu
          selectedKeys={[activeMenu]}
          items={menuItems}
          onClick={(e) => setActiveMenu(e.key)}
          mode="horizontal"
        />
      )}

      <Layout>
        {!isMobile && (
          <div
            className="admin-header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginRight: 20,
            }}
          >
            <Button
              type="text"
              icon={
                collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )
              }
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: "16px", width: 64, height: 64 }}
            />

            <Space style={{ cursor: "pointer" }}>
              <Button type="primary" danger>
                <a
                  href="https://drive.google.com/drive/folders/1Rjzf2cKOuEFoQKziAcPx3Cv_uVTsztAF?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hướng dẫn
                </a>
              </Button>

              <Dropdown menu={{ items: itemsDropdown }} trigger={["click"]}>
                <Space>
                  <Avatar>
                    {user?.userName?.substring(0, 2)?.toUpperCase()}
                  </Avatar>
                </Space>
              </Dropdown>
            </Space>
          </div>
        )}
        <Content style={{ padding: "15px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutAdmin;
