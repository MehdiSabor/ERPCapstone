import React, { useState } from 'react';
import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteBonliv } from '../../hooks/bonlivHooks';

const { Title, Paragraph } = Typography;

const BonlivDeleteButton = ({ bonlivId, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const { handleDelete } = useDeleteBonliv();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete(bonlivId);
      if (typeof onSuccess === 'function') {
        onSuccess();  // Invoke onSuccess callback if provided
      }
      // Optionally navigate back or to another relevant page on success
    } catch (error) {
      Modal.error({
        title: 'Failed to delete bonliv',
        content: error.message,
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Optionally handle cancel scenario
  };

  return (
    <Card bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
        <ExclamationCircleOutlined style={{ color: 'red' }} /> Delete Bonliv
      </Title>
      <Paragraph>
        Are you sure you want to delete this bonliv? This action cannot be undone and will permanently remove the bonliv.
      </Paragraph>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="danger" onClick={handleConfirmDelete} loading={loading} style={{ marginRight: 20 }}>
          Yes, delete it
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default BonlivDeleteButton;
