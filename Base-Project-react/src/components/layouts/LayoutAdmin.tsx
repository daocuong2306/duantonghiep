import {
    AiOutlineMenuFold,
    AiOutlineMenuUnfold,
    AiOutlineUser,
    AiOutlineVideoCamera,
    AiFillFolder
} from "react-icons/ai";
import React from 'react';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import MenuBar from "../component/layout/menu";
const { Header, Content, Sider } = Layout;
const LayoutAdmin: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <AiOutlineUser />,
                            label: <Link to="/admin/statistics">Thống kê</Link>,
                        },
                        {
                            key: "2",
                            icon: <AiOutlineUser />,
                            label: <Link to="/admin/user">Người dùng</Link>,
                        },
                        {
                            key: "3",
                            icon: <AiOutlineVideoCamera />,
                            label: <Link to="/admin/dashboard">Sản phẩm</Link>,
                        },
                        {
                            key: "4",
                            icon: <AiFillFolder />,
                            label: <Link to="/admin/categories">Danh mục</Link>
                        },
                        {
                            key: "5",
                            icon: <AiFillFolder />,
                            label: <Link to="/admin/Options">Tùy chọn</Link>
                        },
                        {
                            key: "6",
                            icon: <AiFillFolder />,
                            label: <Link to="/admin/banner">Banner</Link>
                        },
                        {
                            key: "7",
                            icon: <AiFillFolder />,
                            label: <Link to="/admin/bills">Đơn hàng</Link>
                        }
                    ]}
                />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <MenuBar/>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div style={{ padding: 24, background: colorBgContainer }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutAdmin;