import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { useUpdateDevis, useFetchDevisById } from '../../hooks/devisHooks';

const { Title } = Typography;

const DevisUpdateForm = ({ devisId, onFinishedUpdate }) => {
  const { devis, loading: fetching } = useFetchDevisById(devisId);
  const { handleUpdate, isUpdated } = useUpdateDevis();
  const [form] = Form.useForm();

  useEffect(() => {
    // Here, only set values for the fields you want to allow editing
    form.setFieldsValue({
      REMARQUE: devis?.REMARQUE,
      MODELIV: devis?.MODELIV,
      MODE_PAIE: devis?.MODE_PAIE,
      NOTES: devis?.NOTES
    });
  }, [devis, form]);

  const onFinish = async (values) => {
    try {
      await handleUpdate(devisId, values);
      onFinishedUpdate();
    } catch (error) {
      message.error('Update failed: ' + error.message);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Devis</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="REMARQUE" label="Remarque">
          <Input />
        </Form.Item>
        <Form.Item name="MODELIV" label="Mode Livraison">
          <Input />
        </Form.Item>
        <Form.Item name="MODE_PAIE" label="Mode Paiement">
          <Input />
        </Form.Item>
        <Form.Item name="NOTES" label="Notes">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Update Devis
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default DevisUpdateForm;
