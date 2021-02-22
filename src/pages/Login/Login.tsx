import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { getAccessToken, setAccessToken } from 'src/accessToken';
import { useLoginUserMutation, UserDetailsDocument, UserDetailsQuery } from 'src/generated/graphql';
import { Form, Input, Button, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.scss';

interface loginFormProps {
    email: string;
    password: string;
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {

    // check for access token in loacl storage
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken !== '') {
            history.replace('./');
        }
    }, [])

    // mutation for login
    const [login] = useLoginUserMutation();

    const [form] = Form.useForm();

    // use mutation to check email and password is valid or not (use update to update you apollo clien cache)
    // if yes set refresh token otherwise show error
    const onFinish = (values: loginFormProps) => {
        return login({
            variables: {
                email: values.email,
                password: values.password
            },
            update: (store, { data }) => {
                if (data && data.loginUser.__typename === "LoginSuccess") {
                    store.writeQuery<UserDetailsQuery>({
                        query: UserDetailsDocument,
                        data: {
                            __typename: "Query",
                            getUserDetails: data.loginUser.user
                        }
                    })
                } else {
                    console.log('unbale to update user cache')
                }
            }
        }).then(res => {
            if (!res || res.errors || !res.data) {
                return
            }
            if (res.data.loginUser.__typename === "LoginSuccess") {
                //set access token 
                //access token used for protect graphql query/mutations
                setAccessToken(res.data.loginUser.accessToken);

                //navigate to home
                history.push("/");
            }
            else if (res.data.loginUser.__typename.endsWith("Error")) {
                // based on error code(1 for email and 2 for password) handle erros
                // OR can use __typename to handle errors
                if (res.data.loginUser.errorCode === "1") {
                    return form.setFields([{ name: "email", errors: ["Email not exists!"] }])
                }
                return form.setFields([{ name: "password", errors: ["Password not matched!"] }])
            }
        }).catch(err => {
            console.log('err', err)
        })

    }


    const signUp = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
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
                        <Button type="dashed" className="login-form-button" onClick={signUp}>
                            Sign up
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
} 