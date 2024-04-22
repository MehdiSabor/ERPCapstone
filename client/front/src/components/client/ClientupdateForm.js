import React, { useState, useEffect } from 'react';
import { Form, Input, Checkbox, Button, Card, Row, Col, Typography } from 'antd';
import { useUpdateClient, useFetchClientById } from '../../hooks/clientHooks';

const { Title } = Typography;

const ClientUpdateForm = ({ clientId }) => {
  const { client, loading: fetching } = useFetchClientById(clientId);
  const { handleUpdate, isUpdated } = useUpdateClient();
  const [form] = Form.useForm();

  useEffect(() => {
    if (client) {
      form.setFieldsValue(client);
    }
  }, [client, form]);

  const onFinish = async (values) => {
    await handleUpdate(clientId, {
      ...values,
      echeance: parseInt(values.echeance, 10) || 0,
      REMISE_G: parseFloat(values.REMISE_G) || 0.0,
      plafond: parseFloat(values.plafond) || 0.0,
      code_com: parseInt(values.code_com, 10) || 0,
      SOLDE: parseInt(values.SOLDE, 10) || 0,
      code_region: values.code_region ? parseInt(values.code_region, 10) : null,
      cond_paie: values.cond_paie ? parseInt(values.cond_paie, 10) : null,
      code_cat: values.code_cat ? parseInt(values.code_cat, 10) : null,
    });
    if (isUpdated) {
      // Handle successful update (e.g., show a message or redirect)
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Client</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {Object.keys(client || {}).map(key => (
          <Form.Item
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
            valuePropName={key === 'bloquer' ? 'checked' : 'value'}
          >
            {key === 'bloquer' ? (
              <Checkbox>{key}</Checkbox>
            ) : (
              <Input type={key.includes("echeance") || key.includes("plafond") || key.includes("REMISE_G") || key.includes("SOLDE") || key.includes("code_") ? "number" : "text"} />
            )}
          </Form.Item>
        ))}
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
