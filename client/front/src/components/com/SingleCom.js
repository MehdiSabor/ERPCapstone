import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Row, Col, message,Typography, Spin, Alert } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchComById } from '../../hooks/comHooks';
import ComUpdateForm from './ComupdateForm';  // You need to create this
import ComDeleteButton from './ComDeleteButton';  // You need to create this

const { Title, Text } = Typography;

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

  const itemStyle = {
    marginBottom: '16px'
  };
  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };

  return (
    <div>
     
        {/* Dynamic content based on Com properties */}
        <Card title="Commercial Details" >
      {loading ? (
        <Spin tip="Loading..." />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : !Com ? (
        <Alert message="No commercial found" type="info" showIcon />
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Title level={5} style={titleStyle}>Code</Title>
              <Text>{Com.code_com}</Text>
            </Col>
            <Col span={12} >
              <Title level={5} style={titleStyle}>Name</Title>
              <Text>{Com.nom}</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={itemStyle}>
            <Col span={12}>
              <Title level={5}>Telephone</Title>
              <Text>{Com.tel}</Text>
            </Col>
            <Col span={12}>
              <Title level={5}>Email</Title>
              <Text>{Com.email}</Text>
            </Col>
          </Row>
        </div>
      )}
    </Card>
     
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
