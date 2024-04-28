import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Typography, Switch, Divider } from 'antd';
import { useUpdateUser, useFetchUserById } from '../../hooks/userHooks';

const { Title, Text } = Typography;

const UserUpdateForm = ({ userId,onFinishedUpdate }) => {
  const { user, loading, error } = useFetchUserById(userId);
  const { handleUpdate, isUpdated } = useUpdateUser();
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onFinish = async (values) => {
    await handleUpdate(userId, values);
    onFinishedUpdate();
  };

  if (loading) return <Typography.Text>Loading...</Typography.Text>;
  if (error) return <Typography.Text type="danger">Error: {error}</Typography.Text>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update User</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>User ID:</Text>
            <Text block>{user?.UserID}</Text>
            <br></br>
            <Text strong>Email:</Text>
          <Text block>{user?.Email}</Text>
          <br></br>
            <Text strong>Name:</Text>
            <Text block>{user?.Name}</Text>
          </Col>
          <Col span={12}>
            {[
              'IsManager',
              'CanManageQuote',
              'CanManageDeliveryNote',
              'CanManageInvoice',
              'CanProcessPayments',
              'CanProcessReturns',
              'CanManageArticles',
              'CanManageClients',
              'CanManageCommercials',
              'CanManageFournisseurs'
            ].map(permission => (
              <Form.Item
                key={permission}
                name={permission}
                valuePropName="checked"
                label={permission.replace(/CanManage|Is|CanProcess/g, match => match + ' ')}
              >
                <Switch />
              </Form.Item>
            ))}
          </Col>
        </Row>
        <Divider />
        <Row justify="end">
          <Col>
            <Button type="primary" htmlType="submit">
              Update User
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default UserUpdateForm;
