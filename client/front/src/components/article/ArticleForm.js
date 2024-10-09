import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Modal, Card, Upload, Checkbox, message } from 'antd';
import { useCreateArticle } from '../../hooks/articleHooks';
import FourList from '../four/FourList';
import FamilleList from '../famille/ListFamilles';
import axios from 'axios';
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
  FundProjectionScreenOutlined,UserOutlined,ClusterOutlined
} from "@ant-design/icons";


const ArticleForm = () => {
  const { handleCreate } = useCreateArticle();
  const [showFourList, setShowFourList] = useState(false);
  const [showFamilleList, setShowFamilleList] = useState(false);
  const [form] = Form.useForm();
  const instance = axios.create();

  const handleSubmit = async (values) => {
    const imageUrl = await handleUpload(); // Modify handleUpload to return the imageUrl

    // Preprocess the values to ensure correct data types and handle empty strings
    const payload = {
      ...values,
      photo: imageUrl,
      UAF: values.UAF ? parseInt(values.UAF, 10) : null,
      Code_fam: values.Code_fam ? parseInt(values.Code_fam, 10) : null,
      
      STK_MAX: values.STK_MAX ? parseInt(values.STK_MAX, 10) : null,
      STK_SEC: values.STK_SEC ? parseInt(values.STK_SEC, 10) : null,
      UVC: values.UVC ? parseInt(values.UVC, 10) : null,
      STK_MIN: values.STK_MIN ? parseInt(values.STK_MIN, 10) : null,
      qte_stk: values.qte_stk ? parseInt(values.qte_stk, 10) : null,
      PA_HT: values.PA_HT ? parseFloat(values.PA_HT) : null,
      PV_HT: values.PV_HT ? parseFloat(values.PV_HT) : null,
      TVA: values.TVA ? parseFloat(values.TVA) : null,
      PA_TTC: values.PA_TTC ? parseFloat(values.PA_TTC) : null,  // Assuming these are computed and may need saving
      PV_TTC: values.PV_TTC ? parseFloat(values.PV_TTC) : null, 
      REMISEMAX: values.REMISEMAX ? parseFloat(values.REMISEMAX) : null, // Assuming these are computed and may need saving
    };
    console.log(payload);
    await handleUpload();
    console.log('Submitting:', payload); // For debugging
    await handleCreate(payload);
    message.success("Item Created Successfully!");
   
    form.resetFields(); // Reset form after submission
  };
  

  // Close modal and set the selected value
  const handleSelectFour = (code_frs) => {
    form.setFieldsValue({ code_frs });
    setShowFourList(false);
  };

  const handleSelectFamille = (Code_fam) => {
    form.setFieldsValue({ Code_fam });
    setShowFamilleList(false);
  };

  // Upload properties
  

  const [fileList, setFileList] = useState([]);

  const handleFileChange = info => {
    setFileList(info.fileList);
  };


  const handleUpload = async () => {
    // Ensure there's a file to upload and an article code to use as an identifier
    if (fileList.length > 0 && form.getFieldValue('code_art')) {
      const formData = new FormData();
      formData.append("file", fileList[0].originFileObj);
      const articleCode = form.getFieldValue('code_art'); // Get the article code from the form
  
      // Use the article code as public_id and original_filename
      formData.append("public_id", articleCode);  
      formData.append("original_filename", articleCode);
  
      formData.append("upload_preset", "uozkyhrp"); // Replace with your upload preset name
      formData.append("cloud_name", "dggqqwrib"); // Replace with your Cloudinary cloud name
  
      try {
        const response = await instance.post("https://api.cloudinary.com/v1_1/dggqqwrib/image/upload", formData);
        const data = response.data;
        const imageUrl = data.secure_url;
        console.log("Uploaded Image URL:", imageUrl);
        return imageUrl;  // Return the image URL
      } catch (error) {
        console.error('Error uploading file:', error);
        return ''; // Return an empty string or handle as needed
      }
    } else {
      console.log("No file to upload or article code is missing.");
      return ''; // Return an empty string or handle as needed
    }
  };
  

  const handleValueChange = (_, allValues) => {
    const PA_HT = parseFloat(allValues.PA_HT);
    const PV_HT = parseFloat(allValues.PV_HT);
    const TVA = parseFloat(allValues.TVA) / 100;

    let newFields = {};
    if (!isNaN(PA_HT) && !isNaN(TVA)) {
      newFields.PA_TTC = PA_HT * (1 + TVA);
    }
    if (!isNaN(PV_HT) && !isNaN(TVA)) {
      newFields.PV_TTC = PV_HT * (1 + TVA);
    }
    form.setFieldsValue(newFields);
  };

  // const titleStyle = {
  //   fontSize: "24px", // Increased font size for titles
  //   fontWeight: "bold",
  //   color: "#333", // Darker font color for better visibility
  //   marginBottom: "16px",
  //   borderBottom: "2px solid #ccc", // Separator line
  //   paddingBottom: "10px", // Spacing between title and separator line
  // };

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


  return (
    <Card
      title="Create Article"
      bordered={false}
      style={{
        width: '100%',
        ...cardStyle,
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit} onValuesChange={handleValueChange}>
        <Row gutter={16} style={cardContentStyle}>
          <Col span={12}>
            {/* Basic article information */}
            <Form.Item label={<span><IdcardOutlined /> Article Code</span>} name="code_art" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<span><FileTextOutlined /> Name</span>} name="nom" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label={<span><FileTextOutlined /> Description</span>} name="desc">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label={<span><UploadOutlined /> Upload Image</span>} name="photo">
              <Upload
                beforeUpload={() => false}
                listType="picture"
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label={<span><TagsOutlined /> Unit of Account</span>} name="UAF">
              <Input />
            </Form.Item>
            <Form.Item label={<span><DollarCircleOutlined /> Purchase Price (HT)</span>} name="PA_HT">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><PercentageOutlined /> VAT Rate (%)</span>} name="TVA">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><DollarCircleOutlined /> Selling Price (HT)</span>} name="PV_HT">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><TagOutlined /> Purchase Price Incl. VAT</span>} name="PA_TTC">
              <Input prefix="mad" readOnly />
            </Form.Item>
            <Form.Item label={<span><TagOutlined /> Selling Price Incl. VAT</span>} name="PV_TTC">
              <Input prefix="mad" readOnly />
            </Form.Item>
            <Form.Item label={<span><PercentageOutlined /> Maximum Discount (%)</span>} name="REMISEMAX">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><InfoCircleOutlined /> OEM Reference</span>} name="REF_OEM">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Supplier and family selection */}
            <Form.Item label={<span><IdcardOutlined /> Supplier Code</span>} name="code_frs">
              <Button type="link" onClick={() => setShowFourList(true)} icon={<UserOutlined />}>Select Supplier</Button>
              {form.getFieldValue('code_frs') && <p>Selected Supplier: {form.getFieldValue('code_frs')}</p>}
            </Form.Item>
            <Form.Item label={<span><TagsOutlined /> Family Code</span>} name="Code_fam">
              <Button type="link" onClick={() => setShowFamilleList(true)} icon={<ClusterOutlined />}>Select Family</Button>
              {form.getFieldValue('Code_fam') && <p>Selected Family: {form.getFieldValue('Code_fam')}</p>}
            </Form.Item>
            {/* Stock information */}
            <Form.Item label={<span><StockOutlined /> Maximum Stock</span>} name="STK_MAX">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><BoxPlotOutlined /> Minimum Stock</span>} name="STK_MIN">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><SafetyCertificateOutlined /> Security Stock</span>} name="STK_SEC">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><FundProjectionScreenOutlined /> Unit Volume per Case</span>} name="UVC">
              <Input type="number" />
            </Form.Item>
            <Form.Item label={<span><BoxPlotOutlined /> Stock Quantity</span>} name="qte_stk">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="VENTE_BLOQ" valuePropName="checked">
              <Checkbox><StockOutlined /> Sales Block</Checkbox>
            </Form.Item>
            <Form.Item name="ACHAT_BLOQ" valuePropName="checked">
              <Checkbox><StockOutlined /> Purchase Block</Checkbox>
            </Form.Item>
            <Form.Item name="TRANS_BLOQ" valuePropName="checked">
              <Checkbox><StockOutlined /> Transfer Block</Checkbox>
            </Form.Item>
            <Form.Item name="LIQUIDER" valuePropName="checked">
              <Checkbox><StockOutlined /> Liquidate</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {showFourList && <Modal title="Select Supplier" visible={showFourList} onCancel={() => setShowFourList(false)} footer={null}>
        <FourList onSelectFour={handleSelectFour} />
      </Modal>}
      {showFamilleList && <Modal title="Select Family" visible={showFamilleList} onCancel={() => setShowFamilleList(false)} footer={null}>
        <FamilleList onSelectFamille={handleSelectFamille} />
      </Modal>}
    </Card>
  );

};

export default ArticleForm;
