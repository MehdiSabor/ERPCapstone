import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Row, Col, message, Typography, Tabs } from 'antd';
import { UserOutlined, PhoneOutlined,  CheckCircleOutlined,
  CloseCircleOutlined,HomeOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { useSidebar } from '../../SidebarContext';
import { useFetchFourById } from '../../hooks/fourHooks';
import FourUpdateForm from './FourupdateForm';  // Ensure you have this form component created
import FourDeleteButton from './FourDeleteButton';  // Ensure you have this button component created

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const SingleFour = ({ fourId, onChangeView }) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { Four, loading, error, refetch } = useFetchFourById(fourId);
  const { setSidebarButtons } = useSidebar();

  const formatBool = (value) => value ? 'Yes' : 'No';
  


  useEffect(() => {
    const fourButtons = [
      <Button key="update" type="primary" onClick={() => setIsUpdateModalVisible(true)}>Update Fournisseur</Button>,
      <Button key="delete" type="danger" onClick={() => setIsDeleteModalVisible(true)}>Delete Fournisseur</Button>
    ];
    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2), // Adjust slice as necessary
      ...fourButtons
    ]);

    return () => {
      setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    };
  }, [setSidebarButtons, onChangeView, fourId]);

  const handleUpdateSuccess = () => {
    message.success('Fournisseur updated successfully!');
    setIsUpdateModalVisible(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    message.success('Fournisseur deleted successfully!');
    setIsDeleteModalVisible(false);
    onChangeView('list'); // Navigate back to the fournisseur list or dashboard
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Four) return <p>No fournisseur found</p>;

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not provided';

  const textStyle = {
    marginBottom: "10px",
    display: "block",
    fontSize: "16px", // Adjust the font size as needed
  };

  const cardContentStyle = {
    paddingLeft: "24px", // Add left padding to card content
    paddingTop: "10px",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#333", // Darker font color for better visibility
    borderBottom: "2px solid #ccc", // Separator line
    paddingBottom: "10px", // Spacing between title and separator line
    marginTop: "-10px",
  };

  const cardStyle = {
    marginTop: "20px",
    backgroundColor: "#f8f8f8", // Lighter than the main background for emphasis
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds subtle shadow for depth
  };

  const mainBackgroundStyle = {
    background: "white", // Main background color
    padding: "20px",
  };
  
  return (
    <div style={mainBackgroundStyle}>
      <Title level={2} style={titleStyle}>Fournisseur Details - {Four.code_frs}</Title>
      <Card style={cardStyle}>
        <Row gutter={[24, 24]} style={cardContentStyle}>
          <Col span={12}>
            <Text style={textStyle}>
              <UserOutlined /> <strong>Account:</strong> {Four.compte}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <HomeOutlined /> <strong>Social Name:</strong> {Four.sociale}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <PhoneOutlined /> <strong>Description:</strong> {Four.desc}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <CalendarOutlined /> <strong>Country:</strong> {Four.pays}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <InfoCircleOutlined /> <strong>Due:</strong> {formatBool(Four.echeance)}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <CalendarOutlined /> <strong>Note:</strong> {Four.note}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <InfoCircleOutlined /> <strong>Payment Conditions:</strong> {formatBool(Four.cond_paie)}
            </Text>
          </Col>
          <Col span={12}>
            <Text style={textStyle}>
              <InfoCircleOutlined /> <strong>Status:</strong> {!Four.bloquer ? (
                    <CheckCircleOutlined
                      style={{ color: "green", marginLeft: 8 }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: "red", marginLeft: 8 }}
                    />
                  )}
            </Text>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Update Fournisseur"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <FourUpdateForm fourId={fourId} onFinishedUpdate={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Fournisseur"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <FourDeleteButton fourId={fourId} onSuccess={handleDeleteSuccess} />
      </Modal>
    </div>
  );
};


export default SingleFour;
