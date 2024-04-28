import React, { useState,useEffect } from 'react';
import { Modal, Card,message, Button, List, Typography, Row, Col,Spin,Alert,Tag, Table } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchDevisById, useFetchItemsInDevis, useValidateDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary
import DevisUpdateForm from './DevisupdateForm';  // You need to create this
import DevisDeleteButton from './DevisDeleteButton';  // You need to create this
import DevisAddItemForm from './AddItemToDevisForm'; // You need to create this
import ItemsInDevisList from './ItemInDevisList';
import UpdateItemInDevisForm from './updateItemInDevisForm';

const { Title, Text } = Typography;

const SingleDevis = ({ devisId, onChangeView }) => {
  const { devis, loading: loadingDevis, error: errorDevis,refetch } = useFetchDevisById(devisId);
  const { items, loading: loadingItems, error: errorItems, refetch: fetchItems } = useFetchItemsInDevis(devisId);
  const { validate, error, isValidated } = useValidateDevis(devisId);
  const { setSidebarButtons } = useSidebar();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isItemsModalVisible, setIsItemsModalVisible] = useState(false);
  const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);


  const refetchData = () => {
    refetch();
     fetchItems(); // This function should be defined to fetch items related to the devis
  };
  // Function to handle the click on the Validate button
  const handleValidateClick = async () => {
    try {
      await validate();
      message.success('Devis has been successfully validated.');
      refetchData();// Optionally, you can trigger other actions here, such as navigating away or refreshing the data
    } catch (error) {
      message.error(`Failed to validate devis: ${error}`);
    }
  };

  useEffect(() => {
    const devisButtons = [
      <Button key="update" onClick={() => setIsUpdateModalVisible(true)}>Update Devis</Button>,
      <Button key="delete" onClick={() => setIsDeleteModalVisible(true)}>Delete Devis</Button>,
      <Button key="addItem" onClick={() => setIsAddItemModalVisible(true)}>Add Item</Button>,
     <Button key="viewItems" onClick={handleOpenItemsModal}>View Items</Button>
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 7), // Keep the first two base buttons
      ...devisButtons
    ]);

    

    // Ensure that resetting the sidebar does not affect the validation button
    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
  }, [setSidebarButtons, onChangeView, devisId]);

  const handleUpdateSuccess = () => {
    message.success('Devis updated successfully!');
    setIsUpdateModalVisible(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    message.success('Devis deleted successfully!');
    setIsDeleteModalVisible(false);
    onChangeView('list'); // Navigate back to the devisnisseur list or dashboard
  };

  const handleAddItemSuccess = () => {
    message.success('Item added successfully!');
    
    refetchData(); // Refresh to display new items
  };
  const handleEditItem = (item) => {
    setSelectedItemForUpdate(item);
  };

  const handleUpdateItemSuccess = () => {
    message.success('Item updated successfully!');
    setSelectedItemForUpdate(null);
    refetchData();
  };
  const handleOpenItemsModal = () => {
    setIsItemsModalVisible(true);
  };
  const handleCloseItemsModal = () => {
    setIsItemsModalVisible(false);
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not provided';

  if (loadingDevis || loadingItems) return <Spin tip="Loading..."/>;
  if (errorDevis || errorItems) return <Alert message="Error" description={errorDevis || errorItems} type="error" showIcon />;
  if (!devis) return <Alert message="No devis found" type="info" showIcon />;

  const titleStyle = {
    marginBottom: '4px', // Reduce space between title and text
    marginTop: '0px' // Remove top margin
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
    },
    {
      title: 'Free',
      dataIndex: 'GRATUIT',
      key: 'GRATUIT',
      render: (text) => text || 'N/A', // Render 'N/A' if GRATUIT is null/undefined
    },
    {
      title: 'PA HT',
      dataIndex: 'PA_HT',
      key: 'PA_HT',
    },
    {
      title: 'PV HT',
      dataIndex: 'PV_HT',
      key: 'PV_HT',
    },
    {
      title: 'PV TTC',
      dataIndex: 'PV_TTC',
      key: 'PV_TTC',
    },
    {
      title: 'Discount',
      dataIndex: 'REMISE',
      key: 'REMISE',
      render: (text) => `${text}%` || '0%', // Append '%' symbol or render '0%' if REMISE is null/undefined
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
    },
    {
      title: 'Total TTC',
      dataIndex: 'TotalTTC',
      key: 'TotalTTC',
    },
  ];
  

  return (
    <div>
      
<Card title={
    <>
      Devis Details - {devis.REF_DEV} 
      {devis.VALIDER ? <Tag color="green" style={{ marginLeft: '8px' }}>Validated</Tag> : <Tag color="red" style={{ marginLeft: '8px' }}>Not Validated</Tag>}
    </>
  }
  bordered={false}
  extra={!isValidated && <Button onClick={handleValidateClick}>Validate Devis</Button>}
> 
  <Row gutter={16}>
    
    <Col span={8}>
      <Title level={5} style={titleStyle}>Date</Title>
      <Text>{formatDate(devis.DATE_DEV)}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Account</Title>
      <Text>{devis.COMPTE || 'N/A'}</Text>
    </Col>
    
    <Col span={8}>
      <Title level={5} style={titleStyle}>Client</Title>
      <Text>{devis.CLIENT}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Amount (HT)</Title>
      <Text>{devis.MNT_HT}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Amount (TTC)</Title>
      <Text>{devis.MNT_TTC}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Global Discount</Title>
      <Text>{devis.REMISEG || 'None'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Salesperson Code</Title>
      <Text>{devis.CODE_COM}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Notes</Title>
      <Text>{devis.NOTES || 'None'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Remarks</Title>
      <Text>{devis.REMARQUE || 'None'}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Delivery Mode</Title>
      <Text>{devis.MODELIV}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Payment Mode</Title>
      <Text>{devis.MODE_PAIE}</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={titleStyle}>Validating Date</Title>
      <Text>{devis.DATEVALID || 'None'}</Text>
    </Col>
  </Row>
</Card>

      
<Card title="Items in Devis" style={{ marginTop: 20 }}>
  <Table columns={columns} dataSource={items} rowKey="CODE_ART" pagination={false} />
</Card>

<Modal
        title="Update Devis"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <DevisUpdateForm devisId={devisId} onFinishedUpdate={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Devis"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <DevisDeleteButton devisId={devisId} onSuccess={handleDeleteSuccess} />
      </Modal>
      <Modal
        title="Add Item to Devis"
        visible={isAddItemModalVisible}
        footer={null}
        onCancel={() => setIsAddItemModalVisible(false)}
        width= {1000}
      >
        <DevisAddItemForm refDevis={devis.REF_DEV} onSuccess={handleAddItemSuccess} />
      </Modal>
      <Modal
        title="Items in Devis"
        visible={isItemsModalVisible}
        onCancel={handleCloseItemsModal}
        footer={null}
        width="80%"
      >
        <ItemsInDevisList
          refDevis={devisId}
          onSelectItemForUpdate={handleEditItem}
          onCloseModal={handleCloseItemsModal}
          onRefetch={refetchData}
        />
      </Modal>

      {selectedItemForUpdate && (
        <Card title="Update Item in Devis">
          <UpdateItemInDevisForm
            refDevis={devisId}
            article={selectedItemForUpdate}
            onSuccess={handleUpdateItemSuccess}
          />
        </Card>
      )}
    </div>
  );


  


};




export default SingleDevis;
