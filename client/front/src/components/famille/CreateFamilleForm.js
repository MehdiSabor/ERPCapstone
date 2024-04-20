import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useCreateFamille } from '../../hooks/familleHooks';

const CreateFamilleForm = () => {
  const [form] = Form.useForm();
  const { handleCreate, isSubmitting, error } = useCreateFamille();

  const onFinish = async (values) => {
    try {
      const result = await handleCreate(values);
      console.log('Famille Created:', result);
      form.resetFields(); // Reset form fields after submission
    } catch (err) {
      console.error('Error creating famille:', err);
    }
  };

  return (
    <Card title="Create Famille" bordered={false}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          nom: ''
        }}
      >
        <Form.Item
          name="nom"
          label="Nom de la famille"
          rules={[{ required: true, message: 'Please enter the family name!' }]}
        >
          <Input placeholder="Enter the name of the family" />
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Submit
          </Button>
        </Form.Item>
        {error && <p>Error: {error}</p>}
      </Form>
    </Card>
  );
};

export default CreateFamilleForm;
