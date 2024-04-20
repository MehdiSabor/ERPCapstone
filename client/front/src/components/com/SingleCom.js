import React, { useEffect } from 'react';
import { Card, Button, List, Spin, Alert } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchComById } from '../../hooks/comHooks';

const SingleCom = ({ comId, onChangeView }) => {
    const { Com, loading, error } = useFetchComById(comId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
        const comButtons = [
            <Button key="update" type="primary" onClick={() => onChangeView('update', comId)}>Update Comercial</Button>,
            <Button key="delete" type="danger" onClick={() => onChangeView('delete', comId)}>Delete Comercial</Button>
        ];

        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2), // Keep the first two base buttons
            ...comButtons
        ]);

        return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    }, [setSidebarButtons, onChangeView, comId]);

    if (loading) return <Spin tip="Loading..."/>;
    if (error) return <Alert message="Error" description={error} type="error" showIcon />;
    if (!Com) return <Alert message="No Comercial Found" type="info" showIcon />;

    return (
        <Card title="Comercial Details" bordered={false} style={{ width: 300, margin: '20px auto', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
            <List
                dataSource={Object.entries(Com)}
                renderItem={item => (
                    <List.Item>
                        <strong>{item[0]}:</strong> {item[1]}
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default SingleCom;
