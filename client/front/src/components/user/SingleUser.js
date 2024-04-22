import React, { useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchUserById } from '../../hooks/userHooks';

const { Title, Text } = Typography;

const SingleUser = ({ userId, onChangeView }) => {
  const { user, loading, error } = useFetchUserById(userId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const userButtons = [
      <button key="delete" onClick={() => onChangeView('delete', userId)}>Delete User</button>,
    <button key="modify" onClick={() => onChangeView('modify', userId)}>Modify User</button>
     ];

    setSidebarButtons(userButtons);

    return () => setSidebarButtons([]);
  }, [setSidebarButtons, onChangeView, userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!user) return <p>No User found</p>;

  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };

  return (
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
  );
};

export default SingleUser;
