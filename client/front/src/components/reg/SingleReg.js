import React, { useEffect, useCallback } from 'react';
import { Card, Col, Row, Spin, Alert, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import UnifiedFactureAvoirList from './UnifiedFactureAvoirsList';
import ReglementDetailsList from './RegDetailsList';
import { useFetchReglementById } from '../../hooks/regHooks';

const { Title, Text } = Typography;

const SingleReglement = ({ reglementId, onChangeView }) => {
  const { reglement, loading, error } = useFetchReglementById(reglementId);

  useEffect(() => {
    // This example assumes `useFetchReglementById` already manages state internally.
  }, [reglementId]);

  const { setSidebarButtons } = useSidebar();
  const stableOnChangeView = useCallback(onChangeView, []);

  useEffect(() => {
    const reglementButtons = [
      <button key="modify" onClick={() => stableOnChangeView('modify', reglementId)}>Modify Reglement</button>,
      <button key="delete" onClick={() => stableOnChangeView('delete', reglementId)}>Delete Reglement</button>,
    ];
    setSidebarButtons(reglementButtons);
    return () => setSidebarButtons([]);
  }, [setSidebarButtons, stableOnChangeView, reglementId]);

  if (loading) return <Spin spinning={true} tip="Loading..."><div style={{ minHeight: '200px' }} /></Spin>;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;
  if (!reglement) return <Alert message="No Reglement found" type="info" showIcon />;
 
  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };

  return (
    <div>
      <Card title={`Reglement Overview - ${reglementId}`} style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Client Code</Title>
            <Text>{reglement.CODE_CLT}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Client</Title>
            <Text>{reglement.CLIENT}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Account</Title>
            <Text>{reglement.COMPTE || 'N/A'}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Amount to Regulate</Title>
            <Text>{`${reglement.MNT_REGLER.toFixed(2)} €`}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Payment Mode</Title>
            <Text>{reglement.MODE_REG || 'N/A'}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Bank</Title>
            <Text>{reglement.BANQUE || 'N/A'}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Date of Regulation</Title>
            <Text>{reglement.DATE_REG ? new Date(reglement.DATE_REG).toLocaleDateString() : 'N/A'}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Remarks</Title>
            <Text>{reglement.REMARQUE || 'None'}</Text>
          </Col>
        </Row>
      </Card>
      <Card title={`Reglement Details - ${reglementId}`} >
        <Row gutter={16}>
          <Col span={12}>
            <UnifiedFactureAvoirList reglementId={reglementId} />
          </Col>
          <Col span={12}>
            <ReglementDetailsList reglementId={reglementId} reglement={reglement} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SingleReglement;

