import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
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

  return (
      <div>
          <h2>Clients List</h2>
          <Table
              columns={columns}
              dataSource={clients}
              rowKey="code_clt"
              pagination={{ pageSize: 10 }}
              onRow={(record) => ({
                  onClick: () => onSelectClient(record),
              })}
          />
      </div>
  );
};

export default ClientList;
