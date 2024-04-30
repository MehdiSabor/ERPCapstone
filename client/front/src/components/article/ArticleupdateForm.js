import React, { useEffect } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  Card,
  Upload,
  Row,
  Col,
  Typography,
  Image,
  message,
} from "antd";
import {
  useUpdateArticle,
  useFetchArticleById,
} from "../../hooks/articleHooks";
import {
  IdcardOutlined,
  TagsOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
  UploadOutlined,
  DollarCircleOutlined,
  PercentageOutlined,
  TagOutlined,
  StockOutlined,
  BoxPlotOutlined,
  SafetyCertificateOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const ArticleUpdateForm = ({ articleId, onFinishedUpdate }) => {
  const { article, loading: fetching } = useFetchArticleById(articleId);
  const { handleUpdate } = useUpdateArticle();
  const [form] = Form.useForm();
  const placeholderImage = "https://via.placeholder.com/150";

  const uploadProps = {
    name: "file",
    action: "your-upload-url", // The URL to send the file data to
    headers: {
      authorization: "authorization-text", // If required for your backend
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        // You can also set the uploaded file URL to form state here if needed
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (article) {
      form.setFieldsValue({
        ...article,
        PA_HT: article.PA_HT.toString(),
        TVA: article.TVA.toString(),
        PA_TTC: article.PA_TTC.toString(),
        PV_HT: article.PV_HT.toString(),
        PV_TTC: article.PV_TTC.toString(),
        STK_MAX: article.STK_MAX.toString(),
        STK_MIN: article.STK_MIN.toString(),
        STK_SEC: article.STK_SEC?.toString(),
        UVC: article.UVC?.toString(),
        REMISEMAX: article.REMISEMAX?.toString(),
        VENTE_BLOQ: article.VENTE_BLOQ ? true : false,
        ACHAT_BLOQ: article.ACHAT_BLOQ ? true : false,
        TRANS_BLOQ: article.TRANS_BLOQ ? true : false,
        LIQUIDER: article.LIQUIDER ? true : false,
        qte_stk: article.qte_stk.toString(),
      }); 
    }
  }, [article, form]);

  const onFinish = async (values) => {
    try {
      const parsedValues = {
        ...values,
        PA_HT: parseFloat(values.PA_HT),
        TVA: parseFloat(values.TVA),
        PA_TTC: parseFloat(values.PA_TTC),
        PV_HT: parseFloat(values.PV_HT),
        PV_TTC: parseFloat(values.PV_TTC),
        STK_MAX: parseInt(values.STK_MAX),
        STK_MIN: parseInt(values.STK_MIN),
        STK_SEC: values.STK_SEC ? parseInt(values.STK_SEC) : null,
        UVC: values.UVC ? parseInt(values.UVC) : null,
        REMISEMAX: values.REMISEMAX ? parseFloat(values.REMISEMAX) : null,
        VENTE_BLOQ: values.VENTE_BLOQ === true || values.VENTE_BLOQ === "true",
        ACHAT_BLOQ: values.ACHAT_BLOQ === true || values.ACHAT_BLOQ === "true",
        TRANS_BLOQ: values.TRANS_BLOQ === true || values.TRANS_BLOQ === "true",
        LIQUIDER: values.LIQUIDER === true || values.LIQUIDER === "true",
        qte_stk: parseInt(values.qte_stk),
      };
      await handleUpdate(articleId, parsedValues);
      onFinishedUpdate();
    } catch (error) {
      message.error("Update failed: " + error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (fetching) return <p>Loading...</p>;

  const cardStyle = {
    marginTop: "20px",
    backgroundColor: "#f8f8f8", // Lighter than the main background for emphasis
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds subtle shadow for depth
  };

  const cardContentStyle = {
    paddingLeft: "24px", // Add left padding to card content
    paddingTop: "10px",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "16px",
  };

  const GeneralInformationCard = ({
    article,
    uploadProps,
    placeholderImage,
  }) => (
    <Card
      title={<Title level={4}>General Information</Title>}
      style={{
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Row gutter={[16, 8]}>
        <Col span={12}>
          <Row gutter={[16, 8]} align="middle">
            <Col span={24}>
              <img
                src={article?.photo || placeholderImage}
                alt="Article"
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </Col>
            <Col span={24}>
              <Upload {...uploadProps} listType="picture">
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 8]}>
            <Col span={12}>
              <Text strong>
                <IdcardOutlined /> ID:
              </Text>{" "}
              <Form.Item name="id">
                <Input readOnly />
              </Form.Item>
              <Text strong>
                <TagsOutlined /> Code Art:
              </Text>{" "}
              <Form.Item name="code_art">
                <Input />
              </Form.Item>
              <Text strong>
                <InfoCircleOutlined /> Code Fam:
              </Text>{" "}
              <Form.Item name="Code_fam">
                <Input />
              </Form.Item>
              <Text strong>
                <FileTextOutlined /> Name:
              </Text>{" "}
              <Form.Item name="nom">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>
                <FileTextOutlined /> Description:
              </Text>{" "}
              <Form.Item name="desc">
                <Input />
              </Form.Item>
              <Text strong>
                <TagsOutlined /> UAF:
              </Text>{" "}
              <Form.Item name="UAF">
                <Input />
              </Form.Item>
              <Text strong>
                <InfoCircleOutlined /> Ref OEM:
              </Text>{" "}
              <Form.Item name="REF_OEM">
                <Input />
              </Form.Item>
              <Text strong>
                <TagsOutlined /> Code Frs:
              </Text>{" "}
              <Form.Item name="code_frs">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );

  const PricingDetailsCard = () => (
    <Card
      title={
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "16px",
          }}
        >
          Pricing Details
        </div>
      }
    >
      <Row gutter={16}>
        <Col span={8}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text strong>
                <DollarCircleOutlined /> PA HT:
              </Text>
              
              <Form.Item name="PA_HT">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Text strong>
                <PercentageOutlined /> TVA:
              </Text>
              <Form.Item name="TVA">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text strong>
                <TagOutlined /> PA TTC:
              </Text>
              <Form.Item name="PA_TTC">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Text strong>
                <DollarCircleOutlined /> PV HT:
              </Text>
              <Form.Item name="PV_HT">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text strong>
                <TagOutlined /> PV TTC:
              </Text>
              <Form.Item name="PV_TTC">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Text strong>
                <PercentageOutlined /> Max Discount:
              </Text>
              <Form.Item name="REMISEMAX">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );

  const StockDetailsCard = () => (
    <Card
      title={
        <div
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "16px",
          }}
        >
          Stock Details
        </div>
      }
    >
      <Row gutter={16}>
        <Col span={8}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text strong>
                <StockOutlined /> Max Stock:
              </Text>
              <Form.Item name="STK_MAX">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Text strong>
                <BoxPlotOutlined /> Min Stock:
              </Text>
              <Form.Item name="STK_MIN">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text strong>
                <SafetyCertificateOutlined /> Sec Stock:
              </Text>
              <Form.Item name="STK_SEC">
                <Input type="number" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Text strong>
                <FundProjectionScreenOutlined /> UVC:
              </Text>
              <Form.Item name="UVC">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row gutter={[16, 8]}>
            <Col span={24}>
              <Text strong>
                <BoxPlotOutlined /> Stock Quantity:
              </Text>
              <Form.Item name="qte_stk">
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );

  const StatusAndDatesCard = ({ article, formatDate }) => (
    <Card
      title={
        <div
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '16px',
          }}
        >
          Status and Dates
        </div>
      }
    >
      <Form
        layout="vertical"
        initialValues={{
          ...article,
          VENTE_BLOQ: "VENTE_BLOQ",
          ACHAT_BLOQ: "ACHAT_BLOQ",
          TRANS_BLOQ: "TRANS_BLOQ",
          LIQUIDER: "LIQUIDER",
          createdAt: formatDate("createdAt"),
          updatedAt: formatDate("updatedAt"),
        }}
        onFinish={onFinish}
        form={form}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="VENTE_BLOQ" valuePropName="checked">
              <Checkbox>Sales Block</Checkbox>
            </Form.Item>
            <Form.Item name="ACHAT_BLOQ" valuePropName="checked">
              <Checkbox>Purchase Block</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="TRANS_BLOQ" valuePropName="checked">
              <Checkbox>Transfer Block</Checkbox>
            </Form.Item>
            <Form.Item name="LIQUIDER" valuePropName="checked">
              <Checkbox>Liquidate</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="createdAt">
              <Input readOnly addonBefore="Created At" />
            </Form.Item>
            <Form.Item name="updatedAt">
              <Input readOnly addonBefore="Updated At" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
  

  return (
    <Card title={<Title style={titleStyle} level={3}>Update Article</Title>} bordered={false} style={{ maxWidth: '1200' }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <GeneralInformationCard
          article={article}
          uploadProps={uploadProps}
          placeholderImage={placeholderImage}
        />
        <StatusAndDatesCard article={article} formatDate={formatDate} />
        <PricingDetailsCard />
        <StockDetailsCard />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ArticleUpdateForm;
