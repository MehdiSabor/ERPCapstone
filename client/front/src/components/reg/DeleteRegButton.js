import React, { useState } from 'react';
import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteReglement } from '../../hooks/regHooks';

const { Title, Paragraph } = Typography;

const DeleteReglementButton = ({ reglementId, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { handleDelete, isDeleting, error } = useDeleteReglement();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete(reglementId);
      if (typeof onDeleted === 'function') {
        onDeleted();  // Invoke onDeleted callback if provided
      }
      setLoading(false);
    } catch (error) {
      Modal.error({
        title: 'Failed to delete reglement',
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
        <ExclamationCircleOutlined style={{ color: 'red' }} /> Delete Reglement
      </Title>
      <Paragraph>
        Are you sure you want to delete this reglement? This action cannot be undone and will permanently remove the reglement.
      </Paragraph>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="danger" onClick={handleConfirmDelete} loading={isDeleting} style={{ marginRight: 20 }}>
          Yes, delete it
        </Button>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
      </div>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
    </Card>
  );
};

export default DeleteReglementButton;
