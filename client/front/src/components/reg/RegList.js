import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space, Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllReglements } from '../../hooks/regHooks';

const ReglementList = ({ onSelectReglement }) => {
    const { reglements, loading, error } = useFetchAllReglements();
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [showFullySettled, setShowFullySettled] = useState(false);

    const toggleFullySettled = () => {
        setShowFullySettled(!showFullySettled);
    };

    const filteredReglements = reglements.filter(r => showFullySettled ? (r.remainingAmount === 0) : (r.remainingAmount > 0));

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
        title: 'Amount to Pay',
        dataIndex: 'MNT_REGLER',
        key: 'MNT_REGLER',
        ...getColumnSearchProps('MNT_REGLER'),
        render: value => value.toFixed(2) + '€',
      },
      {
        title: 'Payment Mode',
        dataIndex: 'MODE_REG',
        key: 'MODE_REG',
        ...getColumnSearchProps('MODE_REG'),
      },
      {
        title: 'Due Date',
        dataIndex: 'DATE_ECH',
        key: 'DATE_ECH',
        render: value => value ? new Date(value).toLocaleDateString() : 'N/A',
      },
      {
        title: 'Remaining',
        dataIndex: 'remainingAmount',
        key: 'remainingAmount',
        render: value => value ? value.toFixed(2) + '€' : '0.00€',
      },
    ];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h2>Reglement List</h2>
        <Switch checked={showFullySettled} onChange={toggleFullySettled} checkedChildren="Fully Settled" unCheckedChildren="Outstanding" />
        <Table
          columns={columns}
          dataSource={filteredReglements}
          rowKey="REF_REGV"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => onSelectReglement(record.REF_REGV),
            style: { cursor: 'pointer' }
          })}
        />
      </div>
    );
};

export default ReglementList;
