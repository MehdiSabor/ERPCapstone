import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary

const AvoirList = ({ onSelectAvoir }) => {
  const { avoir, loading, error } = useFetchAllAvoir();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [showValidated, setShowValidated] = useState(false);

  const toggleValidated = () => {
    setShowValidated(!showValidated);
  };

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

  const columns = [
    {
      title: 'Client',
      dataIndex: 'CLIENT',
      key: 'CLIENT',
      ...getColumnSearchProps('CLIENT'),
    },
    {
      title: 'Reference',
      dataIndex: 'REF_AVR',
      key: 'REF_AVR',
      ...getColumnSearchProps('REF_AVR'),
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

  const filteredAvoir = avoir.filter(a => showValidated ? a.VALIDER : !a.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching avoir: {error}</p>;

  return (
    <div>
      <h2>Avoir List</h2>
      <Switch checked={showValidated} onChange={toggleValidated} checkedChildren="Validated" unCheckedChildren="Not Validated" />
      <Table
        columns={columns}
        dataSource={filteredAvoir}
        rowKey="REF_AVR"
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => onSelectAvoir(record.REF_AVR),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
};

export default AvoirList;
