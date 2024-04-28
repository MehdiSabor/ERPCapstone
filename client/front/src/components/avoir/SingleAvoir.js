import React, { useState,useEffect } from 'react';
import { Modal, Card,message, Button, List, Typography, Row, Col,Spin,Alert,Tag, Table } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchAvoirById, useFetchItemsInAvoir, useValidateAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary
import AvoirUpdateForm from './AvoirupdateForm';  // You need to create this
import AvoirDeleteButton from './AvoirDeleteButton';  // You need to create this
import AvoirAddItemForm from './AddItemToAvoirForm'; // You need to create this
import ItemsInAvoirList from './ItemInAvoirList';
import UpdateItemInAvoirForm from './updateItemInAvoirForm';
import SingleClient from '../client/SingleClient';

const { Title, Text } = Typography;

const SingleAvoir = ({ avoirId, onChangeView }) => {
  const { avoir, loading: loadingAvoir, error: errorAvoir,refetch } = useFetchAvoirById(avoirId);
  const { items, loading: loadingItems, error: errorItems, refetch: fetchItems } = useFetchItemsInAvoir(avoirId);
  const { validate, error, isValidated } = useValidateAvoir(avoirId);
  const { setSidebarButtons } = useSidebar();
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [isItemsModalVisible, setIsItemsModalVisible] = useState(false);
  const [selectedItemForUpdate, setSelectedItemForUpdate] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);


  const refetchData = () => {
    refetch();
     fetchItems(); // This function should be defined to fetch items related to the avoir
  };
  // Function to handle the click on the Validate button
  const handleValidateClick = async () => {
    try {
      await validate();
      message.success('Avoir has been successfully validated.');
      refetchData();// Optionally, you can trigger other actions here, such as navigating away or refreshing the data
    } catch (error) {
      message.error(`Failed to validate avoir: ${error}`);
    }
  };

  useEffect(() => {
    const avoirButtons = [
      <Button key="update" onClick={() => setIsUpdateModalVisible(true)}>Update Avoir</Button>,
      <Button key="delete" onClick={() => setIsDeleteModalVisible(true)}>Delete Avoir</Button>,
      <Button key="addItem" onClick={() => setIsAddItemModalVisible(true)}>Add Item</Button>,
     <Button key="viewItems" onClick={handleOpenItemsModal}>View Items</Button>,
    <Button key="viewClient" type="primary" onClick={() => setShowClientModal(true)}>View Client</Button>
    
    ];

    setSidebarButtons(prevButtons => [
      ...prevButtons.slice(0, 2), // Keep the first two base buttons
      ...avoirButtons
    ]);

    

    // Ensure that resetting the sidebar does not affect the validation button
    return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
  }, [setSidebarButtons, onChangeView, avoirId]);

  const handleUpdateSuccess = () => {
    message.success('Avoir updated successfully!');
    setIsUpdateModalVisible(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    message.success('Avoir deleted successfully!');
    setIsDeleteModalVisible(false);
    onChangeView('list'); // Navigate back to the avoirnisseur list or dashboard
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

  if (loadingAvoir || loadingItems) return <Spin tip="Loading..."/>;
  if (errorAvoir || errorItems) return <Alert message="Error" description={errorAvoir || errorItems} type="error" showIcon />;
  if (!avoir) return <Alert message="No avoir found" type="info" showIcon />;

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
    
<Modal
        title="Update Avoir"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <AvoirUpdateForm avoirId={avoirId} onFinishedUpdate={handleUpdateSuccess} />
      </Modal>
      <Modal
        title="Delete Avoir"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <AvoirDeleteButton avoirId={avoirId} onSuccess={handleDeleteSuccess} />
      </Modal>
      <Modal
        title="Add Item to Avoir"
        visible={isAddItemModalVisible}
        footer={null}
        onCancel={() => setIsAddItemModalVisible(false)}
        width= {1000}
      >
        <AvoirAddItemForm refAvoir={avoir.REF_AVR} onSuccess={handleAddItemSuccess} />
      </Modal>
      <Modal
        title="Items in Avoir"
        visible={isItemsModalVisible}
        onCancel={handleCloseItemsModal}
        footer={null}
        width="80%"
      >
        <ItemsInAvoirList
          refAvoir={avoirId}
          onSelectItemForUpdate={handleEditItem}
          onCloseModal={handleCloseItemsModal}
          onRefetch={refetchData}
        />
      </Modal>

      {selectedItemForUpdate && (
        <Card title="Update Item in Avoir">
          <UpdateItemInAvoirForm
            refAvoir={avoirId}
            article={selectedItemForUpdate}
            onSuccess={handleUpdateItemSuccess}
          />
        </Card>
      )}
    </div>
  );


  


};




export default SingleAvoir;
