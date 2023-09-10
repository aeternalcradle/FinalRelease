import React, { useEffect, useState } from 'react';
import {Breadcrumb, Layout, theme, Button} from 'antd';
import {Outlet, useNavigate } from "react-router-dom"
import MainMenu from "../Components/MainMenu";
import "../design/Home.css";
import BackToTop from "../Components/Button/backToTop";
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
    useEffect(() => {
        // 检查登录状态
        const userId = localStorage.getItem('userId');
        // 如果未登录，则重定向到登录页面
        if (!userId) {
            window.location.href = '/initial';
        }

    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const navigate = useNavigate();
    useEffect(() => {
        setUserId(localStorage.getItem('userId'));
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isManager');
        localStorage.removeItem('ok');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        // 其他登出操作...
        navigate('/initial')
        window.location.reload();
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <div className="home-container">
        <Layout style={{ minHeight: '100vh' ,background: 'rgba(0, 0, 0, 0)'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
            <MainMenu></MainMenu>
            </Sider>
            <Layout style={{ background: 'rgba(0, 0, 0, 0)'}}>
                <Header style={{ padding: 0, background: 'rgba(0, 0, 0, 0.5)'}} >
                <Breadcrumb style={{ margin: '16px 32px' ,color:'white'}}>
                    <Breadcrumb.Item >这是离别的赠礼</Breadcrumb.Item>
                    <Breadcrumb.Item>ONLINE JUDGE</Breadcrumb.Item>
                    <div className="spacer" /> {/* 添加一个占位元素 */}
                    {userId && (
                        <Button type={"primary"} onClick={handleLogout}>Logout</Button>
                    )}
                </Breadcrumb>
             </Header>
                <Content style={{ margin: '16px 16px ' }}>
                <Outlet />
                </Content>
                <Footer  style={{ textAlign: 'center',padding:0,lineHeight:'48px',background: 'rgba(0, 0, 0, 0.5)', color: 'white'}}>ONLINE JUDGE ©2023 Created by 我重拾你的梦</Footer>
            </Layout>
        </Layout>
            <BackToTop/>
        </div>
    );
};

export default App;
