import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useCreateCom } from '../../hooks/comHooks'; // Adjust the import path as necessary

const ComForm = () => {
  const [form] = Form.useForm();
  const { handleCreate } = useCreateCom();

  const handleSubmit = async (values) => {
    console.log('Form Values:', values); // For debugging
    await handleCreate(values);
    form.resetFields(); // Reset form after submission
  };

  return (
    <Card title="Create Commercial">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Name"
          name="nom"
          rules={[{ required: true, message: 'Please input the name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item
          label="Telephone"
          name="tel"
          rules={[{ required: true, message: 'Please input the telephone number!' }]}
        >
          <Input placeholder="Enter telephone number" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { type: 'email', message: 'The input is not a valid email!' },
            { required: true, message: 'Please input the email!' }
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ComForm;
