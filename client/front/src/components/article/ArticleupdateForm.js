import React, { useEffect } from 'react';
import { Form, Input, Checkbox, Button, Card, Row, Col, Typography } from 'antd';
import { useUpdateArticle, useFetchArticleById } from '../../hooks/articleHooks';

const { Title } = Typography;

const ArticleUpdateForm = ({ articleId }) => {
  const { article, loading: fetching } = useFetchArticleById(articleId);
  const { handleUpdate, isUpdated } = useUpdateArticle();
  const [form] = Form.useForm();

  useEffect(() => {
    if (article) {
      // Set form data with article data
      form.setFieldsValue(article);
    }
  }, [article, form]);

  const onFinish = async (values) => {
    await handleUpdate(articleId, values);
    if (isUpdated) {
      // Handle successful update, e.g., notification or redirection
      console.log('Article updated successfully!');
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <Card bordered={false} style={{ maxWidth: 800, margin: '20px auto' }}>
      <Title level={4}>Update Article</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {Object.keys(article || {}).map(key => (
          <Form.Item
            key={key}
            name={key}
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}
            valuePropName={key.endsWith('BLOQ') || key === 'LIQUIDER' ? 'checked' : 'value'}
          >
            {key.endsWith('BLOQ') || key === 'LIQUIDER' ? (
              <Checkbox>{key}</Checkbox>
            ) : (
              <Input type={['PA_HT', 'TVA', 'PA_TTC', 'PV_HT', 'PV_TTC', 'REMISEMAX'].includes(key) ? "number" : "text"} />
            )}
          </Form.Item>
        ))}
        <Row justify="end">
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
