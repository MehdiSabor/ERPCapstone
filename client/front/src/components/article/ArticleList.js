import React, { useState, useRef } from "react";
import { Table, Input, Button, Space, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useFetchAllArticles } from "../../hooks/articleHooks";

const ArticleList = ({ onSelectArticle }) => {
  const { articles, loading, error } = useFetchAllArticles();
  const searchInput = useRef(null);

  console.log(articles);
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  // Search and filtering function
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  // Handling search and reset
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const columns = [
    {
      title: "Code Article",
      dataIndex: "code_art",
      key: "code_art",
      ...getColumnSearchProps("code_art"),
    },
    {
      title: "Quantity Stock",
      dataIndex: "qte_stk",
      key: "qte_stk",
    },
    {
      title: "Purchase Price",
      dataIndex: "PA_TTC",
      key: "PA_TTC",
    },
    {
      title: "Selling Price",
      dataIndex: "PV_TTC",
      key: "PV_TTC",
    },
    {
      title: "Last Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Sale Blocked",
      dataIndex: "VENTE_BLOQ",
      key: "VENTE_BLOQ",
    },
    {
      title: "Name",
      dataIndex: "nom",
      key: "nom",
    },
    {
      title: "Family Code",
      dataIndex: "Code_fam",
      key: "Code_fam",
      ...getColumnSearchProps("Code_fam"),
    },
    {
      title: "Supplier Code",
      dataIndex: "code_frs",
      key: "code_frs",
      ...getColumnSearchProps("code_frs"),
    },
  ];

  
  const titleStyle = {
    fontSize: "24px", // Increased font size for titles
    fontWeight: "bold",
    color: "#333", // Darker font color for better visibility
    marginBottom: "16px",
    borderBottom: "2px solid #ccc", // Separator line
    paddingBottom: "10px", // Spacing between title and separator line
    marginTop: "-10px",
  };
  
  
  const tableCardStyle = {
    marginTop: "20px",
    backgroundColor: "#ffffff", // Lighter than the main background for emphasis
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Optional: adds subtle shadow for depth
  };
  
  const mainBackgroundStyle = {
    background: "#ececec", // Main background color
    padding: "20px",
  };

  return (
    <div style={mainBackgroundStyle}>
      <Card style={tableCardStyle}>
        <h2 style={titleStyle}>Articles List</h2>
        <Table columns={columns} dataSource={articles} rowKey="id" pagination={{ pageSize: 10 }} onRow={(record) => ({
          onClick: () => onSelectArticle(record),
        })} />
      </Card>
    </div>
  );
};

export default ArticleList;
