import React, { useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchFamilleById } from '../../hooks/familleHooks';

const { Title, Text } = Typography;

const SingleFamille = ({ familleId, onChangeView }) => {
  const { famille, loading, error } = useFetchFamilleById(familleId);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const familleButtons = [
      <button key="delete" onClick={() => onChangeView('delete', familleId)}>Delete Famille</button>
    ];

    setSidebarButtons(familleButtons);

    return () => setSidebarButtons([]);
  }, [setSidebarButtons, onChangeView, familleId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!famille) return <p>No Famille found</p>;

  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };


  return (
    <Card title="Famille Details" bordered={false}>
      <Row gutter={16}>
        <Col span={12}>
          <Title level={5}style={titleStyle}>Name</Title>
          <Text>{famille.nom}</Text>
        </Col>
        <Col span={12}>
          <Title level={5}style={titleStyle}>Code</Title>
          <Text>{famille.code_fam}</Text>
        </Col>
      </Row>
    </Card>
  );
};

export default SingleFamille;
