import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Row, Col, message, Typography, Tabs } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, InfoCircleOutlined, CalendarOutlined } from '@ant-design/icons';

import { useSidebar } from '../../SidebarContext';
import { useFetchComById } from '../../hooks/comHooks';
import ComUpdateForm from './ComupdateForm';  // Ensure you have this form component created
import ComDeleteButton from './ComDeleteButton';  // Ensure you have this button component created

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const SingleCom = ({ comId, onChangeView }) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { Com, loading, error, refetch } = useFetchComById(comId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const comButtons = [
      <Button key="update" type="primary" onClick={() => setIsUpdateModalVisible(true)}>Update Commercial</Button>,
      <Button key="delete" type="danger" onClick={() => setIsDeleteModalVisible(true)}>Delete Commercial</Button>
    ];
    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2), // Adjust slice as necessary
      ...comButtons
    ]);

    return () => {
      setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    };
  }, [setSidebarButtons, onChangeView, comId]);

  const handleUpdateSuccess = () => {
    message.success('Commercial updated successfully!');
    setIsUpdateModalVisible(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    message.success('Commercial deleted successfully!');
    setIsDeleteModalVisible(false);
    onChangeView('list'); // Navigate back to the commercial list or dashboard
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Com) return <p>No commercial found</p>;

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not provided';

  const textStyle = {
    marginBottom: '10px',
    display: 'block',
    fontSize: '16px', // Adjust the font size as needed
  };

  const cardContentStyle = {
    paddingLeft: '24px', // Add left padding to card content
    paddingTop: '10px',
  };

  const titleStyle = {
    marginBottom: '20px',
    fontWeight: 'bold',
    color: '#333', // Darker font color for better visibility
    borderBottom: '2px solid #ccc', // Separator line
    paddingBottom: '10px', // Spacing between title and separator line
    marginTop: '-10px',
  };

  const cardStyle = {
    marginTop: '20px',
    backgroundColor: '#f8f8f8', // Lighter than the main background for emphasis
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', // Optional: adds subtle shadow for depth
  };

  const mainBackgroundStyle = {
    background: 'white', // Main background color
    padding: '20px',
  };

  return (
    <div style={mainBackgroundStyle}>
      <Title level={2} style={titleStyle}>{Com.nom} - {Com.code_com}</Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Commercial Information" key="1">
          <Card style={cardStyle}>
            <Row gutter={[24, 24]} style={cardContentStyle}>
              <Col span={12}>
                <Text style={textStyle}>
                  <UserOutlined /> <strong>Name:</strong> {Com.nom}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <PhoneOutlined /> <strong>Phone:</strong> {Com.tel}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <HomeOutlined /> <strong>Email:</strong> {Com.email}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <InfoCircleOutlined /> <strong>Employee Code:</strong> {Com.code_com}
                </Text>
              </Col>
              {/* Additional fields can be added here with similar styling */}
            </Row>
          </Card>
        </TabPane>
      </Tabs>
      <Modal
        title="Update Commercial"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <ComUpdateForm comId={comId} onFinishedUpdate={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Commercial"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <ComDeleteButton comId={comId} onSuccess={handleDeleteSuccess} />
      </Modal>
    </div>
  );
};

export default SingleCom;
