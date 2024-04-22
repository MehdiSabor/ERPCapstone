import React, { useState } from 'react';
import { Button, List, Card, Typography, Divider } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateItemInDevisForm from './updateItemInDevisForm';
import DeleteItemFromDevisButton from './DeleteItemFromDevisButton';
import { useFetchItemsInDevis } from '../../hooks/devisHooks';

const { Text, Title } = Typography;

const ItemsInDevisList = ({ refDevis }) => {
    const { items, loading, error } = useFetchItemsInDevis(refDevis); 
    const [selectedItem, setSelectedItem] = useState(null);
    const [view, setView] = useState('list'); // 'list' or 'update'

    if (loading) return <Text>Loading items...</Text>;
    if (error) return <Text type="danger">Error fetching items: {error}</Text>;
    if (!items || items.length === 0) return <Text>No items found for this devis.</Text>;

    const handleEditItem = (item) => {
        setSelectedItem(item);
        setView('update');
    };

    return (
        <Card bordered={false} style={{ margin: '16px' }}>
            <Title level={4}>Items in Devis</Title>
            {view === 'list' && (
                <List
                    itemLayout="horizontal"
                    dataSource={items}
                    renderItem={item => (
                        <List.Item
                            actions={[
                                <Button icon={<EditOutlined />} onClick={() => handleEditItem(item)}>Edit</Button>,
                                <DeleteItemFromDevisButton refDevis={refDevis} codeArt={item.CODE_ART} onSuccess={() => setView('list')} />
                            ]}
                        >
                            <List.Item.Meta
                                title={`${item.ARTICLE} - Quantity: ${item.QTE}`}
                                description={`€${item.PV_TTC} Total: €${item.TotalTTC}`}
                            />
                        </List.Item>
                    )}
                />
            )}
            {view === 'update' && selectedItem && (
                <UpdateItemInDevisForm
                    refDevis={refDevis}
                    article={selectedItem}
                    onSuccess={() => setView('list')}
                />
            )}
        </Card>
    );
};

export default ItemsInDevisList;
