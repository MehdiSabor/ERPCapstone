import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllDevis } from '../../hooks/devisHooks'; // Ensure the path matches your project structure

const DevisList = ({ onSelectDevis }) => {
  const { devis, loading, error } = useFetchAllDevis();
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

  const filteredDevis = devis.filter(d => showValidated ? d.VALIDER : !d.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching devis: {error}</p>;

  return (
    <div>
      <h2>Devis List</h2>
      <Switch checked={showValidated} onChange={toggleValidated} checkedChildren="Validated" unCheckedChildren="Not Validated" />
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
    </div>
  );
};

export default DevisList
