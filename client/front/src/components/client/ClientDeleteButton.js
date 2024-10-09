import React, { useState } from 'react';

import { Button, Card, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDeleteClient } from '../../hooks/clientHooks';

const { Title, Paragraph } = Typography;

const ClientDeletePage = ({ clientId ,onSuccess}) => {
  const [loading, setLoading] = useState(false);

  const { handleDelete } = useDeleteClient();

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await handleDelete(clientId);
      // Navigate back or to another relevant page on success
      onSuccess();
    } catch (error) {
      Modal.error({
        title: 'Failed to delete client',
        content: error.message,
      });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    
  };

  return (
    <Card bordered={false} style={{ maxWidth: 600, margin: '40px auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 20 }}>
        <ExclamationCircleOutlined style={{ color: 'red' }} /> Delete Client
      </Title>
      <Paragraph>
        Are you sure you want to delete this client? This action cannot be undone and will permanently remove all related client data.
      </Paragraph>
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Button type="danger" onClick={handleConfirmDelete} loading={loading} style={{ marginRight: 20 }}>
          Yes, delete it
        </Button>
        
      </div>
    </Card>
  );
};

export default ClientDeletePage;
