import React, { useEffect } from 'react';
import { Card, Button, Table, Typography, Tag, Row, Col, Spin, Alert } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchBonlivById, useFetchItemsInBonliv, useValidateBonliv } from '../../hooks/bonlivHooks';

const { Title, Text } = Typography;

const SingleBonliv = ({ bonlivId, onChangeView }) => {
  const { bonliv, loading: loadingBonliv, error: errorBonliv } = useFetchBonlivById(bonlivId);
  const { items, loading: loadingItems, error: errorItems } = useFetchItemsInBonliv(bonlivId);
  const { validate, error, isValidated } = useValidateBonliv(bonlivId);
  const { setSidebarButtons } = useSidebar();

  const handleValidateClick = async () => {
    try {
      await validate();
      alert('Bonliv has been successfully validated.');
    } catch (error) {
      alert(`Failed to validate bonliv: ${error}`);
    }
  };

  useEffect(() => {
    const bonlivButtons = [
      <Button key="update" onClick={() => onChangeView('update', bonlivId)}>Update Bonliv</Button>,
      <Button key="delete" onClick={() => onChangeView('delete', bonlivId)}>Delete Bonliv</Button>,
      <Button key="viewItems" onClick={() => onChangeView('viewItems', bonlivId)}>View Items</Button>
    ];

    setSidebarButtons(bonlivButtons);

    return () => setSidebarButtons([]);
  }, [setSidebarButtons, onChangeView, bonlivId]);

 
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
  


  const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not provided';

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
      <Text>{bonliv.TotalHTliv ? bonliv.TotalHTliv.toFixed(2) : 'N/A'}€</Text>
    </Col>
    <Col span={8}>
      <Title level={5} style={{ marginBottom: '4px', marginTop: '0px' }}>Total TTC Liv</Title>
      <Text>{bonliv.TotalTTCliv ? bonliv.TotalTTCliv.toFixed(2) : 'N/A'}€</Text>
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
        <Table columns={columns} dataSource={items} rowKey="CODE_ART" pagination={false} />
      </Card>
    </div>
  );
};

export default SingleBonliv;
