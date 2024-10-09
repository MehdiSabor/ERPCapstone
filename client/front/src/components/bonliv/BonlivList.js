import React, { useState } from 'react';
import { Table, Input, Button, Space, Tabs, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllBonliv } from '../../hooks/bonlivHooks'; // Ensure the path matches your project structure

const { TabPane } = Tabs;

const BonlivList = ({ onSelectBonliv }) => {
  const { bonliv, loading, error } = useFetchAllBonliv();
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
      title: 'Reference',
      dataIndex: 'REF_BL',
      key: 'REF_BL',
      ...getColumnSearchProps('REF_BL'),
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

  const filteredBonliv = bonliv.filter(b => activeTab === 'validated' ? b.VALIDER : !b.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching bonliv: {error}</p>;

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
        <h2 style={titleStyle}>Bonliv List</h2>
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
          dataSource={filteredBonliv}
          rowKey="REF_BL"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: record.VALIDER ? null : () => onSelectBonliv(record.REF_BL),
            style: { cursor: record.VALIDER ? 'not-allowed' : 'pointer' }
          })}
        />
      </Card>
    </div>
  );
};

export default BonlivList;
