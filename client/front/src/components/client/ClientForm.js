import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, Row, Col, Modal, Card } from 'antd';
import { useCreateClient } from '../../hooks/clientHooks';
import ComList from '../com/ComList';

const ClientForm = () => {
  const [showComList, setShowComList] = useState(false);
  const { handleCreate } = useCreateClient();
  const [form] = Form.useForm();

  const handleSelectCom = (code_com) => {
    form.setFieldsValue({ code_com });
   
    setShowComList(false); // Close the ComList after selection
  };

  const handleSubmit = async (values) => {
    console.log(values);
    await handleCreate({
      ...values,
      echeance: parseInt(values.echeance, 10) || 0,
      REMISE_G: parseFloat(values.REMISE_G) || 0.0,
      plafond: parseFloat(values.plafond) || 0.0,
      code_com: parseInt(values.code_com, 10) || 0,
      SOLDE: parseInt(values.SOLDE, 10) || 0,
      cond_paie: values.cond_paie ? parseInt(values.cond_paie, 10) : null,
      code_cat: values.code_cat ? parseInt(values.code_cat, 10) : null,
    });
    form.resetFields();
  };

  const showModal = () => setShowComList(true);
  const handleCloseModal = () => setShowComList(false);

  return (
    <Card title="Create Client" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            {/* Left column for form items */}
            <Form.Item label="Nom" name="nom" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
   <Input />
            </Form.Item>
            
            <Form.Item label="Tel" name="tel" style={{ marginBottom: '8px' }}>
              <Input />
            </Form.Item>
            <Form.Item label="Adresse" name="adresse" style={{ marginBottom: '8px' }}>
              <Input />
            </Form.Item>
            <Form.Item label="Ville" name="ville" style={{ marginBottom: '8px' }}>
              <Input />
            </Form.Item>
           
            <Form.Item label="Note" name="note" style={{ marginBottom: '8px' }}>
              <Input />
            </Form.Item>
            <Form.Item style={{ marginBottom: '8px' }}>
            <Form.Item name="code_com" hidden={true}>
  <Input type="hidden" />
</Form.Item>

              <Button type="primary" onClick={showModal} >
                Select Commercial
              </Button>
              <p>Selected Commercial: {form.getFieldValue('code_com')}</p>
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Right column for form items */}
            <Form.Item label="Echeance" name="echeance" style={{ marginBottom: '8px' }}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Mode de Paiement" name="mode_paie" style={{ marginBottom: '8px' }}>
              <Input />
            </Form.Item>
            <Form.Item label="Remise Générale" name="REMISE_G" style={{ marginBottom: '8px' }}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Plafond" name="plafond" style={{ marginBottom: '8px' }}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Solde" name="SOLDE" style={{ marginBottom: '8px' }}>
              <Input type="number" />
            </Form.Item>
            
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Modal title="Select Commercial" visible={showComList} onOk={handleCloseModal} onCancel={handleCloseModal} footer={null}>
        <ComList onSelectCom={handleSelectCom} />
      </Modal>
    </Card>
  );
};

export default ClientForm;
