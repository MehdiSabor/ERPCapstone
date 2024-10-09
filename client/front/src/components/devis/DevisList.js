import React, { useState } from 'react';
import { Card, Table, Input, Button, Space, Tabs } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllDevis } from '../../hooks/devisHooks'; // Ensure the path matches your project structure

const { TabPane } = Tabs;

const DevisList = ({ onSelectDevis }) => {
  const { devis, loading, error } = useFetchAllDevis();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [activeTab, setActiveTab] = useState('notValidated');

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    render: text => text
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const columns = [
    {
      title: 'Client Code',
      dataIndex: 'CODE_CLT',
      key: 'CODE_CLT',
      ...getColumnSearchProps('CODE_CLT'),
    },
    {
      title: 'Client',
      dataIndex: 'CLIENT',
      key: 'CLIENT',
      ...getColumnSearchProps('CLIENT'),
    },
    {
      title: 'Commercial Code',
      dataIndex: 'CODE_COM',
      key: 'CODE_COM',
      ...getColumnSearchProps('CODE_COM'),
    },
    {
      title: 'Account',
      dataIndex: 'COMPTE',
      key: 'COMPTE',
      ...getColumnSearchProps('COMPTE'),
    },
    {
      title: 'Reference',
      dataIndex: 'REF_DEV',
      key: 'REF_DEV',
      ...getColumnSearchProps('REF_DEV'),
    },
    {
      title: 'Total (MAD)',
      dataIndex: 'MNT_TTC',
      key: 'MNT_TTC',
      render: value => value.toFixed(2),
    },
    {
      title: 'Validated',
      dataIndex: 'VALIDER',
      key: 'VALIDER',
      render: (_, record) => record.VALIDER ? "Yes" : "No",
    }
  ];

  const filteredDevis = devis.filter(d => activeTab === 'validated' ? d.VALIDER : !d.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching devis: {error}</p>;

  const titleStyle = {
    fontSize: "24px", // Increased font size for titles
    fontWeight: "bold",
    color: "#333", // Darker font color for better visibility
    marginBottom: "16px",
    borderBottom: "2px solid #ccc", // Separator line
    paddingBottom: "10px", // Spacing between title and separator line
    marginTop: "-10px",
  };

  const tableCardStyle = {
    marginTop: "20px",
    backgroundColor: "#ffffff", // Lighter than the main background for emphasis
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds subtle shadow for depth
  };

  return (
    <div>
      <Card style={tableCardStyle}>
        <h2 style={titleStyle}>Devis List</h2>
        <Tabs defaultActiveKey="notValidated" onChange={setActiveTab}>
          <TabPane tab="Not Validated" key="notValidated">
            {/* Content of Not Validated tab */}
          </TabPane>
          <TabPane tab="Validated" key="validated">
            {/* Content of Validated tab */}
          </TabPane>
        </Tabs>
        <Table
          columns={columns}
          dataSource={filteredDevis}
          rowKey="REF_DEV"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: record.VALIDER ? null : () => onSelectDevis(record.REF_DEV),
            style: { cursor: record.VALIDER ? 'not-allowed' : 'pointer' }
          })}
        />
      </Card>
    </div>
  );
};

export default DevisList;
