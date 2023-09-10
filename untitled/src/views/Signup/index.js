import React,{Component} from "react";
import {Button, Space, Divider, Input, message, Row, Col} from 'antd';
import {addUserAuth, registerUserAuth} from "../../service/api/userAuthApi";
import '../../design/background.css';
let param={
    username:"",
    email:"",
    password: "",
    passwordConfirmation:""
}

class Register extends Component{
    constructor() {
        super();
        this.state={
            username:"",
            email:"",
            password:"",
            passwordConfirmation:""
        }
    }


    changeHandle= (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log((e.target.name))
        if(e.target.name==="username")
        {
            param.username=e.target.value;
        }
        else if(e.target.name==="email")
        {
            param.email=e.target.value;
        }
        else if(e.target.name==="password")
        {
            param.password=e.target.value;
        }
        else if(e.target.name==="passwordConfirmation")
        {
            param.passwordConfirmation=e.target.value;
        }
    }

    handleSubmit=()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!param.username){
            message.warning('请输入用户名');
            return;
        };
        if(!param.password){
            message.warning('请输入密码');
            return;
        };
        if (!emailRegex.test(param.email)) {
            message.warning('邮箱格式不正确');
            return;
        }
        registerUserAuth(param).then(res=>{
        if(param.password!==param.passwordConfirmation)
        {
            message.warning("两次输入密码不相同");
            return;
        }
        else{
            if(res.data===-1)
                message.warning("该用户名已有人注册")
            else{
                message.warning("注册成功");
                window.location.href = '/login';
            }}})
    }

    render() {
        const {username,email,password,passwordConfirmation}=this.state;
        return (
            <div className="login-container">
                <Row justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                <form onSubmit={this.onSubmit}>
                    <h1>Join our community</h1>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <label htmlFor="usernameInput" className="control-label">Username</label>
                        </Space>
                    <Input style={{
                        width: 300,
                    }}
                        type="test"
                        name="username"
                        value={username}
                        onChange={this.changeHandle}
                    />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label htmlFor="emailInput" className="control-label">Email</label>
                        </Space>

                        <Input style={{
                            width: 300,
                        }}
                               type="email"
                               name="email"
                               value={email}
                               onChange={this.changeHandle}
                        />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label htmlFor="passwordInput" className="control-label">Password</label>
                        </Space>
                        <Input style={{
                            width: 300,
                        }}
                               type="password"
                               name="password"
                               value={password}
                               onChange={this.changeHandle}
                        />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label htmlFor="passwordConfirmationInput"className="control-label">passwordConfirmation</label>
                        </Space>
                        <Input style={{
                            width: 300,
                        }}
                               type="password"
                               name="passwordConfirmation"
                               value={passwordConfirmation}
                               onChange={this.changeHandle}
                        />

                    </div>
                        <div className="form-group">
                            <Button type="primary" onClick={this.handleSubmit}>Continue</Button>
                            <Divider type="vertical" />
                            <a href="/initial" rel="noreferrer">
                                <Button type="primary" >Back</Button>
                            </a>
                        </div>
                    </Space>
                </form>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Register;
