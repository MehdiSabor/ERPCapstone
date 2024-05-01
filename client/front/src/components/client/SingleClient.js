import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Modal, Button, message, Tabs } from "antd";
import { useSidebar } from "../../SidebarContext";
import { useFetchClientById } from "../../hooks/clientHooks";
import ClientUpdateForm from "./ClientupdateForm";
import ClientDeleteButton from "./ClientDeleteButton";
import {
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  DollarOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  BankOutlined,
  PercentageOutlined,
  MoneyCollectOutlined,
  IdcardOutlined,
  TruckOutlined,
  TagsOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,EditOutlined, DeleteOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const SingleClient = ({ clientId, onChangeView }) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { client, loading, error, refetch } = useFetchClientById(clientId);
  const { setSidebarButtons } = useSidebar();

  const handleUpdateSuccess = () => {
    message.success("Client updated successfully!");
    setIsUpdateModalVisible(false);
    refetch();
  };

  const handleDeleteSuccess = () => {
    message.success("Client deleted successfully!");
    setIsDeleteModalVisible(false);
    onChangeView("list"); // Navigate back to the client list or dashboard
  };

  useEffect(() => {
    // Define SingleClient specific buttons
    const clientButtons = [
      <Button
        key="update"
        icon={<EditOutlined />}
        type="primary"
        onClick={() => setIsUpdateModalVisible(true)}
      >
        Update Client
      </Button>,
      <Button
        key="delete"
        icon={<DeleteOutlined />}
        type="danger"
        onClick={() => setIsDeleteModalVisible(true)}
      >
        Delete Client
      </Button>,
    ];
    // Set the buttons for this client view
    setSidebarButtons((prevButtons) => [
      ...prevButtons.slice(0, 2), // Assume first two are base buttons, adjust slice as necessary
      ...clientButtons,
    ]);

    // Clean up by removing only the client-specific buttons on unmount
    return () => {
      setSidebarButtons((prevButtons) => prevButtons.slice(0, 2));
    };
  }, [setSidebarButtons, onChangeView, clientId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!client) return <p>No client found</p>;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "Not provided";

  const textStyle = {
    marginBottom: "10px",
    display: "block",
    fontSize: "16px", // Adjust the font size as needed
  };

  const cardContentStyle = {
    paddingLeft: "24px", // Add left padding to card content
    paddingTop: "10px",
  };

  const titleStyle = {
    fontSize: "18px", // Increased font size for titles
    fontWeight: "bold",
    color: "#333", // Darker font color for better visibility
    marginBottom: "16px",
  };

  const dateStyle = {
    fontSize: "12px",
    color: "grey",
    float: "right", // Right align the dates
    margin: "0 10px 10px 0", // Add some margin for better spacing
  };

  const cardStyle = {
    marginTop: "20px",
    backgroundColor: "#f8f8f8", // Lighter than the main background for emphasis
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds subtle shadow for depth
  };

  const mainBackgroundStyle = {
    background: "#ececec", // Main background color
    padding: "20px",
  };

  return (
    <div style={mainBackgroundStyle}>
      <Title level={2} style={titleStyle}>
        {client.nom} - Client Information
      </Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Personal Information" key="1">
          <Card style={cardStyle}>
            <Row gutter={[24, 24]} style={cardContentStyle}>
              {" "}
              {/* Increased gutter for more spacing */}
              <Col span={12}>
                <Text style={textStyle}>
                  <UserOutlined /> <strong>Name:</strong> {client.nom}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <IdcardOutlined /> <strong>Code Clt:</strong>{" "}
                  {client.code_clt}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <PhoneOutlined /> <strong>Phone:</strong> {client.tel}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <HomeOutlined /> <strong>Address:</strong> {client.adresse}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <InfoCircleOutlined /> <strong>City:</strong> {client.ville}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <CalendarOutlined /> <strong>Note:</strong> {client.note}
                </Text>
              </Col>
              <Col span={12}>
                <Text>
                  <CalendarOutlined /> <strong>Registered:</strong>{" "}
                  {formatDate(client.createdAt)}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <MoneyCollectOutlined /> <strong>Status:</strong>{" "}
                  {!client.bloquer ? (
                    <CheckCircleOutlined
                      style={{ color: "green", marginLeft: 8 }}
                    />
                  ) : (
                    <CloseCircleOutlined
                      style={{ color: "red", marginLeft: 8 }}
                    />
                  )}
                </Text>
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab="Financial Information" key="2">
          <Card style={cardStyle}>
            <Row gutter={[24, 24]} style={cardContentStyle}>
              {" "}
              {/* Increased gutter for more spacing */}
              <Col span={12}>
                <Text style={textStyle}>
                  <CalendarOutlined /> <strong>Due Days:</strong>{" "}
                  {client.echeance}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <BankOutlined /> <strong>Payment Mode:</strong>{" "}
                  {client.mode_paie}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <PercentageOutlined /> <strong>General Discount:</strong>{" "}
                  {client.REMISE_G}%
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <MoneyCollectOutlined /> <strong>Ceiling:</strong>{" "}
                  {client.plafond}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <DollarOutlined /> <strong>Balance:</strong> {client.SOLDE}
                </Text>
              </Col>
              <Col span={12}>
                <Text>
                  <UserOutlined /> <strong>Salesperson Code: </strong>
                  {client.code_com}
                </Text>
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab="Additional Information" key="3">
          <Card style={cardStyle}>
            <Row gutter={[24, 24]} style={cardContentStyle}>
              {" "}
              {/* Increased gutter for more spacing */}
              <Col span={12}>
                <Text style={textStyle}>
                  <BankOutlined />
                  <strong>Payment Conditions:</strong>{" "}
                  {client.cond_paie || "N/A"}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <TruckOutlined />
                  <strong>Delivery Mode:</strong> {client.mode_liv || "N/A"}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <TagsOutlined />
                  <strong>Category Code:</strong> {client.code_cat || "N/A"}
                </Text>
              </Col>
              <Col span={12}>
                <Text style={textStyle}>
                  <CalendarOutlined />
                  <strong>Created At:</strong> {formatDate(client.createdAt)}
                </Text>
              </Col>
              {/* Include any other additional fields here */}
            </Row>
          </Card>
        </TabPane>
      </Tabs>
      <Modal
        title="Update Client"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
      >
        <ClientUpdateForm
          clientId={clientId}
          onFinishedUpdate={handleUpdateSuccess}
        />
      </Modal>
      <Modal
        title="Delete Client"
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <ClientDeleteButton
          clientId={clientId}
          onSuccess={handleDeleteSuccess}
        />
      </Modal>
    </div>
  );
};

export default SingleClient;
