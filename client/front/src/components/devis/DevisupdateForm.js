import React, { useEffect } from 'react';
import { Select,Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { useUpdateDevis, useFetchDevisById } from '../../hooks/devisHooks';
import paymentModes from '../../lists/PaymentMode.json';  // Make sure the path is correct
import deliveryModes from '../../lists/DeliveryMode.json';  // Make sure the path is correct

const { Option } = Select;



const { Title } = Typography;

const DevisUpdateForm = ({ devisId, onFinishedUpdate }) => {
  const { devis, loading: fetching } = useFetchDevisById(devisId);
  const { handleUpdate, isUpdated } = useUpdateDevis();
  const [form] = Form.useForm();

  useEffect(() => {
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
    <Card bordered={false} style={{ maxWidth: 800 }}>
       <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="REMARQUE" label="Remarque">
          <Input />
        </Form.Item>
        <Form.Item label="Mode of Delivery" name="MODELIV">
              <Select placeholder="Select a delivery mode">
                {deliveryModes.map(mode => (
                  <Option key={mode} value={mode}>{mode}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Payment Mode" name="MODE_PAIE">
              <Select placeholder="Select a payment mode">
                {paymentModes.map(mode => (
                  <Option key={mode} value={mode}>{mode}</Option>
                ))}
              </Select>
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
