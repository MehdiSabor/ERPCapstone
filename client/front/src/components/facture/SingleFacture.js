import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Table, Typography, Tag, Row, Col, Spin, Alert } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchFactureById, useFetchDetailFacturesByFacture, useValidateFacture } from '../../hooks/factureHooks';
import CancelFactureButton from './CancelFactureButton';
import SingleClient from '../client/SingleClient';

const { Title, Text } = Typography;


const SingleFacture = ({ factureId }) => {
  const { facture, loading: loadingFacture, error: errorFacture } = useFetchFactureById(factureId);
  const { details, loading: loadingDetails, error: errorDetails } = useFetchDetailFacturesByFacture(factureId);
  const { validate, isValidated, error: validationError } = useValidateFacture(factureId);
  const { setSidebarButtons } = useSidebar();
  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    const factureButtons = [
      <Button key="viewClient" type="primary" onClick={() => setShowClientModal(true)}>View Client</Button>
      // ... potentially other buttons
    ];

    setSidebarButtons(factureButtons);

    return () => setSidebarButtons([]);
  }, [setSidebarButtons, factureId]);

  const handleValidateClick = async () => {
    try {
      await validate(factureId);
      alert('Facture has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate facture: ${error}`);
    }
  };

  const columns = [
    {
      title: 'Code Art',
      dataIndex: 'CODE_ART',
      key: 'CODE_ART',
    },
    {
      title: 'Article',
      dataIndex: 'ARTICLE',
      key: 'ARTICLE',
    },
    {
      title: 'Quantity',
      dataIndex: 'QTE',
      key: 'QTE',
      render: (text) => `${parseFloat(text).toFixed(2)}`, // Ensures numbers are shown with two decimal places
    },
    {
      title: 'Free',
      dataIndex: 'GRATUIT',
      key: 'GRATUIT',
      render: (text) => text ? `${parseFloat(text).toFixed(2)}` : 'N/A', // Shows 'N/A' if GRATUIT is null
    },
    {
      title: 'PV HT',
      dataIndex: 'PV_HT',
      key: 'PV_HT',
      render: (text) => `${parseFloat(text).toFixed(2)}€`, // Format as currency
    },
    {
      title: 'PV TTC',
      dataIndex: 'PV_TTC',
      key: 'PV_TTC',
      render: (text) => `${parseFloat(text).toFixed(2)}€`, // Format as currency
    },
    {
      title: 'Discount',
      dataIndex: 'REMISE',
      key: 'REMISE',
      render: (text) => text ? `${parseFloat(text).toFixed(2)}%` : '0%', // Shows '0%' if REMISE is null
    },
    {
      title: 'VAT',
      dataIndex: 'TVA',
      key: 'TVA',
      render: (text) => `${text}%`, // Append '%' symbol
    },
    {
      title: 'Total HT',
      dataIndex: 'TotalHT',
      key: 'TotalHT',
      render: (text) => `${parseFloat(text).toFixed(2)}€`, // Format as currency
    },
    {
      title: 'Total TTC',
      dataIndex: 'TotalTTC',
      key: 'TotalTTC',
      render: (text) => `${parseFloat(text).toFixed(2)}€`, // Format as currency
    }
  ];
  
  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not provided';

  if (loadingFacture || loadingDetails) return <Spin tip="Loading..." />;
  if (errorFacture || errorDetails) return <Alert message="Error" description={errorFacture || errorDetails} type="error" showIcon />;
  if (!facture) return <Alert message="No facture found" type="info" showIcon />;
  if (validationError) return <Alert message="Validation Error" description={validationError} type="error" showIcon />;
  
  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
  };


  return (
    <div>
      <Card
        title={
          <>
            Facture Details - {facture.REF_FAC}
            {isValidated ? (
              <Tag color="green" style={{ marginLeft: '8px' }}>
                Validated
              </Tag>
            ) : (
              <Tag color="red" style={{ marginLeft: '8px' }}>
                Not Validated
              </Tag>
            )}
          </>
        }
        bordered={false}
        extra={
  !isValidated ? (
    <Button type="primary" onClick={handleValidateClick}>
      Validate Facture
    </Button>
  ) : (
    <CancelFactureButton refFAC={factureId} />
  )
}

          
      >
      <Row gutter={16}>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Date of Facture</Title>
      <Text>{new Date(facture.DATE_FAC).toLocaleDateString()}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Client</Title>
      <Text>{facture.CLIENT}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Account</Title>
      <Text>{facture.COMPTE || 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Client Code</Title>
      <Text>{facture.CODE_CLT}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Amount HT</Title>
      <Text>{`${facture.MNT_HT.toFixed(2)} €`}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Amount TTC</Title>
      <Text>{`${facture.MNT_TTC.toFixed(2)} €`}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Salesperson Code</Title>
      <Text>{facture.CODE_COM}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Delivery Mode</Title>
      <Text>{facture.MODELIV || 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Payment Mode</Title>
      <Text>{facture.MODE_PAIE || 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Remarks</Title>
      <Text>{facture.REMARQUE || 'None'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Date Validated</Title>
      <Text>{facture.DATEVALID ? new Date(facture.DATEVALID).toLocaleDateString() : 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Reference Bonliv</Title>
      <Text>{facture.REF_BL || 'N/A'}</Text>
    </Col>
  </Row>
        {/* ... Facture Details ... */}
      </Card>

      <Card title="Items in Facture" style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={details} rowKey="CODE_ART" pagination={false} />
      </Card>

      {showClientModal && (
        <Modal
          title="Client Details"
          visible={showClientModal}
          onOk={() => setShowClientModal(false)}
          onCancel={() => setShowClientModal(false)}
          footer={[
            <Button key="back" onClick={() => setShowClientModal(false)}>
              Close
            </Button>
          ]}
        >
        <SingleClient clientId={facture.CODE_CLT} />
          {/* SingleClient component content */}
        </Modal>
      )}
    </div>
  );
};

export default SingleFacture;
