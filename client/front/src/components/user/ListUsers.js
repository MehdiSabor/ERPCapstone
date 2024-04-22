import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useUsers } from '../../hooks/userHooks'; // Make sure this hook is correctly fetching user data

const ListUsers = ({ onSelectUser }) => {
    const { users, loading, error } = useUsers();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSelect = (user) => {
        onSelectUser(user.UserID);  // Pass the selected user ID up to the parent component
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
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.current && searchInput.current.select());
            }
        },
        render: text => text,
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
            title: 'Name',
            dataIndex: 'Name',
            key: 'Name',
            ...getColumnSearchProps('Name'),
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'Email',
            ...getColumnSearchProps('Email'),
        },
        {
            title: 'UserID',
            dataIndex: 'UserID',
            key: 'UserID',
        },
    ];

    return (
        <div>
            <h2>Users List</h2>
            <Table
                columns={columns}
                dataSource={users}
                rowKey="UserID"
                pagination={{ pageSize: 10 }}
                onRow={(record) => ({
                    onClick: () => handleSelect(record),
                    style: { cursor: 'pointer' }
                })}
            />
        </div>
    );
};

export default ListUsers;
    