import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Button, Card,Upload, Row, Col, Typography, Image, message } from 'antd';
import { useUpdateArticle, useFetchArticleById } from '../../hooks/articleHooks';
import { UploadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const ArticleUpdateForm = ({ articleId, onFinishedUpdate }) => {
  const { article, loading: fetching } = useFetchArticleById(articleId);
  const { handleUpdate } = useUpdateArticle();
  const [form] = Form.useForm();
  const placeholderImage = "https://via.placeholder.com/150";

  const uploadProps = {
    name: 'file',
    action: 'your-upload-url', // The URL to send the file data to
    headers: {
      authorization: 'authorization-text', // If required for your backend
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        // You can also set the uploaded file URL to form state here if needed
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (article) {
      form.setFieldsValue(article);
    }
  }, [article, form]);

  const onFinish = async (values) => {
    try {
      await handleUpdate(articleId, values);
      onFinishedUpdate();
    } catch (error) {
      message.error('Update failed: ' + error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800 }}>
      
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* General Information including photo upload */}
        <Card title="General Information">
          <Row gutter={16} align="middle">
            <Col span={6}>
              <Form.Item label="Upload Image" name="photo">
                <Upload {...uploadProps} listType="picture">
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
              <Image
                width={150}
                src={article?.photo || placeholderImage}
                fallback={placeholderImage}
                alt="Article"
              />
            </Col>
            <Col span={18}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>ID:</Text> <Form.Item name="id"><Input readOnly /></Form.Item>
                  <Text strong>Code Art:</Text> <Form.Item name="code_art"><Input /></Form.Item>
                  <Text strong>Code Fam:</Text> <Form.Item name="Code_fam"><Input /></Form.Item>
                  <Text strong>Name:</Text> <Form.Item name="nom"><Input /></Form.Item>
                </Col>
                <Col span={12}>
                  <Text strong>Description:</Text> <Form.Item name="desc"><Input /></Form.Item>
                  <Text strong>UAF:</Text> <Form.Item name="UAF"><Input /></Form.Item>
                  <Text strong>Ref OEM:</Text> <Form.Item name="REF_OEM"><Input /></Form.Item>
                  <Text strong>Code Frs:</Text> <Form.Item name="code_frs"><Input /></Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>

        {/* Pricing Details */}
        <Card title="Pricing Details">
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>PA HT:</Text> <Form.Item name="PA_HT"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>TVA:</Text> <Form.Item name="TVA"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>PA TTC:</Text> <Form.Item name="PA_TTC"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>PV HT:</Text> <Form.Item name="PV_HT"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>PV TTC:</Text> <Form.Item name="PV_TTC"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Max Discount:</Text> <Form.Item name="REMISEMAX"><Input type="number" /></Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Stock Details */}
        <Card title="Stock Details">
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Max Stock:</Text> <Form.Item name="STK_MAX"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Min Stock:</Text> <Form.Item name="STK_MIN"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Sec Stock:</Text> <Form.Item name="STK_SEC"><Input type="number" /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>UVC:</Text> <Form.Item name="UVC"><Input /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Stock Quantity:</Text> <Form.Item name="qte_stk"><Input type="number" /></Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Status and Dates */}
        <Card title="Status and Dates">
          <Row gutter={16}>
            <Col span={12}>
              <Text strong>Sales Block:</Text> <Form.Item name="VENTE_BLOQ"><Checkbox /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Purchase Block:</Text> <Form.Item name="ACHAT_BLOQ"><Checkbox /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Transfer Block:</Text> <Form.Item name="TRANS_BLOQ"><Checkbox /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Liquidate:</Text> <Form.Item name="LIQUIDER"><Checkbox /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Created At:</Text> <Form.Item name="createdAt"><Input readOnly value={formatDate(article?.createdAt)} /></Form.Item>
            </Col>
            <Col span={12}>
              <Text strong>Updated At:</Text> <Form.Item name="updatedAt"><Input readOnly value={formatDate(article?.updatedAt)} /></Form.Item>
            </Col>
          </Row>
        </Card>

        <Row justify="end" style={{ marginTop: 16 }}>
          <Col>
            <Button type="primary" htmlType="submit">
              Update Article
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default ArticleUpdateForm;
