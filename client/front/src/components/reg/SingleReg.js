import React, { useEffect,useState, useCallback,useMemo } from 'react';
import { Modal,Card, Col, Row, Spin,message, Alert, Typography } from 'antd';
import { useSidebar } from '../../SidebarContext';
import UnifiedFactureAvoirList from './UnifiedFactureAvoirsList';
import ReglementDetailsList from './RegDetailsList';
import { useFetchAllUnifiedFactureAvoir, useFetchReglementById } from '../../hooks/regHooks';
import ModifyRegForm from './ModifyRegForm';
import RegDeleteButton from './DeleteRegButton';

const { Title, Text } = Typography;

const SingleReglement = ({ reglementId, onChangeView }) => {
  const { reglement, loading, error, refetch: fetchReglement } = useFetchReglementById(reglementId);
  const { unifiedRecords, refetch: fetchUnifiedRecords } = useFetchAllUnifiedFactureAvoir();
 // Calculate the sum of all registered amounts
 const totalRegistered = useMemo(() => reglement?.reglementdetails?.reduce((total, detail) => total + detail.MNT_REGLER, 0) || 0, [reglement]);
 const remainingAmount = reglement?.MNT_REGLER - totalRegistered;
 const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  

  useEffect(() => {
    // This example assumes `useFetchReglementById` already manages state internally.
  }, [reglementId]);

  
  const { setSidebarButtons } = useSidebar();
  const stableOnChangeView = useCallback(onChangeView, []);

  useEffect(() => {
    const reglementButtons = [
      <button key="modify" onClick={() => setIsUpdateModalVisible(true)}>Modify Reglement</button>,
      <button key="delete" onClick={() => setIsDeleteModalVisible(true)}>Delete Reglement</button>,
    ];
    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2),
      ...reglementButtons
    ]);
    return () => {
      setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    };
  }, [setSidebarButtons, stableOnChangeView, reglementId]);

  if (loading) return <Spin spinning={true} tip="Loading..."><div style={{ minHeight: '200px' }} /></Spin>;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;
  if (!reglement) return <Alert message="No Reglement found" type="info" showIcon />;
 
  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };

  const handleRefetch = () => {
    fetchReglement();
    fetchUnifiedRecords();
  };
  
  const handleUpdateSuccess = () => {
    message.success('Fournisseur updated successfully!');
    setIsUpdateModalVisible(false);
    handleRefetch();
  };

  const handleDeleteSuccess = () => {
    message.success('Fournisseur deleted successfully!');
    setIsDeleteModalVisible(false);
    onChangeView('list'); // Navigate back to the fournisseur list or dashboard
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
          <Col span={8}>
            <Title level={5} style={titleStyle}>Total Registred</Title>
            <Text>{totalRegistered || 'None'}</Text>
          </Col>
          <Col span={8}>
            <Title level={5} style={titleStyle}>Remaining Amount</Title>
            <Text>{remainingAmount || 'None'}</Text>
          </Col>
        </Row>
      </Card>
      <Card title={`Reglement Details - ${reglementId}`} >
        <Row gutter={16}>
          <Col span={12}>
            <UnifiedFactureAvoirList reglementId={reglementId} handleRefetch={handleRefetch} />
          </Col>
          <Col span={12}>
            <ReglementDetailsList reglementId={reglementId} reglement={reglement} handleRefetch={handleRefetch} loading={loading} error={error}/>
          </Col>
        </Row>
      </Card>


      <Modal
        title="Update Reglement"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <ModifyRegForm reglementId={reglementId} onFinishedUpdate={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Reglement"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <RegDeleteButton reglementId={reglementId} onDeleted={handleDeleteSuccess} />
      </Modal>
    </div>
  );
};

export default SingleReglement;

