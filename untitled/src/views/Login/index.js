import React,{Component} from "react";
import {Button, Space, Divider, Input, message, Row, Col} from 'antd';
import {loginUserAuth} from "../../service/api/userAuthApi";
import {Navigate} from "react-router-dom";
import '../../design/background.css';

let param={
    username:"",
    password: "",
}


class Login extends Component{

    state = {
        loggedIn: false,
    };

    constructor() {
        super();
        this.state={
            username:"",
            password:"",
        }
    }

    handleSubmit=()=>{
        if(param.username==="")
        {
            message.warning("您必须输入用户名")
        }
        else if(param.password==="")
        {
            message.warning("您必须输入密码")
        }
        else{
        loginUserAuth(param).then(res =>{
            console.log((res.data))
            if( res.data.ok === 0)
            {
                message.warning("账号或者密码输入错误")
            }
            else if( res.data.ok === 2)
            {
                message.warning("该账号已被禁用")
            }
            else{
                message.success("登陆成功");
                localStorage.setItem('ok', res.data.ok);
                localStorage.setItem('userId',res.data.name);
                localStorage.setItem('username',res.data.name);
                localStorage.setItem('user2name',res.data.username);
                localStorage.setItem('isManager',res.data.ismanager);
                localStorage.setItem('password',param.password);
                if(res.data.ismanager === 1){
                    window.location.href = '/manage';

                }
                else this.setState({ loggedIn: true });
            }
        })}
    }



    changeHandle= (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log((e.target.value))
        if(e.target.name==="username")
        {
            param.username=e.target.value;
        }

        else if(e.target.name==="password")
        {
            param.password=e.target.value;
        }

    }



    render() {

        const { loggedIn } = this.state;
        if (loggedIn) {
            return <Navigate to="/page1" />;
        }
        const {username,password}=this.state;

        return (
            <div className="login-container">

                <Row justify="center" align="middle" style={{ height: '100vh' }}>
                    <Col>
                <form onSubmit={this.onSubmit}>
                    <h1>Enter your password</h1>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label className="control-label">Username</label>
                        </Space>
                    <Input style={{
                        width: 300,
                        height: 40,
                    }}

                        type="test"
                        name="username"
                        value={username}
                        onChange={this.changeHandle}
                        id="usernameInput" // 添加id属性
                    />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label className="control-label">Password</label>
                        </Space>
                        <Input style={{
                            width: 300,
                            height: 40,
                        }}
                               type="password"
                               name="password"
                               value={password}
                               onChange={this.changeHandle}
                               id="passwordInput" // 添加id属性
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
export default Login;
