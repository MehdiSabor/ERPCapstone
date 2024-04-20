import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllBonliv } from '../../hooks/bonlivHooks'; // Ensure the path matches your project structure

const BonlivList = ({ onSelectBonliv }) => {
  const { bonliv, loading, error } = useFetchAllBonliv();
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
      record[dataIndex] ? record[dataIndex].toString().lowercase().includes(value.lowercase()) : '',
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

  const filteredBonliv = bonliv.filter(b => showValidated ? b.VALIDER : !b.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching bonliv: {error}</p>;

  return (
    <div>
      <h2>Bonliv List</h2>
      <Switch checked={showValidated} onChange={toggleValidated} checkedChildren="Validated" unCheckedChildren="Not Validated" />
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
    </div>
  );
};

export default BonlivList;
