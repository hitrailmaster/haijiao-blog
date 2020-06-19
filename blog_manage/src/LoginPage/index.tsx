import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import Container from './container';
import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';
import axios from 'axios';
import qs from 'qs';
import store from '../store';
import { updateUserData } from '../store/actionCreators';
interface EVENT {
    target: {
        value: string
    }
}
interface IProps extends RouteComponentProps {
    history: History
    [name: string]: any
}
const Login: React.FC<IProps> = (props: IProps): any => {
    let email = "", pwd = '';
    function handleLogin() {
        // setName(email)
        // props.history.replace('/');
        axios.post('/login', qs.stringify({email, password: pwd}))
        .then(res => {
            let data = res.data;
                if(data.status === 'success' && data.info.status === 2) {
                    message.success("登录成功！");
                    props.history.push('/');
                    store.dispatch(updateUserData(data.info))
                } else {
                    message.error('密码或账号错误或权限不足');
                }
            })
            .catch(error => {
                console.log(error)
                message.error('error');
            }) 
    };
    const handleEmail = (e: EVENT) => {
        email = e.target.value;
    }
    const handlePWD = (e: EVENT) => {
        pwd = e.target.value;
    }
    // const [userName, setName] = useState<string>('');
    // useEffect(() => {
    //     setName(store.getState().userName);

    // })
    return  (<Container>
                <canvas className="myCanvas"></canvas>
                <Form>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input onChange={handleEmail}/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password onChange={handlePWD}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" onClick={() => handleLogin()}>
                        登录
                        </Button>
                    </Form.Item>
                </Form>
            </Container>)
}
export default Login;