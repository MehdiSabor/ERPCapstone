import React, { useState } from 'react';
import { Table, Input, Button, Space, Tabs, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllReglements } from '../../hooks/regHooks'; // Ensure this matches your project structure

const { TabPane } = Tabs;

const ReglementList = ({ onSelectReglement }) => {
    const { reglements, loading, error } = useFetchAllReglements();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [activeTab, setActiveTab] = useState('outstanding');

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
            title: 'Amount to Pay',
            dataIndex: 'MNT_REGLER',
            key: 'MNT_REGLER',
            ...getColumnSearchProps('MNT_REGLER'),
            render: value => value.toFixed(2) + 'MAD',
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
            render: value => value ? value.toFixed(2) + 'MAD' : '0.00MAD',
        },
    ];

    const filteredReglements = reglements.filter(r => activeTab === 'fullySettled' ? (r.remainingAmount === 0) : (r.remainingAmount > 0));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const titleStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "16px",
        borderBottom: "2px solid #ccc",
        paddingBottom: "10px",
        marginTop: "-10px",
    };

    const tableCardStyle = {
        marginTop: "20px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    };

    return (
        <div>
            <Card style={tableCardStyle}>
                <h2 style={titleStyle}>Reglement List</h2>
                <Tabs defaultActiveKey="outstanding" onChange={setActiveTab}>
                    <TabPane tab="Outstanding" key="outstanding">
                        {/* Content of Outstanding tab */}
                    </TabPane>
                    <TabPane tab="Fully Settled" key="fullySettled">
                        {/* Content of Fully Settled tab */}
                    </TabPane>
                </Tabs>
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
            </Card>
        </div>
    );
};

export default ReglementList;
