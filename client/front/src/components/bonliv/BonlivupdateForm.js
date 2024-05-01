import React, { useEffect } from 'react';
import { Select,Form, Input, Button, Card, Typography, Row, Col, message } from 'antd';
import { useUpdateBonliv, useFetchBonlivById } from '../../hooks/bonlivHooks';
import paymentModes from '../../lists/PaymentMode.json';  // Make sure the path is correct
import deliveryModes from '../../lists/DeliveryMode.json';  // Make sure the path is correct

const { Option } = Select;


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
    
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
