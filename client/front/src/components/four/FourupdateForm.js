import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Button, Card, Typography, Row, Col, message } from 'antd';
import { useUpdateFour, useFetchFourById } from '../../hooks/fourHooks';

const { Title } = Typography;

const FourUpdateForm = ({ fourId, onFinishedUpdate }) => {
  const { Four, loading: fetching } = useFetchFourById(fourId);
  const { handleUpdate, isUpdated } = useUpdateFour();
  const [form] = Form.useForm();

  useEffect(() => {
    if (Four) {
      form.setFieldsValue(Four);
    }
  }, [Four, form]);

  const onFinish = async (values) => {
    try {
      await handleUpdate(fourId, values);
      onFinishedUpdate();
    } catch (error) {
      message.error('Update failed: ' + error.message);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Fournisseur</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {Object.keys(Four || {}).map(key => (
          <Form.Item
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
            valuePropName={['echeance', 'cond_paie', 'bloquer'].includes(key) ? 'checked' : 'value'}
          >
            {['echeance', 'cond_paie', 'bloquer'].includes(key) ?
              <Checkbox /> : <Input type="text" />}
          </Form.Item>
        ))}
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Update Fournisseur
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FourUpdateForm;
