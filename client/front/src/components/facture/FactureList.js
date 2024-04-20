import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllFactures } from '../../hooks/factureHooks'; // Make sure the path matches your project structure

const FactureList = ({ onSelectFacture }) => {
  const { factures, loading, error } = useFetchAllFactures();
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

  const filteredFactures = factures.filter(f => showValidated ? f.VALIDER : !f.VALIDER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching factures: {error}</p>;

  return (
    <div>
      <h2>Facture List</h2>
      <Switch checked={showValidated} onChange={toggleValidated} checkedChildren="Validated" unCheckedChildren="Not Validated" />
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
    </div>
  );
};

export default FactureList;
