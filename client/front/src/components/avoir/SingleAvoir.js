import React, { useEffect, useState } from 'react';
import { Modal, Button, Card, Table, Typography, Tag, Row, Col, Spin, Alert } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchAvoirById, useFetchItemsInAvoir, useValidateAvoir } from '../../hooks/avoirHooks';
 // Ensure you have this component
 import SingleClient from '../client/SingleClient';


const { Title, Text } = Typography;

const SingleAvoir = ({ avoirId , onChangeView }) => {
  const { avoir, loading: loadingAvoir, error: errorAvoir } = useFetchAvoirById(avoirId);
  const { items, loading: loadingItems, error: errorItems } = useFetchItemsInAvoir(avoirId);
  const { validate, isValidated, error: validationError } = useValidateAvoir(avoirId);
  const { setSidebarButtons } = useSidebar();

  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    const avoirButtons = [
      <button key="update" onClick={() => onChangeView('update', avoirId)}>Update Avoir</button>,
      <button key="delete" onClick={() => onChangeView('delete', avoirId)}>Delete Avoir</button>,
      <button key="addItem" onClick={() => onChangeView('addItem', avoirId)}>Add Item</button>,
      <button key="viewItems" onClick={() => onChangeView('viewItems', avoirId)}>View Items</button>,
      <Button key="viewClient" type="primary" onClick={() => setShowClientModal(true)}>View Client</Button>
     
    ];
    

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2), // Keep the first two base buttons
      ...avoirButtons
    ]);

    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
  }, [setSidebarButtons, onChangeView, avoirId]);

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
  

  const handleValidateClick = async () => {
    try {
        
      await validate(avoirId);
      alert('Avoir has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate avoir: ${error}`);
    }
  };

  // Define your columns for Table here as in the example provided

  if (loadingAvoir || loadingItems) return <Spin tip="Loading..." />;
  if (errorAvoir || errorItems) return <Alert message="Error" description={errorAvoir || errorItems} type="error" showIcon />;
  if (!avoir) return <Alert message="No avoir found" type="info" showIcon />;
  if (validationError) return <Alert message="Validation Error" description={validationError} type="error" showIcon />;
  
  // Add any other title styles you may have
  const titleStyle = { marginBottom: '4px', marginTop: '0px' };

  return (
    <div>
      <Card
        title={
          <>
            Avoir Details - {avoir.REF_AVOIR}
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
    !isValidated && (
      <Button type="primary" onClick={handleValidateClick}>
        Validate Avoir
      </Button>
    )
  }
      >
      <Row gutter={16}>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Date of avoir</Title>
      <Text>{new Date(avoir.DATE_FAC).toLocaleDateString()}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Client</Title>
      <Text>{avoir.CLIENT}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Account</Title>
      <Text>{avoir.COMPTE || 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Client Code</Title>
      <Text>{avoir.CODE_CLT}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Amount HT</Title>
      <Text>{`${avoir.MNT_HT.toFixed(2)} €`}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Amount TTC</Title>
      <Text>{`${avoir.MNT_TTC.toFixed(2)} €`}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Salesperson Code</Title>
      <Text>{avoir.CODE_COM}</Text>
    </Col>
    
    <Col span={8}>
      <Title level={5} style={titleStyle}>Remarks</Title>
      <Text>{avoir.REMARQUE || 'None'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Date Validated</Title>
      <Text>{avoir.DATEVALID ? new Date(avoir.DATEVALID).toLocaleDateString() : 'N/A'}</Text>
    </Col>
    
  </Row>
        {/* Insert Row and Col layout similar to the avoir details here */}
      </Card>

      {/* Table for Items in Avoir */}
      <Card title="Items in Avoir" style={{ marginTop: 20 }}>
        {/* Insert Table with columns and data source here */}
        <Table columns={columns} dataSource={items} rowKey="CODE_ART" pagination={false} />
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
        <SingleClient clientId={avoir.CODE_CLT} />
          {/* SingleClient component content */}
        </Modal>
      )}
    </div>
  );
};

export default SingleAvoir;
