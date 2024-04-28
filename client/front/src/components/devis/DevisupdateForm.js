import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Button, Card, Typography, Row, Col, message } from 'antd';
import { useUpdateDevis, useFetchDevisById } from '../../hooks/devisHooks';

const { Title } = Typography;

const DevisUpdateForm = ({ devisId, onFinishedUpdate }) => {
  const { devis, loading: fetching } = useFetchDevisById(devisId);
  const { handleUpdate, isUpdated } = useUpdateDevis();
  const [form] = Form.useForm();

  useEffect(() => {
    if (devis) {
      form.setFieldsValue(devis);
    }
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
        {Object.keys(devis || {}).map(key => (
          <Form.Item
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
            valuePropName={['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ? 'checked' : 'value'}
          >
            {['EN_BC', 'EN_BL', 'VALIDER', 'BASEHT'].includes(key) ?
              <Checkbox /> :
              <Input type={['MNT_HT', 'MNT_TTC', 'CODE_COM', 'NOTES'].includes(key) ? 'number' :
                       ['DATE_DEV', 'DATEVALID', 'HEUREVALID'].includes(key) ? 'date' : 'text'} />}
          </Form.Item>
        ))}
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
