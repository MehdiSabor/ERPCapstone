import React, { useState } from 'react';
import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteCom } from '../../hooks/comHooks';

const { Title, Paragraph } = Typography;

const ComDeleteButton = ({ comId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { handleDelete } = useDeleteCom();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete(comId);
      onSuccess();
    } catch (error) {
      Modal.error({
        title: 'Failed to delete commercial',
        content: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <Card bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
        <ExclamationCircleOutlined style={{ color: 'red' }} /> Delete Commercial
      </Title>
      <Paragraph>
        Are you sure you want to delete this commercial? This action cannot be undone and will permanently remove the commercial.
      </Paragraph>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="danger" onClick={handleConfirmDelete} loading={loading} style={{ marginRight: 20 }}>
          Yes, delete it
        </Button>
        
      </div>
    </Card>
  );
};

export default ComDeleteButton;
