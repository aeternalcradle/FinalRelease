import React from 'react';
import { Typography,Button, Space ,Divider,Row,Col} from 'antd';
import "../design/background.css"
const { Title } = Typography;



const App: React.FC = () => (
    <div className="login-container">
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
        <Col>
            <Title level={5}>Welcome to Online Judge</Title>
            <Title level={5}>Log in with your account to continue</Title>
                <a href="/login" rel="noreferrer">
                    <Button type="primary">Log in</Button>
                </a>
            <Divider type="vertical" />
                <a href="/signup" rel="noreferrer">
                    <Button type="primary">Sign up</Button>
                </a>
        </Col>
    </Row>
    </div>


);

export default App;
