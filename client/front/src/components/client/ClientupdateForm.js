import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Button, Card, Row, Col, Typography, message } from 'antd';
import { useUpdateClient, useFetchClientById } from '../../hooks/clientHooks';
const { Title } = Typography;

const ClientUpdateForm = ({ clientId, onFinishedUpdate }) => {
  const { client, loading: fetching } = useFetchClientById(clientId);
  const { handleUpdate, isUpdated } = useUpdateClient();
  const [form] = Form.useForm();

  useEffect(() => {
    if (client) {
      form.setFieldsValue(client);
    }
  }, [client, form]);

  const onFinish = async (values) => {
   try{ await handleUpdate(clientId, {
      ...values,
      echeance: parseInt(values.echeance, 10) || 0,
      REMISE_G: parseFloat(values.REMISE_G) || 0.0,
      plafond: parseFloat(values.plafond) || 0.0,
      code_com: parseInt(values.code_com, 10) || 0,
      SOLDE: parseInt(values.SOLDE, 10) || 0,
      cond_paie: values.cond_paie ? parseInt(values.cond_paie, 10) : null,
      code_cat: values.code_cat ? parseInt(values.code_cat, 10) : null,
    });
    
      onFinishedUpdate();
    } catch (error) {
      // If the update fails, handle the error here
      message.error('Update failed: ' + error.message);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Client</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="nom"
              label="Name"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="compte"
              label="Account"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="tel"
              label="Phone"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="adresse"
              label="Address"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="ville"
              label="City"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="note"
              label="Note"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="echeance"
              label="Due"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="mode_paie"
              label="Payment Mode"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="REMISE_G"
              label="General Discount"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="bloquer"
              label="Blocked"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
            <Form.Item
              name="plafond"
              label="Ceiling"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="code_com"
              label="Salesperson Code"
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name="SOLDE"
              label="Balance"
            >
              <Input type="number" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Update Client
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ClientUpdateForm;
