import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, Typography } from 'antd';
import { useUpdateItemInBonliv } from '../../hooks/bonlivHooks'; // Adjust the import path as necessary

const { Title } = Typography;

const UpdateItemInBonlivForm = ({ refBonliv, article, onSuccess }) => {
  const { updateItem, isUpdated } = useUpdateItemInBonliv();
  const [formData, setFormData] = useState(article || {});
  const [form] = Form.useForm();

  useEffect(() => {
    // When the article prop changes, update the formData state
    form.setFieldsValue(article || {});
  }, [article, form]);

  useEffect(() => {
    if (isUpdated) {
      console.log('Item updated successfully');
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    }
  }, [isUpdated, onSuccess]);

  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    await updateItem(refBonliv, formData.CODE_ART, values);
  };

  // Early return if article is not provided
  if (!article) return <p>No article selected for update.</p>;

  return (
    <Card bordered={false} style={{ margin: '20px' }}>
      <Title level={4}>Update Item in Bonliv</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        {Object.keys(formData).map(key => (
          <Form.Item
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
            rules={[{ required: true, message: `Please input ${key}!` }]}
          >
            {['QTE', 'GRATUIT', 'PA_HT', 'PV_HT', 'PV_TTC', 'REMISE', 'TVA'].includes(key) ? 
              <InputNumber style={{ width: '100%' }} /> : 
              <Input />
            }
          </Form.Item>
        ))}
        <Button type="primary" htmlType="submit">
          Update Item
        </Button>
      </Form>
    </Card>
  );
};

export default UpdateItemInBonlivForm;
