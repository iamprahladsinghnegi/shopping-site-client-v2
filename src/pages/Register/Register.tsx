import React, { useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { useRegisterUserMutation } from 'src/generated/graphql';
import './index.scss';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { getAccessToken } from 'src/accessToken';


interface RegisterFormProps {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    passwordConfirm: string
}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {

    // check for access token in loacl storage
    // if user has accesstoken, redirect user to home otherwise load the component
    useEffect(() => {
        const accessToken = getAccessToken();
        if (accessToken && accessToken !== '') {
            history.replace('./');
        }
    }, [])

    // mutation to register a user  
    const [registerUser] = useRegisterUserMutation()


    const [form] = Form.useForm()

    // basic validation and call muatation
    const onFinish = (values: RegisterFormProps) => {
        if (values.password !== values.passwordConfirm) {
            message.warn("Password doesn't match")
            return
        }
        return registerUser({
            variables: {
                email: values.email,
                password: values.password,
                firstName: values.firstName,
                lastName: values.lastName
            }
        }).then(_res => {
            console.log(_res)
            if (_res.data?.registerUser.__typename === "RegisterSuccess") {
                // navigate to login
                history.push("/login");
            }
            else if (_res.data?.registerUser.__typename === "AllreadyExistsError") {
                form.setFields([{ name: "email", errors: ["Email alredy exists!"] }])
            }
            else {
                //handle other errors (based on error code)
                console.log(_res.data?.registerUser)
                message.warning('Something went worng')
            }
        })
    };

    // navigate to login
    const logIn = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        history.push("/login");
    }

    // custom validator for confirm passwod
    const confrimPassword = (rule: any, value: any, callback: (error?: string) => void): Promise<void | any> | void => {
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
                    initialValues={{ firstName: '', lastName: '', email: '', password: '', passwordConfirm: '' }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="firstName"
                        rules={[{ type: 'string', required: true, message: 'Please input your First Name!' }]}
                    >
                        <Input placeholder="First Name" prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[{ type: 'string', required: true, message: 'Please input your Last Name!' }]}
                    >
                        <Input placeholder="Last Name" prefix={<UserOutlined className="site-form-item-icon" />} />
                    </Form.Item>

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
                        <Button type="dashed" className="register-form-button" onClick={logIn}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );

}; 