import React from 'react';
import { Form, Input, Button, Card } from 'antd';

import { useCreateUser } from '../../hooks/userHooks'; // Ensure path is correct

const CreateUserForm = () => {
  const [form] = Form.useForm();
  const { handleCreate, isSubmitting, error } = useCreateUser();

  const onFinish = async (values) => {
    try {
      const result = await handleCreate(values);
      console.log('User Created:', result);
      form.resetFields(); // Reset form fields after submission
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <Card title="Create User" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form.Item>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </Form>
    </Card>
  );
};

export default CreateUserForm;
