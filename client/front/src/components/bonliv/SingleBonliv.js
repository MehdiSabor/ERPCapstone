import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Typography, Tag, Row, Col, Spin, Alert, Modal,message } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchBonlivById, useFetchItemsInBonliv, useValidateBonliv } from '../../hooks/bonlivHooks';

// Assuming these forms exist
import UpdateBonlivForm from './BonlivupdateForm';
import DeleteBonlivForm from './BonlivDeleteButton';
import ItemInBonlivList from './ItemInBonlivList';

const { Title, Text } = Typography;

const SingleBonliv = ({ bonlivId, onChangeView }) => {
  const { bonliv, loading: loadingBonliv, error: errorBonliv, refetch } = useFetchBonlivById(bonlivId);
  const { items, loading: loadingItems, error: errorItems, refetch: fetchItems  } = useFetchItemsInBonliv(bonlivId);
  const { validate, error: validateError, isValidated } = useValidateBonliv(bonlivId);
  const { setSidebarButtons } = useSidebar();
  
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
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: 'Qte Liv',
      dataIndex: 'qteliv',
      key: 'qteliv',
      render: (text) => text ? parseFloat(text).toFixed(2) : 'N/A',
    },
    {
      title: 'Free',
      dataIndex: 'GRATUIT',
      key: 'GRATUIT',
      render: (text) => text ? parseFloat(text).toFixed(2) : 'N/A',
    },
    {
      title: 'PA HT',
      dataIndex: 'PA_HT',
      key: 'PA_HT',
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: 'PV HT',
      dataIndex: 'PV_HT',
      key: 'PV_HT',
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: 'PV TTC',
      dataIndex: 'PV_TTC',
      key: 'PV_TTC',
      render: (text) => parseFloat(text).toFixed(2),
    },
    {
      title: 'Discount',
      dataIndex: 'REMISE',
      key: 'REMISE',
      render: (text) => text ? `${parseFloat(text).toFixed(2)}%` : '0%',
    },
    
    {
      title: 'VAT',
      dataIndex: 'TVA',
      key: 'TVA',
      render: (text) => `${text}%`,
    },
    
    {
      title: 'Total HT ',
      dataIndex: 'TotalHTliv',
      key: 'TotalHTliv',
      render: (text) => text ? parseFloat(text).toFixed(2) : 'N/A',
    },
    {
      title: 'Total TTC ',
      dataIndex: 'TotalTTCliv',
      key: 'TotalTTCliv',
      render: (text) => text ? parseFloat(text).toFixed(2) : 'N/A',
    },
  ];
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateItemsModalVisible, setUpdateItemsModalVisible] = useState(false);

  useEffect(() => {
    const bonlivButtons = [
      <Button key="update" onClick={() => setUpdateModalVisible(true)}>Update Bonliv</Button>,
      <Button key="delete" onClick={() => setDeleteModalVisible(true)}>Delete Bonliv</Button>,
      <Button key="viewItems" onClick={() => setUpdateItemsModalVisible(true)}>Update Items</Button>
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 1), // Keep the first two base buttons
      ...bonlivButtons
    ]);
    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 1));
  }, [setSidebarButtons]);

  const handleValidateClick = async () => {
    try {
      await validate();
      alert('Bonliv has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate bonliv: ${error}`);
    }
  };

  const handleUpdateSuccess = () => {
    message.success('Bonliv updated successfully!');
    setUpdateModalVisible(false);
    refetch(); // Refresh Bonliv details
  };

  const handleDeleteSuccess = () => {
    message.success('Bonliv deleted successfully!');
    setDeleteModalVisible(false);
    onChangeView('list'); // Assuming there's a navigation method to go back to the list
  };

  const handleItemUpdateSuccess = () => {
    
    refetch(); 
    fetchItems(); // Refresh items list
  };


  if (loadingBonliv || loadingItems) return <Spin tip="Loading..." />;
  if (errorBonliv || errorItems) return <Alert message="Error" description={errorBonliv || errorItems} type="error" showIcon />;
  if (!bonliv) return <Alert message="No bonliv found" type="info" showIcon />;

  return (
    <div>
       <Card
  title={
    <>
      Bonliv Details - {bonliv.REF_BL}
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
        Validate Bonliv
      </Button>
    )
  }
>
  <Row gutter={16}>
    
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Date</Title>
      <Text>{new Date(bonliv.DATE_BL).toLocaleDateString()}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Client</Title>
      <Text>{bonliv.CLIENT}</Text>
    </Col>
    
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Total HT Liv</Title>
      <Text>{bonliv.MNT_HTliv ? bonliv.MNT_HTliv.toFixed(2) : 'N/A'}€</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Total TTC Liv</Title>
      <Text>{bonliv.MNT_TTCliv ? bonliv.MNT_TTCliv.toFixed(2) : 'N/A'}€</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Delivery Mode</Title>
      <Text>{bonliv.MODELIV || 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Payment Mode</Title>
      <Text>{bonliv.MODE_PAIE || 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Salesperson Code</Title>
      <Text>{bonliv.CODE_COM ? bonliv.CODE_COM.toString() : 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Validating Date</Title>
      <Text>{bonliv.DATEVALID ? new Date(bonliv.DATEVALID).toLocaleDateString() : 'N/A'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Remarks</Title>
      <Text>{bonliv.REMARQUE || 'None'}</Text>
    </Col>
    <Col span={24}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Account</Title>
      <Text>{bonliv.COMPTE || 'N/A'}</Text>
    </Col>
  </Row>
</Card>

      <Card title="Items in Bonliv" style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={items} rowKey="CODE_ART" />
      </Card>

      {/* Modals for updating, deleting, and updating items */}
      
      <Modal
        title="Update Bonliv"
        visible={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        footer={null}
      >
        <UpdateBonlivForm bonlivId={bonlivId} onSuccess={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Bonliv"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        footer={null}
      >
        <DeleteBonlivForm bonlivId={bonlivId} onSuccess={handleDeleteSuccess} />
      </Modal>
      <Modal
        title="Update Items in Bonliv"
        visible={updateItemsModalVisible}
        onCancel={() => setUpdateItemsModalVisible(false)}
        footer={null}
      >
        <ItemInBonlivList refBonliv={bonliv.REF_BL} onSuccess={handleItemUpdateSuccess} />
      </Modal>
    </div>
  );
};

export default SingleBonliv;
