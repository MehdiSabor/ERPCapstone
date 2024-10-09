import React, { useState } from 'react';
import { Select, Form, Input, Button, Card, Row, Col, Modal } from 'antd';
import { useCreateReglement } from '../../hooks/regHooks';
import { useFetchAllClients } from '../../hooks/clientHooks';
import ClientList from '../client/ClientList';
import paymentModes from '../../lists/PaymentMode.json';  // Make sure the path is correct
import cities from '../../lists/City.json';  // Make sure the path is correct
import banks from '../../lists/Bank.json';  // Make sure the path is correct


const { Option } = Select;


const CreateReglementForm = () => {
  const [form] = Form.useForm();
  const [showClientList, setShowClientList] = useState(false);
  const { handleCreate, isCreating, error } = useCreateReglement();
  const [selectedClient, setSelectedClient] = useState('');
  const { clients, loading: loadingClients, error: errorClients } = useFetchAllClients();

  const handleFinish = async (values) => {
    // Combine all values including hidden ones from client selection
    const fullValues = {
      ...values,
      CODE_CLT: form.getFieldValue('CODE_CLT'), // Ensure client code is included
      COMPTE: form.getFieldValue('COMPTE'),
      MNT_REGLER: parseFloat(values.MNT_REGLER), // Ensure client account number is included
    };
    console.log('Final Submit Values:', fullValues); // For debugging
    await handleCreate(fullValues);
    form.resetFields(); // Reset form after submission
  };


  const handleClientSelect = (client) => {
    // Set values in form to be submitted
    form.setFieldsValue({
      CODE_CLT: client.code_clt,
      CLIENT: client.nom,
      COMPTE: client.compte
    });
    setSelectedClient(`Selected Client: ${client.nom} (ID: ${client.code_clt})`);
    setShowClientList(false);
  };


  if (loadingClients) return <p>Loading clients...</p>;
  if (errorClients) return <p>Error loading clients: {errorClients}</p>;

  return (
    <Card title="Create Reglement" bordered={false}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Row gutter={16}>
          <Col span={12}>
          <Form.Item label="Client" name="CLIENT">
              <div>
                <Button onClick={() => setShowClientList(true)}>Select Client</Button>
                {selectedClient && <p>{selectedClient}</p>}
              </div>
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
            <Form.Item label="Amount" name="MNT_REGLER" rules={[{ required: true }]}>
              <Input type="number" placeholder="Enter amount" />
            </Form.Item>
            <Form.Item label="Payment Mode" name="MODE_REG" rules={[{ required: true }]}>
              <Select placeholder="Select payment mode">
                {paymentModes.map(mode => <Option key={mode} value={mode}>{mode}</Option>)}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Bank" name="BANQUE">
              <Select placeholder="Select bank">
                {banks.map(bank => <Option key={bank} value={bank}>{bank}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="City" name="VILLE">
              <Select placeholder="Select city">
                {cities.map(city => <Option key={city} value={city}>{city}</Option>)}
              </Select>
            </Form.Item>
            <Form.Item label="Remark" name="REMARQUE">
              <Input placeholder="Enter any remarks" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isCreating}>
            Create Reglement
          </Button>
        </Form.Item>
        {error && <p>Error: {error}</p>}
      </Form>
    </Card>
  );
};

export default CreateReglementForm;
