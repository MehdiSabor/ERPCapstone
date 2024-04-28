import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, message } from 'antd';
import { useUpdateCom, useFetchComById } from '../../hooks/comHooks';

const { Title } = Typography;

const ComUpdateForm = ({ comId, onFinishedUpdate }) => {
  const { Com, loading: fetching } = useFetchComById(comId);
  const { handleUpdate, isUpdated } = useUpdateCom();
  const [form] = Form.useForm();

  useEffect(() => {
    if (Com) {
      form.setFieldsValue(Com);
    }
  }, [Com, form]);

  const onFinish = async (values) => {
    try {
      await handleUpdate(comId, values);
      onFinishedUpdate();
    } catch (error) {
      message.error('Update failed: ' + error.message);
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Comercial</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {Object.keys(Com || {}).map(key => (
          <Form.Item
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
          >
            <Input type={key === "code_com" ? "number" : "text"} />
          </Form.Item>
        ))}
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Update Comercial
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ComUpdateForm;
