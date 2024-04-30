import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Button, Typography } from 'antd';
import { useUpdateItemInDevis } from '../../hooks/devisHooks';

const { Text } = Typography;


const UpdateItemInDevisForm = ({ refDevis, article, onSuccess, onRefetch }) => {
  const { updateItem, isUpdated } = useUpdateItemInDevis();

  const [formData, setFormData] = useState({
    QTE: article?.QTE || 0,
    GRATUIT: article?.GRATUIT || 0,
    REMISE: article?.REMISE || 0
  });

  useEffect(() => {
    if (isUpdated) {
      console.log('Item updated successfully');
      onSuccess();
      onRefetch();
    }
    // Reset formData when article changes
    setFormData({
      QTE: article?.QTE || 0,
      GRATUIT: article?.GRATUIT || 0,
      REMISE: article?.REMISE || 0
    });
  }, [article, isUpdated, onSuccess, onRefetch]);

  const handleChange = (name, value) => {
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  if (!article) return <Text>No article selected for update.</Text>;

  const handleSubmit = () => {
    // Merge the updated fields with the original article object
    const updatedArticle = {
      ...article,
      ...formData
    };
    console.log(`Submitting updatedArticle:`, updatedArticle); // This logs the merged article object
    updateItem(refDevis, article.CODE_ART, updatedArticle);
  };

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item label="Quantity (QTE)">
        <InputNumber
          min={0}
          value={formData.QTE}
          onChange={(value) => handleChange('QTE', value)}
        />
      </Form.Item>
      <Form.Item label="Free of Charge (GRATUIT)">
        <InputNumber
          min={0}
          value={formData.GRATUIT}
          onChange={(value) => handleChange('GRATUIT', value)}
        />
      </Form.Item>
      <Form.Item label="Discount (REMISE)">
        <InputNumber
          min={0}
          value={formData.REMISE}
          onChange={(value) => handleChange('REMISE', value)}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">Update Item</Button>
    </Form>
  );
};

export default UpdateItemInDevisForm;
