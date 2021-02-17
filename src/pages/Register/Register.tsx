import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRegisterUserMutation } from 'src/generated/graphql';
import './index.scss';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { getAccessToken } from 'src/accessToken';


export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken !== '') {
            history.replace('./');
        }
    }, [])

    const [registerUser] = useRegisterUserMutation()
    const [form] = Form.useForm()
    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        if (values.password !== values.passwordConfirm) {
            message.warn("Password doesn't match")
            return
        }
        return registerUser({
            variables: {
                email: values.email,
                password: values.password,
                firstName: "temp1",
                lastName: "temp2"
            }
        }).then(res => {
            console.log('userId :', res)
            history.push("/");
        })
    };
    const logIn = (values: any) => {
        history.push("/login");

    }
    const confrimPassword = (rule: any, value: any, callback: any) => {
        console.log(value)
        let { password } = form.getFieldsValue()
        if (!value || value === password) {
            callback();
        }
        else {
            callback("Password doesn't match!");
        }
    }

    return (
        <div className="register">
            <Card className="register-card">
                <Form
                    form={form}
                    name="normal_register"
                    className="register-form"
                    initialValues={{ email: '', password: '', passwordConfirm: '' }}
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
                    <Form.Item
                        name="passwordConfirm"
                        rules={[{ required: true, message: "Please confrim your Password!" }, { validator: confrimPassword }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="register-form-button">
                            Sign up
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="dashed" className="register-form-button" onClick={e => logIn(e)}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );

}; 