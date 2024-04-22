import React, { useState } from 'react';
import { List, InputNumber, Button, Typography, Card, Space, message } from 'antd';
import { RetweetOutlined } from '@ant-design/icons';
import DeleteItemFromBonlivButton from './DeleteItemFromBonlivButton';
import { useFetchItemsInBonliv, useUpdateItemInBonliv } from '../../hooks/bonlivHooks';

const { Title, Text } = Typography;

const ItemsInBonlivList = ({ refBonliv }) => {
    const [fetchTrigger, setFetchTrigger] = useState(false);
    const { items, loading, error } = useFetchItemsInBonliv(refBonliv, fetchTrigger);
    const { updateItem } = useUpdateItemInBonliv();
    const [editedItems, setEditedItems] = useState({});

    if (loading) return <p>Loading items...</p>;
    if (error) return <p>Error fetching items: {error}</p>;
    if (!items || items.length === 0) return <p>No items found for this bonliv.</p>;

    const handleQteLivChange = (codeArt, newQteLiv) => {
        setEditedItems(prevItems => ({
            ...prevItems,
            [codeArt]: { ...prevItems[codeArt], qteliv: newQteLiv }
        }));
    };

    const handleApplyChanges = async (codeArt) => {
        const itemToBeUpdated = editedItems[codeArt];
        
        if (itemToBeUpdated && itemToBeUpdated.qteliv !== undefined) {
            try {
                await updateItem(refBonliv, codeArt, { qteliv: parseFloat(itemToBeUpdated.qteliv) || 0 });
                message.success('Changes applied successfully!');
                setEditedItems(prevItems => {
                    const updatedItems = { ...prevItems };
                    delete updatedItems[codeArt];
                    return updatedItems;
                });
                setFetchTrigger(t => !t); // Toggle fetchTrigger to re-fetch items
            } catch (error) {
                message.error('Failed to apply changes.');
            }
        }
    };

    const copyAllQteToQteLiv = () => {
        const newEditedItems = items.reduce((acc, item) => ({
            ...acc,
            [item.CODE_ART]: { ...item, qteliv: item.QTE }
        }), {});
        setEditedItems(newEditedItems);
        message.info('Copied quantity to delivered for all items. Remember to apply changes.');
    };

    return (
        <Card bordered={false}>
            <Title level={4}>Items in Bonliv</Title>
            <Button icon={<RetweetOutlined />} onClick={copyAllQteToQteLiv} style={{ marginBottom: 16 }}>
                Copy QTE to QTÉLIV for all
            </Button>
            <List
                dataSource={items}
                renderItem={item => (
                    <List.Item key={item.CODE_ART}>
                        <List.Item.Meta
                            title={`${item.CODE_ART} - ${item.ARTICLE}`}
                            description={`Quantity: ${item.QTE} - Delivered: `}
                        />
                        <Space>
                            <InputNumber
                                min={0}
                                value={editedItems[item.CODE_ART]?.qteliv ?? item.qteliv ?? ''}
                                onChange={value => handleQteLivChange(item.CODE_ART, value)}
                            />
                            <Button onClick={() => handleApplyChanges(item.CODE_ART)} type="primary">
                                Apply Changes
                            </Button>
                            <DeleteItemFromBonlivButton 
                                refBonliv={refBonliv} 
                                codeArt={item.CODE_ART} 
                                onSuccess={() => setFetchTrigger(t => !t)} 
                            />
                        </Space>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ItemsInBonlivList;
