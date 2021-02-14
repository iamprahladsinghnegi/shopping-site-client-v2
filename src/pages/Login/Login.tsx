import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { getAccessToken, setAccessToken } from 'src/accessToken';
import { useLoginUserMutation, UserDetailsDocument, UserDetailsQuery } from 'src/generated/graphql';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';


export const Login: React.FC<RouteComponentProps> = ({ history }) => {
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken !== '') {
            history.replace('./');
        }
    }, [])
    const [login] = useLoginUserMutation()
    const [form] = Form.useForm();
    const onFinish = (values: any) => {
        return login({
            variables: {
                email: values.email,
                password: values.password
            },
            update: (store, { data }) => {
                if (data) {
                    store.writeQuery<UserDetailsQuery>({
                        query: UserDetailsDocument,
                        data: {
                            __typename: "Query",
                            getUserDetails: data.loginUser.user
                        }
                    })
                }
                console.log('unbale to update user cache')
            }
        }).then(res => {
            if (!res || res.errors || !res.data) {
                console.log('err', res.errors)
                return
            }
            console.log('res', res)
            setAccessToken(res.data.loginUser.accessToken)
            history.push("/");
        }).catch(err => {
            console.log('err', err)
        })

    }
    const signUp = (e: any) => {
        history.push("/register");
    }

    return (
        <div className="login">
            <Card className="login-card">
                <Form
                    form={form}
                    name="normal_login"
                    className="login-form"
                    initialValues={{ email: '', password: '' }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}
                    >
                        <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="dashed" className="login-form-button" onClick={e => signUp(e)}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
} 