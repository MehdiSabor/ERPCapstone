import React from 'react';
import { Button, Modal } from 'antd';
import { useDeleteItemFromDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary
import { ExclamationCircleOutlined } from '@ant-design/icons';

const DeleteItemFromDevisButton = ({ refDevis, codeArt, onSuccess }) => {
  const { deleteItem } = useDeleteItemFromDevis();

  const handleClick = async () => {
    Modal.confirm({
      title: 'Are you sure you want to remove this item?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone and will permanently remove the item from the devis.',
      okText: 'Yes, remove it',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await deleteItem(refDevis, codeArt);
          if (onSuccess) {
            onSuccess(); // Call the onSuccess callback
          }
        } catch (error) {
          // Handle any errors that occur during the deletion
          Modal.error({
            title: 'Failed to delete item',
            content: error.message || 'An error occurred while trying to delete the item.',
          });
        }
      }
    });
  };

  return (
    <Button onClick={handleClick} type="danger" icon={<ExclamationCircleOutlined />}>
      Remove Item
    </Button>
  );
};

export default DeleteItemFromDevisButton;
