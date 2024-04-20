import React, { useState, useRef } from 'react';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useFetchAllComs } from '../../hooks/comHooks';
const ComList = ({ onSelectCom }) => {
    const { Coms, loading, error } = useFetchAllComs(); // Assuming 'Coms' is the correct state variable name
    const searchInput = useRef(null);
    
    // Search states
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    
    // Search and filtering function for 'nom'
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
        onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
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
            title: 'Code',
            dataIndex: 'code_com',
            key: 'code_com',
        },
        {
            title: 'Name',
            dataIndex: 'nom',
            key: 'nom',
            ...getColumnSearchProps('nom'),
        },
        {
            title: 'Telephone',
            dataIndex: 'tel',
            key: 'tel',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    return (
        <div>
            <h2>Commercials List</h2>
            <Table
                columns={columns}
                dataSource={Coms}
                rowKey="code_com"
                pagination={{ pageSize: 10 }}
                onRow={(record) => ({
                    onClick: () => onSelectCom(record.code_com),
                })}
            />
        </div>
    );
};

export default ComList;
