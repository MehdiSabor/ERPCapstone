import React from 'react';
import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteFour } from '../../hooks/fourHooks';

const { Title, Paragraph } = Typography;

const FourDeleteButton = ({ fourId, onSuccess }) => {
  const { handleDelete } = useDeleteFour();

  const handleConfirmDelete = async () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this fournisseur?',
      content: 'This action cannot be undone and will permanently remove the fournisseur.',
      okText: 'Yes, delete it',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        await handleDelete(fourId);
        if (typeof onSuccess === 'function') {
          onSuccess();
        }
      }
    });
  };

  return (
    <Card bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
        <ExclamationCircleOutlined style={{ color: 'red' }} /> Delete Fournisseur
      </Title>
      <Paragraph style={{ textAlign: 'center' }}>
        Are you sure you want to delete this fournisseur? This action cannot be undone and will permanently remove the fournisseur.
      </Paragraph>
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <Button type="danger" onClick={handleConfirmDelete}>
          Delete Fournisseur
        </Button>
      </div>
    </Card>
  );
};

export default FourDeleteButton;
