import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox,message} from 'antd';
const FormItem = Form.Item;
import {UserHander} from './HttpRequest/User'
import md5 from 'md5'

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: localStorage.getItem('name'),
            password: localStorage.getItem('password'),
            loading:false,
        }
    }
    render() {
        let cansubmit = !(this.state.userName&&this.state.userName.length>0&&this.state.password&&this.state.password.length>0)
        return (
            <div style={{display: 'flex', flex: '1'}}>
                <form
                    style={{display: 'flex',flex: '1',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
                    <h2>登录</h2>
                    <div style={{maxWidth:'400px',width:'300px'}}>
                        <FormItem>
                            <Input
                                value={this.state.userName}
                                onInput={(e)=>this.setState({userName:e.target.value})}
                                prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                placeholder="用户名"/>
                        </FormItem>
                        <FormItem>
                            <Input
                                value={this.state.password}
                                onInput={(e)=>this.setState({password:e.target.value})}
                                prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                                type="password"
                                placeholder="密码"/>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" loading={this.state.loading} style={{width:'100%'}} disabled={cansubmit}  onClick = {this.login.bind(this)} >
                                登入
                            </Button>
                        </FormItem>

                    </div>
                </form>
            </div>
        )
    }
    login()
    {
        let param = {
            name:this.state.userName,
            password:md5(this.state.password)
        }
        UserHander.login(param,(data)=>{

            console.log(data)
            if(data.status==0)
            {
                let successData = data.data;

                localStorage.setItem('name', successData.userName)
                localStorage.setItem('password', this.state.password)
                localStorage.setItem('name', successData.userName)
                if(this.props.delegate)
                {
                    this.props.delegate(successData.nickName)
                }
            }else {
                message.error('账号或者密码错误',1);
                this.setState({
                    loading:false
                })
            }

        },(failed)=>{
            this.setState({
                loading:false
            })
        })
        this.setState({
            loading:true
        })


    }


}
