import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  Modal,
  Button,
  message,
  Tabs,
  Icon,
} from "antd";
import { useSidebar } from "../../SidebarContext";
import { useFetchArticleById } from "../../hooks/articleHooks";
import ArticleDeleteButton from "./ArticleDeleteButton";
import ArticleUpdateForm from "./ArticleupdateForm";
import {
  DollarCircleOutlined,
  PercentageOutlined,
  TagOutlined,
  StockOutlined,
  SafetyCertificateOutlined,
  BoxPlotOutlined,
  BarcodeOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import {
  IdcardOutlined,
  TagsOutlined,
  FileTextOutlined,
  InfoCircleOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const SingleArticle = ({ articleId, onChangeView }) => {
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const { article, loading, error, refetch } = useFetchArticleById(articleId);
  const { setSidebarButtons } = useSidebar();

  const handleUpdateSuccess = () => {
    message.success("Article updated successfully!");
    setIsUpdateModalVisible(false);
    refetch(); // Assuming `refetch` is a function from your hook that re-fetches article data
  };

  useEffect(() => {
    const articleButtons = [
      <Button
        key="update"
        type="primary"
        onClick={() => setIsUpdateModalVisible(true)}
      >
        Update Article
      </Button>,
      <Button
        key="delete"
        type="danger"
        onClick={() => setIsDeleteModalVisible(true)}
      >
        Delete Article
      </Button>,
    ];

    setSidebarButtons((prevButtons) => [
      ...prevButtons.slice(0, 2),
      ...articleButtons,
    ]);

    return () => setSidebarButtons((prevButtons) => prevButtons.slice(0, 2));
  }, [setSidebarButtons]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>No article found</p>;

  const formatDate = (date) => new Date(date).toLocaleDateString();
  const placeholderImage = "https://via.placeholder.com/150";

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

  const OverviewContent = ({ article }) => (
    <Row gutter={24} style={cardContentStyle}>
      <Col
        span={6}
        style={{ alignItems: "center", display: "flex", minWidth: "160px" }}
      >
        <Image
          width={200}
          src={article.photo || placeholderImage}
          fallback={placeholderImage}
          alt="Article"
        />
      </Col>
      <Col span={9}>
        <Text style={textStyle}>
          <IdcardOutlined /> <strong>ID:</strong> {article.id}
        </Text>
        <Text style={textStyle}>
          <TagsOutlined /> <strong>Code Art:</strong> {article.code_art}
        </Text>
        <Text style={textStyle}>
          <InfoCircleOutlined /> <strong>Code Fam:</strong>{" "}
          {article.Code_fam || "None"}
        </Text>
        <Text style={textStyle}>
          <FileTextOutlined /> <strong>Name:</strong> {article.nom}
        </Text>
      </Col>
      <Col span={9}>
        <Text style={textStyle}>
          <FileTextOutlined /> <strong>Description:</strong> {article.desc}
        </Text>
        <Text style={textStyle}>
          <TagsOutlined /> <strong>UAF:</strong> {article.UAF}
        </Text>
        <Text style={textStyle}>
          <InfoCircleOutlined /> <strong>Ref OEM:</strong> {article.REF_OEM}
        </Text>
        <Text style={textStyle}>
          <TagsOutlined /> <strong>Code Frs:</strong> {article.code_frs}
        </Text>
      </Col>
    </Row>
  );

  const StatusContent = ({ article }) => (
    <Row gutter={24} style={cardContentStyle}>
      <Col span={12}>
        <Text style={textStyle}>
          {article.VENTE_BLOQ ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          <strong>Sales Block:</strong> {article.VENTE_BLOQ ? " Yes" : " No"}
        </Text>
        <Text style={textStyle}>
          {article.ACHAT_BLOQ ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          <strong>Purchase Block:</strong> {article.ACHAT_BLOQ ? " Yes" : " No"}
        </Text>
      </Col>
      <Col span={12}>
        <Text style={textStyle}>
          {article.TRANS_BLOQ ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          <strong>Transfer Block:</strong> {article.TRANS_BLOQ ? " Yes" : " No"}
        </Text>
        <Text style={textStyle}>
          {article.LIQUIDER ? (
            <CheckCircleOutlined style={{ color: "green" }} />
          ) : (
            <CloseCircleOutlined style={{ color: "red" }} />
          )}
          <strong>Liquidate:</strong> {article.LIQUIDER ? " Yes" : " No"}
        </Text>
      </Col>
      {/* Dates displayed at the end of the row on the right */}
      <Col span={24} style={{ textAlign: "right" }}>
        <Text style={dateStyle}>
          <CalendarOutlined /> <strong>Created At:</strong>{" "}
          {formatDate(article.createdAt)}
        </Text>
        <Text style={dateStyle}>
          <CalendarOutlined /> <strong>Updated At:</strong>{" "}
          {formatDate(article.updatedAt)}
        </Text>
      </Col>
    </Row>
  );

  const PricingDetails = ({ article }) => (
    <Row gutter={24} style={cardContentStyle}>
      <Col span={12}>
        <Text style={textStyle}>
          <DollarCircleOutlined /> <strong>PA HT:</strong> {article.PA_HT}
        </Text>
        <Text style={textStyle}>
          <PercentageOutlined /> <strong>TVA:</strong> {article.TVA}
        </Text>
        <Text style={textStyle}>
          <TagOutlined /> <strong>PA TTC:</strong> {article.PA_TTC}
        </Text>
      </Col>
      <Col span={12}>
        <Text style={textStyle}>
          <DollarCircleOutlined /> <strong>PV HT:</strong> {article.PV_HT}
        </Text>
        <Text style={textStyle}>
          <TagOutlined /> <strong>PV TTC:</strong> {article.PV_TTC}
        </Text>
        <Text style={textStyle}>
          <PercentageOutlined /> <strong>Max Discount:</strong>{" "}
          {article.REMISEMAX}
        </Text>
      </Col>
    </Row>
  );

  const StockDetails = ({ article }) => (
    <Row gutter={24} style={cardContentStyle}>
      <Col span={12}>
        <Text style={textStyle}>
          <StockOutlined /> <strong>Max Stock:</strong> {article.STK_MAX}
        </Text>
        <Text style={textStyle}>
          <BoxPlotOutlined /> <strong>Min Stock:</strong> {article.STK_MIN}
        </Text>
        <Text style={textStyle}>
          <SafetyCertificateOutlined /> <strong>Security Stock:</strong>{" "}
          {article.STK_SEC}
        </Text>
      </Col>
      <Col span={12}>
        <Text style={textStyle}>
          <FundProjectionScreenOutlined /> <strong>UVC:</strong> {article.UVC}
        </Text>
        <Text style={textStyle}>
          <BoxPlotOutlined /> <strong>Stock Quantity:</strong> {article.qte_stk}
        </Text>
      </Col>
    </Row>
  );

  return (
    <div style={mainBackgroundStyle}>
      <Title
        level={2}
        style={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#333", // Darker font color for better visibility
          marginBottom: "16px",
          borderBottom: "2px solid #ccc", // Separator line
          paddingBottom: "10px", // Spacing between title and separator line
          marginTop: "-10px",
        }}
      >
        {article.code_art} - {article.nom}
      </Title>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Overview" key="1">
          <Title level={4} style={titleStyle}>
            General Informations
          </Title>

          <Card style={cardStyle}>
            <OverviewContent article={article} />
          </Card>
          <Title level={4} style={titleStyle}>
            Status & Date
          </Title>

          <Card style={cardStyle}>
            <StatusContent article={article} />
          </Card>
        </TabPane>
        <TabPane tab="Inventory & Pricing" key="2">
          <Title level={4} style={titleStyle}>
            Pricing Details
          </Title>
          <Card style={cardStyle}>
            <PricingDetails article={article} />
          </Card>
          <Title level={4} style={titleStyle}>
            Stock Details
          </Title>
          <Card style={cardStyle}>
            <StockDetails article={article} />
          </Card>
        </TabPane>
      </Tabs>

      {/* Additional cards omitted for brevity */}

      <Modal
        title={
          <Title level={2} style={titleStyle}>
            Update Article
          </Title>
        }
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={() => setIsUpdateModalVisible(false)}
        width={1200}
      >
        <ArticleUpdateForm
          articleId={articleId}
          onFinishedUpdate={handleUpdateSuccess}
        />
      </Modal>

      <Modal
        title={
          <Title level={2} style={titleStyle}>
            Delete Article
          </Title>
        }
        visible={isDeleteModalVisible}
        footer={null}
        onCancel={() => setIsDeleteModalVisible(false)}
      >
        <ArticleDeleteButton
          articleId={articleId}
          onSuccess={() => {
            setIsDeleteModalVisible(false);
            onChangeView("list");
          }}
        />
      </Modal>
    </div>
  );
};

export default SingleArticle;
