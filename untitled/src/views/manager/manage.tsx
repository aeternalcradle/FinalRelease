import React, {useEffect, useState} from 'react';
import {Breadcrumb, Button, Layout, theme} from 'antd';
import{Outlet,useNavigate}from "react-router-dom"
import MainMenu from "../../Components/ManagerMenu";
import "../../design/Home.css";
const { Header, Content, Footer, Sider } = Layout;
const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('isManager');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        localStorage.removeItem('ok');
        // 其他登出操作...
        navigate('/initial')
        window.location.reload();
    };
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        // 检查登录状态
        const userId = localStorage.getItem('userId');
        const isManager = localStorage.getItem('isManager');
        // 如果未登录，则重定向到登录页面
        if (!userId) {
            window.location.href = '/initial';
        }
        if(isManager==="0"){
            window.location.href = '/page1';
        }
    }, []);

    return (

        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
                <MainMenu></MainMenu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <Breadcrumb style={{ margin: '16px 32px' }}>
                        <Breadcrumb.Item>这是离别的馈赠</Breadcrumb.Item>
                        <Breadcrumb.Item>ONLINE JUDGE</Breadcrumb.Item>
                        <div className="spacer" />
                        {userId && (
                            <Button type={"primary"} onClick={handleLogout}>Logout</Button>
                        )}
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '16px 16px ' }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: 'center',padding:0,lineHeight:'48px' }}>ONLINE JUDGE ©2023 Created by 我重拾你的梦</Footer>
            </Layout>
        </Layout>
    );
};

export default App;
