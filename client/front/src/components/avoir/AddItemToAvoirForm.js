import React, { useState } from 'react';
import { Button, Card, Typography, InputNumber, Form } from 'antd';
import { useAddItemToAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary
import ArticleList from '../article/ArticleList';

const { Title } = Typography;

const AddItemToAvoirForm = ({ refAvoir,onSuccess  }) => {
  const { addItem } = useAddItemToAvoir();
  const [showItemList, setShowItemList] = useState(false);

  const initialState = {
    REF_AVR: refAvoir, // This value is preset and should not change
    CODE_ART: '',
    ARTICLE: '',
    QTE: 0,
    GRATUIT: 0,
    PA_HT: 0,
    PV_HT: 0,
    PV_TTC: 0,
    REMISE: 0,
    TVA: 0,
  };

  const [itemData, setItemData] = useState(initialState);

  const handleSelectArticle = (article) => {
    console.log(article);
    setItemData({ ...itemData, CODE_ART: article.code_art, ARTICLE: article.nom, PA_HT: article.PA_HT, PV_HT: article.PV_HT, PV_TTC: article.PV_TTC, TVA: article.TVA });
    setShowItemList(false); // Close the ArticleList after selection
  };

  const handleSubmit = async () => {
    await addItem(refAvoir, itemData);
    onSuccess(); 
    setItemData(initialState); // Optionally reset the form or provide feedback
  };

  return (
    <Card bordered={false} style={{  margin: '20px auto' }}>
      <Title level={4}>Add Item to Avoir</Title>
      <Button type="default" onClick={() => setShowItemList(true)} style={{ marginBottom: 16 }}>
        Select Article
      </Button>
      {itemData.CODE_ART && <p>Selected Article: {itemData.ARTICLE}</p>}
      {showItemList && <ArticleList onSelectArticle={handleSelectArticle} />}

      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item label="Quantity (QTE)">
          <InputNumber
            min={0}
            value={itemData.QTE}
            onChange={value => setItemData(prevData => ({ ...prevData, QTE: value }))}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Item
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddItemToAvoirForm;
