import React, { useState } from 'react';
import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteArticle } from '../../hooks/articleHooks';

const { Title, Paragraph } = Typography;

const ArticleDeleteButton = ({ articleId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { handleDelete } = useDeleteArticle();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete(articleId);
      if (typeof onSuccess === 'function') {
        onSuccess();  // Invoke onSuccess callback if provided
      }
      // Optionally navigate back or to another relevant page on success
    } catch (error) {
      Modal.error({
        title: 'Failed to delete article',
        content: error.message,
      });
      setLoading(false);
    }
  };

  

  return (
    <Card bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
        <ExclamationCircleOutlined style={{ color: 'red' }} /> Delete Article
      </Title>
      <Paragraph>
        Are you sure you want to delete this article? This action cannot be undone and will permanently remove the article.
      </Paragraph>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="danger" onClick={handleConfirmDelete} loading={loading} style={{ marginRight: 20 }}>
          Yes, delete it
        </Button>
        
      </div>
    </Card>
  );
};

export default ArticleDeleteButton;
