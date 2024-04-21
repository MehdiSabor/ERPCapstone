import React, { useEffect } from 'react';
import { Card, Button, Spin, Alert, Row, Col, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchComById } from '../../hooks/comHooks';

const { Title, Text } = Typography;

const SingleCom = ({ comId, onChangeView }) => {
  const { Com, loading, error } = useFetchComById(comId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const comButtons = [
      <Button key="update" type="primary" onClick={() => onChangeView('update', comId)}>Update Commercial</Button>,
      <Button key="delete" type="danger" onClick={() => onChangeView('delete', comId)}>Delete Commercial</Button>
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2),
      ...comButtons
    ]);

    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
  }, [setSidebarButtons, onChangeView, comId]);

  const itemStyle = {
    marginBottom: '16px'
  };
  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };

  return (
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
  );
};

export default SingleCom;
