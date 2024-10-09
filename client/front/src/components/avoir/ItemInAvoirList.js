import React, { useState } from 'react';
import { Button, List, Card, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import UpdateItemInAvoirForm from './updateItemInAvoirForm';
import DeleteItemFromAvoirButton from './DeleteItemFromAvoirButton';
import { useFetchItemsInAvoir } from '../../hooks/avoirHooks';

const { Text, Title } = Typography;

const ItemsInAvoirList = ({ refAvoir, onRefetch }) => {
  const { items, loading, error } = useFetchItemsInAvoir(refAvoir); 
  const [selectedItem, setSelectedItem] = useState(null);
  const [view, setView] = useState('list'); // 'list' or 'update'

  if (loading) return <Text>Loading items...</Text>;
  if (error) return <Text type="danger">Error fetching items: {error}</Text>;
  if (!items || items.length === 0) return <Text>No items found for this avoir.</Text>;

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setView('update');
  };

  return (
    <Card bordered={false} style={{ margin: '16px' }}>
      <Title level={4}>Items in Avoir</Title>
      {view === 'list' && (
        <List
          itemLayout="horizontal"
          dataSource={items}
          renderItem={item => (
            <List.Item
              actions={[
                <Button icon={<EditOutlined />} onClick={() => handleEditItem(item)}>Edit</Button>,
                <DeleteItemFromAvoirButton refAvoir={refAvoir} codeArt={item.CODE_ART} onSuccess={() => { setView('list'); onRefetch(); }} />
              ]}
            >
              <List.Item.Meta
                title={`${item.ARTICLE} - Quantity: ${item.QTE}`}
                description={`MAD${item.PV_TTC} Total: MAD${item.TotalTTC}`}
              />
            </List.Item>
          )}
        />
      )}
      {view === 'update' && selectedItem && (
        <UpdateItemInAvoirForm
          refAvoir={refAvoir}
          article={selectedItem}
          onSuccess={() => setView('list')}
          onRefetch={onRefetch}
        />
      )}
    </Card>
  );
};

export default ItemsInAvoirList;
