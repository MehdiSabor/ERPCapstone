import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Button, Card, Typography, Row, Col, Spin, message } from 'antd';
import { useUpdateReglement, useFetchReglementById } from '../../hooks/regHooks';

const { Title } = Typography;

const ModifyReglementForm = ({ reglementId, onFinishedUpdate }) => {
  const { reglement, loading: fetching, error } = useFetchReglementById(reglementId);
  const { handleUpdate, isUpdating } = useUpdateReglement();
  const [form] = Form.useForm();

  useEffect(() => {
    if (reglement) {
      form.setFieldsValue({ MNT_REGLER: reglement.MNT_REGLER });
    }
  }, [reglement, form]);

  const onFinish = async (values) => {
    try {
      await handleUpdate(reglementId, values);
      message.success('Reglement updated successfully!');
      onFinishedUpdate();
    } catch (e) {
      message.error(`Update failed: ${e.message}`);
    }
  };

  if (fetching) return <Spin tip="Loading..." size="large" />;

  if (error) {
    message.error(`Error: ${error}`);
    return <p>Error: {error}</p>; // You might want to handle this more gracefully
  }

  return (
    <Card bordered={false} style={{ maxWidth: 600, margin: '20px auto' }}>
      <Title level={4}>Update Reglement</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="MNT_REGLER" label="Amount to Settle">
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={0.01}
            formatter={value => `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/€\s?|(,*)/g, '')}
          />
        </Form.Item>
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit" loading={isUpdating}>
              Update Reglement
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ModifyReglementForm;
