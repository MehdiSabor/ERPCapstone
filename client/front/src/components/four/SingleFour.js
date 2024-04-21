import React, { useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchFourById } from '../../hooks/fourHooks';

const { Title, Text } = Typography;

const SingleFour = ({ fourId, onChangeView }) => {
  const { Four, loading, error } = useFetchFourById(fourId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const fourButtons = [
      <button key="update" onClick={() => onChangeView('update', fourId)}>Update Fournisseur</button>,
      <button key="delete" onClick={() => onChangeView('delete', fourId)}>Delete Fournisseur</button>
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2),
      ...fourButtons
    ]);

    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
  }, [setSidebarButtons, onChangeView, fourId]);

  const formatBool = (value) => value ? 'Yes' : 'No';

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!Four) return <p>No fournisseur found</p>;

  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };
  return (
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
  );
};

export default SingleFour;
