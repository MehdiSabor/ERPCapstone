import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Card, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../../models/authAPI'; // Ensure this path is correct

const { Title } = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const error = useSelector(state => state.error);
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const result = await login(values.email, values.password);
            setLoading(false);
            if (result.token) {
                dispatch({ type: 'SET_USER', payload: { user: result.user, token: result.token } });
                // Redirect or handle success
            } else {
                dispatch({ type: 'LOGIN_ERROR', payload: 'Invalid credentials' });
            }
        } catch (error) {
            console.error('Login failed:', error);
            dispatch({ type: 'LOGIN_ERROR', payload: 'Login failed' });
            setLoading(false);
        }
    };

    return (
        <Card style={{ maxWidth: 400, margin: '0 auto', marginTop: '20vh' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
            <Form
                form={form}
                name="login_form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your Email!' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Log in
                    </Button>
                </Form.Item>
                {error && <Alert message={error} type="error" showIcon />}
            </Form>
        </Card>
    );
};

export default Login;
