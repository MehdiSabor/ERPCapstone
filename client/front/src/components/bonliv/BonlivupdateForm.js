import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { useUpdateBonliv, useFetchBonlivById } from '../../hooks/bonlivHooks';

const { Title } = Typography;

const BonlivUpdateForm = ({ bonlivId,onSuccess }) => {
  const { bonliv, loading: fetching } = useFetchBonlivById(bonlivId);
  const { handleUpdate, isUpdated } = useUpdateBonliv();
  const [form] = Form.useForm();

  useEffect(() => {
    // Set form values from fetched data
    form.setFieldsValue({
      MODELIV: bonliv?.MODELIV,
      MODE_PAIE: bonliv?.MODE_PAIE,
      REMARQUE: bonliv?.REMARQUE
    });
  }, [bonliv, form]);

  const onFinish = async (values) => {
    try {
      await handleUpdate(bonlivId, values);
      onSuccess();
      // Handle successful update here, perhaps navigating back or showing a success message
     
    } catch (error) {
      message.error('Update failed: ' + error.message);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Bonliv</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="MODELIV" label="Mode de Livraison">
          <Input />
        </Form.Item>
        <Form.Item name="MODE_PAIE" label="Mode de Paiement">
          <Input />
        </Form.Item>
        <Form.Item name="REMARQUE" label="Remarque">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Update Bonliv
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default BonlivUpdateForm;
