import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col, Card,Select } from 'antd';
import { useCreateFour } from '../../hooks/fourHooks'; // Adjust the import path as necessary
import countries from '../../lists/Country.json'; // Ensure the path matches your file structure

const { Option } = Select;

const FourForm = () => {
  const [form] = Form.useForm();
  const { handleCreate } = useCreateFour();

  const handleSubmit = async (values) => {
    console.log('Form Values:', values); // For debugging
    await handleCreate(values);
    form.resetFields(); // Reset form after submission
  };

  return (
    <Card title="Create Supplier" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Supplier Code"
              name="code_frs"
              rules={[{ required: true, message: 'Please input the supplier code!' }]}
            >
              <Input placeholder="Enter supplier code" />
            </Form.Item>
            <Form.Item
              label="Account"
              name="compte"
              rules={[{ required: true, message: 'Please input the account!' }]}
            >
              <Input placeholder="Enter account number" />
            </Form.Item>
            <Form.Item
              label="Social Name"
              name="sociale"
              rules={[{ required: true, message: 'Please input the social name!' }]}
            >
              <Input placeholder="Enter social name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="desc"
            >
              <Input placeholder="Enter description" />
            </Form.Item>
            <Form.Item
  label="Country"
  name="pays"
  rules={[{ required: true, message: 'Please select the country!' }]}
>
  <Select
    showSearch
    placeholder="Select a country"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
  >
    {countries.map(country => (
      <Option key={country} value={country}>{country}</Option>
    ))}
  </Select>
</Form.Item>

          </Col>
          <Col span={12}>
            <Form.Item
              label="Echeance"
              name="echeance"
              valuePropName="checked"
            >
              <Checkbox>Echeance</Checkbox>
            </Form.Item>
            <Form.Item
              label="Payment Condition"
              name="cond_paie"
              valuePropName="checked"
            >
              <Checkbox>Payment Condition</Checkbox>
            </Form.Item>
            <Form.Item
              label="Block"
              name="bloquer"
              valuePropName="checked"
            >
              <Checkbox>Block</Checkbox>
            </Form.Item>
            <Form.Item
              label="Note"
              name="note"
            >
              <Input.TextArea rows={4} placeholder="Enter any notes" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default FourForm;
