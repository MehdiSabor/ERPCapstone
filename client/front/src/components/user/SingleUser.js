import React, { useEffect,useState } from 'react';
import {message, Card,Modal, Row, Col, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchUserById } from '../../hooks/userHooks';
import UserUpdateForm from './ModifyUserForm';  // You need to create this
import UserDeleteButton from './DeleteUserButton';  // You need to create this

const { Title, Text } = Typography;

const SingleUser = ({ userId, onChangeView }) => {
  const { user, loading, error,refetch } = useFetchUserById(userId);
  const { setSidebarButtons } = useSidebar();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
 
  useEffect(() => {
    const userButtons = [
      <button key="delete" onClick={() => setIsDeleteModalVisible(true)}>Delete User</button>,
    <button key="modify" onClick={() => setIsUpdateModalVisible(true)}>Modify User</button>
     ];

     setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2), // Adjust slice as necessary
      ...userButtons
    ]);

    return () => {
      setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    };
  }, [setSidebarButtons, onChangeView, userId]);

  const handleUpdateSuccess = () => {
    message.success('User updated successfully!');
    setIsUpdateModalVisible(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    message.success('User deleted successfully!');
    setIsDeleteModalVisible(false);
    onChangeView('list'); // Navigate back to the commercial list or dashboard
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No User found</p>;

  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };

  return (
    <div>
    <Card title="User Details" bordered={false}>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Name</Title>
          <Text>{user.Name}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Manager Status</Title>
          <Text>{user.IsManager ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Quotes</Title>
          <Text>{user.CanManageQuote ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Delivery Notes</Title>
          <Text>{user.CanManageDeliveryNote ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Invoices</Title>
          <Text>{user.CanManageInvoice ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Process Payments</Title>
          <Text>{user.CanProcessPayments ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Process Returns</Title>
          <Text>{user.CanProcessReturns ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Articles</Title>
          <Text>{user.CanManageArticles ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Clients</Title>
          <Text>{user.CanManageClients ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Commercials</Title>
          <Text>{user.CanManageCommercials ? "Yes" : "No"}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Can Manage Suppliers</Title>
          <Text>{user.CanManageFournisseurs ? "Yes" : "No"}</Text>
        </Col>
        
        <Col span={12}>
          <Title level={5} style={titleStyle}>Created At</Title>
          <Text>{new Date(user.CreatedAt).toLocaleString()}</Text>
        </Col>
        <Col span={12}>
          <Title level={5} style={titleStyle}>Updated At</Title>
          <Text>{new Date(user.UpdatedAt).toLocaleString()}</Text>
        </Col>
      </Row>
    </Card>
    <Modal
        title="Update User"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <UserUpdateForm userId={userId} onFinishedUpdate={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Commercial"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <UserDeleteButton userId={userId} onSuccess={handleDeleteSuccess} />
      </Modal>
      </div>
  );
};

export default SingleUser;
