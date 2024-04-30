import React, { useState } from 'react';
import { Select, Spin, Card, Switch } from 'antd';
import { Column, Line } from '@ant-design/charts';
import { useArticleSalesData } from '../../hooks/useDashboard'; // Adjust the path as necessary

const { Option } = Select;

const SalesBarChart = ({ articles }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isBarChart, setIsBarChart] = useState(true); // Initialize to show bar chart by default
  const { data, loading, error } = useArticleSalesData(selectedArticle);

  const handleChange = (value) => {
    setSelectedArticle(value);
  };

  const config = {
    data,
    xField: 'month',
    yField: 'totalSold',
    label: {
        // Adjust or remove position if not applicable
        style: {
            fill: '#FFFFFF',
            opacity: 0.6,
        },
        content: (item) => item.totalSold.toString(),
    },
    tooltip: {
        formatter: (item) => ({ name: 'Total Sold', value: item.totalSold }),
    },
    xAxis: {
        label: {
            formatter: (v) => `Month ${v}`,
        },
    },
    yAxis: {
        title: {
            text: 'Quantity Sold',
        },
    },
};

  return (
    <Card
      title="Article Sales Data"
      extra={
        <Switch
          checkedChildren="Bar"
          unCheckedChildren="Line"
          checked={isBarChart}
          onChange={() => setIsBarChart(!isBarChart)}
        />
      }
      style={{ width: '100%' }}
    >
      <Select
        showSearch
        style={{ width: 200, marginBottom: 20 }}
        placeholder="Select an article"
        optionFilterProp="children"
        onChange={handleChange}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {articles.map(article => (
          <Option key={article.code_art} value={article.code_art}>{article.nom}</Option>
        ))}
      </Select>
      {loading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />
      ) : error ? (
        <p>Error: {error}</p>
      ) : isBarChart ? (
        <Column {...config} />
      ) : (
        <Line {...config} />
      )}
    </Card>
  );
};

export default SalesBarChart;
