import React from 'react';
import { Card, Row, Col, Spin } from 'antd'; // Import necessary components
import { useFetchNetRevenue } from '../../hooks/useDashboard'; // Adjust the import path as necessary

const NetRevenue = () => {
  const { data, loading, error } = useFetchNetRevenue();

  if (loading) {
    return <Spin size="large" />; // Shows a loading spinner while data is being fetched
  }

  if (error) {
    return <p>Error: {error}</p>; // Error handling
  }

  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Net Revenue" bordered={false}>
          <p>${data.netRevenue?.toFixed(2)}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Number of Clients Reached" bordered={false}>
          <p>{data.clientsCount}</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Number of Articles Sold" bordered={false}>
          <p>{data.articlesCount}</p>
        </Card>
      </Col>
    </Row>
  );
};

export default NetRevenue;
