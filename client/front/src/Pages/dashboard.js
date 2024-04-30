import React from 'react';
import MonthlyOrderVolume from '../components/dashboard/MonthlyOrderVolume';
import TopSalespersonsByQuotes from '../components/dashboard/topSalesPerson';
import RevenueRanking from '../components/dashboard/revenueRanking';
import NetRevenue from '../components/dashboard/NetRevenue';
import ArticleSalesBarChart from '../components/dashboard/ArticleSalesChart'
import { Row, Col, Card } from 'antd';
import { useFetchAllArticles } from '../hooks/articleHooks';

const DashboardPage = () => {
    const { articles, loading, error } = useFetchAllArticles();

    return (
        <div style={{ margin: '24px' }}>
          <Card title="Dashboard" bordered={false} headStyle={{ fontSize: '24px', fontWeight: 'bold' }}>
            <NetRevenue />
    
            <Row gutter={16} style={{ marginTop: '24px' }}>
              <Col span={12}>
                <MonthlyOrderVolume />
              </Col>
              <Col span={12}>
                <TopSalespersonsByQuotes />
              </Col>
            </Row>
    
            <Row gutter={16} style={{ marginTop: '24px' }}>
              <Col span={12}>
                <RevenueRanking />
              </Col>
              <Col span={12}>
                <ArticleSalesBarChart articles={articles} />
              </Col>
            </Row>
          </Card>
        </div>
      );
    };
export default DashboardPage;
