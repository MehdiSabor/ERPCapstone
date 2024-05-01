import React, { useState, useRef } from 'react';
import { Card,Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllFours } from '../../hooks/fourHooks'; // Make sure the path matches your project structure

const FourList = ({ onSelectFour }) => {
  const { Fours, loading, error } = useFetchAllFours();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

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
      render: text => text
  });

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
          title: 'Supplier Code',
          dataIndex: 'code_frs',
          key: 'code_frs',
          ...getColumnSearchProps('code_frs'),
      },
      {
          title: 'Social Name',
          dataIndex: 'sociale',
          key: 'sociale',
          ...getColumnSearchProps('sociale'),
      },
      {
          title: 'Country',
          dataIndex: 'pays',
          key: 'pays',
          ...getColumnSearchProps('pays'),
      },
      {
          title: 'Blocked',
          dataIndex: 'bloquer',
          key: 'bloquer'
      },
      {
          title: 'Account',
          dataIndex: 'compte',
          key: 'compte'
      }
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
      <div>
      <Card style={tableCardStyle}>
          <h2 style={titleStyle}>Fournisseurs List</h2>
          <Table
              columns={columns}
              dataSource={Fours}
              rowKey="code_frs"
              pagination={{ pageSize: 10 }}
              onRow={(record) => ({
                  onClick: () => onSelectFour(record.code_frs),
                  style: { cursor: 'pointer' }
              })}
          />
          </Card>
      </div>
  );
};

export default FourList;
