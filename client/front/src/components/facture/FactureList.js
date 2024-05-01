import React, { useState } from 'react';
import { Table, Input, Button, Space, Tabs, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllFactures } from '../../hooks/factureHooks'; // Make sure the path matches your project structure

const { TabPane } = Tabs;

const FactureList = ({ onSelectFacture }) => {
  const { factures, loading, error } = useFetchAllFactures();
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
      title: 'Client',
      dataIndex: 'CLIENT',
      key: 'CLIENT',
      ...getColumnSearchProps('CLIENT'),
    },
    {
      title: 'Reference',
      dataIndex: 'REF_FAC',
      key: 'REF_FAC',
      ...getColumnSearchProps('REF_FAC'),
    },
    {
      title: 'Total (€)',
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

  const filteredFactures = factures.filter(f => activeTab === 'validated' ? f.VALIDER : !f.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching factures: {error}</p>;

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
        <h2 style={titleStyle}>Facture List</h2>
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
          dataSource={filteredFactures}
          rowKey="REF_FAC"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => onSelectFacture(record.REF_FAC),
            style: { cursor: 'pointer' }
          })}
        />
      </Card>
    </div>
  );
};

export default FactureList;
