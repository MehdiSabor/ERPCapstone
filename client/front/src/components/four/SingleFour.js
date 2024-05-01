import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Row, Col, message, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchFourById } from '../../hooks/fourHooks';
import FourUpdateForm from './FourupdateForm';  // You need to create this
import FourDeleteButton from './FourDeleteButton';  // You need to create this
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SingleFour = ({ fourId, onChangeView }) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { Four, loading, error, refetch } = useFetchFourById(fourId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const fourButtons = [<Button
      key="update"
      type="primary"
      icon={<EditOutlined />}
      onClick={() => setIsUpdateModalVisible(true)}
    >
      Update Fournisseur
    </Button>,
    <Button
      key="delete"
      type="danger"
      icon={<DeleteOutlined />}
      onClick={() => setIsDeleteModalVisible(true)}
    >
      Delete Fournisseur
    </Button>
    ];
    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2),
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

  const formatBool = (value) => value ? 'Yes' : 'No';

  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };


  return (
    <div>
       <Card title="Fournisseur Details" bordered={false}>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={5}style={titleStyle}>Code Fournisseur</Title>
          <Text>{Four.code_frs}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}style={titleStyle}>Account</Title>
          <Text>{Four.compte}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Social Name</Title>
          <Text>{Four.sociale}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Description</Title>
          <Text>{Four.desc}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Country</Title>
          <Text>{Four.pays}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Due</Title>
          <Text>{formatBool(Four.echeance)}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Note</Title>
          <Text>{Four.note}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Payment Conditions</Title>
          <Text>{formatBool(Four.cond_paie)}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}>Blocked</Title>
          <Text>{formatBool(Four.bloquer)}</Text>
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
