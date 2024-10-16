import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllClients } from '../../hooks/clientHooks';

const ClientList = ({ onSelectClient }) => {
  const { clients, loading, error } = useFetchAllClients();
  const searchInput = useRef(null);

  // Search states
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  // Search and filtering function
  const getColumnSearchProps = dataIndex => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
              <Input
                  ref={searchInput}
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
      onFilterDropdownVisibleChange: visible => {
          if (visible) {
              setTimeout(() => searchInput.current && searchInput.current.select());
          }
      },
      render: text => searchedColumn === dataIndex ? (
          <span style={{ backgroundColor: searchedColumn === dataIndex && searchText ? '#ffc069' : '' }}>
              {text}
          </span>
      ) : text
  });

  // Handling search and reset
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
      {
          title: 'Client Code',
          dataIndex: 'code_clt',
          key: 'code_clt',
          ...getColumnSearchProps('code_clt'),
      },
      {
          title: 'Client Name',
          dataIndex: 'nom',
          key: 'nom',
          ...getColumnSearchProps('nom'),
      },
      {
          title: 'Account',
          dataIndex: 'compte',
          key: 'compte',
          ...getColumnSearchProps('compte'),
      },
      {
          title: 'Commercial Code',
          dataIndex: 'code_com',
          key: 'code_com',
          ...getColumnSearchProps('code_com'),
      },
      {
          title: 'City',
          dataIndex: 'ville',
          key: 'ville',
          ...getColumnSearchProps('ville'),
      },
  ];


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
    <div >
          <Card style={tableCardStyle}>
          <h2 style={titleStyle}>Clients List</h2>
          <Table
              columns={columns}
              dataSource={clients}
              rowKey="code_clt"
              pagination={{ pageSize: 10 }}
              onRow={(record) => ({
                  onClick: () => onSelectClient(record),
              })}
          />
          </Card>
      </div>
  );
};

export default ClientList;
