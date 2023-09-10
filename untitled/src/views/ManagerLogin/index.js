import React,{Component} from "react";
import {Button, Space, Divider, Input, message} from 'antd';
import {managerLoginUserAuth} from "../../service/api/userAuthApi";
import {Navigate} from "react-router-dom";


let param={
    username:"",
    password: "",
    managerPassword:""
}


class Register extends Component{

    state = {
        loggedIn: false,
    };

    constructor() {
        super();
        this.state={
            username:"",
            password:"",
            managerPassword:""
        }
    }

    handleSubmit=()=>{
        managerLoginUserAuth(param).then(res =>{
            console.log((res.data))
            if( res.data === false)
            {
                message.warning("账号或者密码输入错误");
            }
            else{
                message.success("登陆成功");
                this.setState({ loggedIn: true });
            }

        })
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
        else if(e.target.name==="managerPassword")
        {
            param.managerPassword=e.target.value;
        }

    }



    render() {
        const { loggedIn } = this.state;
        if (loggedIn) {
            return <Navigate to="/manage/users" />;
        }
        const onsubmit = async e=>{
            e.preventDefault();
          const{data}=await this.props.registerFn.registerAc(this.state);
        console.log(data);
        };
        const {username,password,managerPassword}=this.state;
        return (
            <div>

                <div className="wraper"><a href="/initial" rel="noreferrer">
                    <Button type="primary" >返回</Button>
                </a></div>

                <form onSubmit={this.onSubmit}>
                    <h1>Welcome</h1>
                    <Divider/>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <label className="control-label">Username</label>
                        </Space>
                    <Input style={{
                        width: 500,
                    }}
                        className="form-control"
                        type="test"
                        name="username"
                        value={username}
                        onChange={this.changeHandle}
                    />
                    </div>

                    <div className="form-group">
                        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                            <label className="control-label">Password</label>
                        </Space>
                        <Input style={{
                            width: 500,
                        }}
                               className="form-control"
                               type="password"
                               name="password"
                               value={password}
                               onChange={this.changeHandle}
                        />
                    </div>
                        <div className="form-group">
                            <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                                <label className="control-label">managerPassword</label>
                            </Space>
                            <Input style={{
                                width: 500,
                            }}
                                   className="form-control"
                                   type="managerPassword"
                                   name="managerPassword"
                                   value={managerPassword}
                                   onChange={this.changeHandle}
                            />
                        </div>


                        <div className="form-group">
                            <Button className="btn btn-primary btn-lg" type="primary" onClick={this.handleSubmit}>登录</Button>
                        </div>
                    </Space>
                </form>
            </div>
        );
    }
}
export default Register;
