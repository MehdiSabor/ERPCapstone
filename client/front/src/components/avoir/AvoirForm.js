import React, { useState } from 'react';
import { Form, Input, Button, Card, Row, Col, Modal } from 'antd';
import { useCreateAvoir } from '../../hooks/avoirHooks';
import ClientList from '../client/ClientList';
import ComList from '../com/ComList';

const AvoirForm = () => {
    const { handleCreate } = useCreateAvoir();
    const [form] = Form.useForm();
    const [showClientList, setShowClientList] = useState(false);
    const [showComList, setShowComList] = useState(false);
    const [selectedCom, setSelectedCom] = useState('');
    const [selectedClient, setSelectedClient] = useState('');

    const handleFinish = async (values) => {
        // Combine all values including hidden ones from client selection
        const fullValues = {
          ...values,
          CODE_CLT: form.getFieldValue('CODE_CLT'), // Ensure client code is included
          COMPTE: form.getFieldValue('COMPTE') // Ensure client account number is included
        };
        console.log('Final Submit Values:', fullValues); // For debugging
        await handleCreate(fullValues);
        form.resetFields(); // Reset form after submission
      };

    const handleClientSelect = (client) => {
        form.setFieldsValue({
            CODE_CLT: client.code_clt,
            CLIENT: client.nom,
            COMPTE: client.compte // Assuming you need the account number
        });
        setSelectedClient(`Selected Client: ${client.nom} (ID: ${client.code_clt})`);
        setShowClientList(false);
    };

    const handleComSelect = (com) => {
        form.setFieldsValue({ CODE_COM: com });
        setSelectedCom(`Selected Commercial:  (ID: ${com})`);
        setShowComList(false);
    };

    return (
        <Card title="Create Avoir" bordered={false} style={{ width: '100%' }}>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Commercial" name="CODE_COM">
                            <Button onClick={() => setShowComList(true)}>Select Commercial</Button>
                            {selectedCom && <p>{selectedCom}</p>}
                            <Modal
                                title="Select Commercial"
                                visible={showComList}
                                onCancel={() => setShowComList(false)}
                                footer={null}
                                width={800}
                            >
                                <ComList onSelectCom={handleComSelect} />
                            </Modal>
                        </Form.Item>
                        <Form.Item label="Client" name="CLIENT">
                            <Button onClick={() => setShowClientList(true)}>Select Client</Button>
                            {selectedClient && <p>{selectedClient}</p>}
                            <Modal
                                title="Select Client"
                                visible={showClientList}
                                onCancel={() => setShowClientList(false)}
                                footer={null}
                                width={800}
                            >
                                <ClientList onSelectClient={handleClientSelect} />
                            </Modal>
                        </Form.Item>
                        <Form.Item label="Remark" name="REMARQUE">
                            <Input.TextArea rows={4} placeholder="Add any remarks" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        {/* Optionally add more fields if required */}
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit Avoir
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default AvoirForm;
