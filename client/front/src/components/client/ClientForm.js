import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Modal,
  Card,
  Select,
  Slider,
  message,
  Typography,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  DollarOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { useCreateClient } from "../../hooks/clientHooks";
import ComList from "../com/ComList";
import cities from '../../lists/City.json';  // Make sure the path is correct
import paymentModes from '../../lists/PaymentMode.json';  // Make sure the path is correct

const { Option } = Select;
const { Title } = Typography;

const ClientForm = () => {
  
  const [showComList, setShowComList] = useState(false);
  const { handleCreate } = useCreateClient();
  const [form] = Form.useForm();

  const handleSelectCom = (code_com) => {
    form.setFieldsValue({ code_com });
    setShowComList(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    await handleCreate({
      ...values,
      echeance: parseInt(values.echeance, 10) || 0,
      REMISE_G: parseFloat(values.REMISE_G) || 0.0,
      plafond: parseFloat(values.plafond) || 0.0,
      code_com: parseInt(values.code_com, 10) || 0,
      SOLDE: parseInt(values.SOLDE, 10) || 0,
      cond_paie: values.cond_paie ? parseInt(values.cond_paie, 10) : null,
      code_cat: values.code_cat ? parseInt(values.code_cat, 10) : null,
    });
    form.resetFields();
    message.success("Client Created Successfully!");
  };

  const showModal = () => setShowComList(true);
  const handleCloseModal = () => setShowComList(false);

  return (
    <div style={{ background: "#ececec", padding: "20px" }}>
      <Card
        style={{
          marginTop: "20px",
          backgroundColor: "#f8f8f8",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title
          level={2}
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "16px",
            borderBottom: "2px solid #ccc",
            paddingBottom: "10px",
            marginTop: "10px",
          }}
        >
          Create Client Information
        </Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Title
            level={4}
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "16px",
            }}
          >
            Personal Details
          </Title>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label={
                  <span>
                    <UserOutlined /> Name
                  </span>
                }
                name="nom"
                rules={[{ required: true }]}
                style={{ marginBottom: "16px" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <PhoneOutlined /> Phone
                  </span>
                }
                name="tel"
                style={{ marginBottom: "16px" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <EnvironmentOutlined /> Address
                  </span>
                }
                name="adresse"
                style={{ marginBottom: "16px" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <EnvironmentOutlined /> City
                  </span>
                }
                name="ville"
                style={{ marginBottom: "16px" }}
              >
                <Select placeholder="Select a city">
                  {cities.map((city) => (
                    <Option key={city} value={city}>
                      {city}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <EnvironmentOutlined /> Note
                  </span>
                }
                name="note"
                style={{ marginBottom: "16px" }}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={showModal}
                  icon={<UserOutlined />}
                >
                  Select Commercial
                </Button>
                <p>Selected Commercial: {form.getFieldValue("code_com")}</p>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Title
                level={4}
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "16px",
                  marginTop: "-36px",
                }}
              >
                Financial Details
              </Title>
              <Form.Item
                label={
                  <span>
                    <ScheduleOutlined /> Due Days
                  </span>
                }
                name="echeance"
                style={{ marginBottom: "16px" }}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <EnvironmentOutlined /> Payment Mode
                  </span>
                }
                name="mode_paie"
                style={{ marginBottom: "16px" }}
              >
                <Select placeholder="Select a payment mode">
                  {paymentModes.map((mode) => (
                    <Option key={mode} value={mode}>
                      {mode}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <DollarOutlined /> General Discount (%)
                  </span>
                }
                name="REMISE_G"
                style={{ marginBottom: "16px" }}
              >
                <Slider
                  min={0}
                  max={100}
                  marks={{ 0: "0%", 50: "50%", 100: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <DollarOutlined /> Ceiling
                  </span>
                }
                name="plafond"
                style={{ marginBottom: "16px" }}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    <DollarOutlined /> Balance
                  </span>
                }
                name="SOLDE"
                style={{ marginBottom: "16px" }}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        title="Select Commercial"
        visible={showComList}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        footer={null}
      >
        <ComList onSelectCom={handleSelectCom} />
      </Modal>
    </div>
  );
};

export default ClientForm;
