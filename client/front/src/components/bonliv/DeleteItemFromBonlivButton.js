import React from 'react';
import { Button, Modal } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useDeleteItemFromBonliv } from '../../hooks/bonlivHooks'; // Adjust the import path as necessary

const DeleteItemFromBonlivButton = ({ refBonliv, codeArt, onSuccess }) => {
  const { deleteItem } = useDeleteItemFromBonliv();

  const handleDelete = async () => {
    try {
      await deleteItem(refBonliv, codeArt);
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
    } catch (error) {
      // Handle any errors that occur during the deletion
      console.error('Failed to delete item:', error);
      Modal.error({
        title: 'Error',
        content: `Could not delete the item from the bonliv. ${error.message || ''}`,
      });
    }
  };

  const showConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to remove this item from the bonliv?',
      icon: <DeleteOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes, remove it',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete();
      }
    });
  };

  return (
    <Button onClick={showConfirm} type="danger" icon={<DeleteOutlined />}>
      Remove Item
    </Button>
  );
};

export default DeleteItemFromBonlivButton;
