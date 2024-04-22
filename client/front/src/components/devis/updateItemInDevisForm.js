import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useUpdateItemInDevis } from '../../hooks/devisHooks';

const { Text } = Typography;

const UpdateItemInDevisForm = ({ refDevis, article, onSuccess }) => {
  const { updateItem, isUpdated } = useUpdateItemInDevis();
  const [formData, setFormData] = useState(article || {});

  useEffect(() => {
    if (isUpdated) {
      console.log('Item updated successfully');
      onSuccess();
    }
  }, [isUpdated, onSuccess]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value;
    setFormData(prevData => ({ ...prevData, [name]: newValue }));
  };

  if (!article) return <Text>No article selected for update.</Text>;

  return (
    <Form layout="vertical" onFinish={() => updateItem(refDevis, formData.CODE_ART, formData)}>
      {Object.keys(formData).map(key => (
        <Form.Item label={key} key={key}>
          <Input
            type={['QTE', 'GRATUIT', 'PA_HT', 'PV_HT', 'PV_TTC', 'REMISE', 'TVA'].includes(key) ? 'number' : 'text'}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </Form.Item>
      ))}
      <Button type="primary" htmlType="submit">Update Item</Button>
    </Form>
  );
};

export default UpdateItemInDevisForm;
