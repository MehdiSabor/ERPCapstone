import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, Modal, Card, Upload, Checkbox } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCreateArticle } from '../../hooks/articleHooks';
import FourList from '../four/FourList';
import FamilleList from '../famille/ListFamilles';
import axios from 'axios';

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
    await handleUpload();
    console.log('Submitting:', payload); // For debugging
    await handleCreate(payload);
   
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
    const formData = new FormData();
    formData.append("file", fileList[0].originFileObj);
    formData.append("upload_preset", "uozkyhrp"); // Replace with your upload preset name
    formData.append("cloud_name", "dggqqwrib"); // Replace with your Cloudinary cloud name

    try {
      const response = await instance.post("https://api.cloudinary.com/v1_1/dggqqwrib/image/upload", formData); // Replace YOUR_CLOUD_NAME
      const data = response.data;
      
      
      const imageUrl = data.secure_url;
      // Here you can send `imageUrl` to your backend to be saved in the DB
      console.log(imageUrl);
     return imageUrl;
      
    } catch (error) {
      console.error('Error uploading file:', error);
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

  return (
    <Card title="Create Article" bordered={false} style={{ width: '100%' }}>
      <Form form={form} layout="vertical" onFinish={handleSubmit} onValuesChange={handleValueChange}>
        <Row gutter={16}>
          <Col span={12}>
            {/* Basic article information */}
            <Form.Item label="Article Code" name="code_art" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Name" name="nom" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="desc">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Upload Image" name="photo">
            <Upload
                beforeUpload={() => false}
                listType="picture"
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Unit of Account" name="UAF">
              <Input />
            </Form.Item>
            <Form.Item label="Purchase Price (HT)" name="PA_HT">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="VAT Rate (%)" name="TVA">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Selling Price (HT)" name="PV_HT">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Purchase Price Incl. VAT" name="PA_TTC">
              <Input prefix="€" readOnly />
            </Form.Item>
            <Form.Item label="Selling Price Incl. VAT" name="PV_TTC">
              <Input prefix="€" readOnly />
            </Form.Item>
            <Form.Item label="Maximum Discount (%)" name="REMISEMAX">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="OEM Reference" name="REF_OEM">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            {/* Supplier and family selection */}
            <Form.Item label="Supplier Code" name="code_frs">
              <Button type="link" onClick={() => setShowFourList(true)}>Select Supplier</Button>
              {form.getFieldValue('code_frs') && <p>Selected Supplier: {form.getFieldValue('code_frs')}</p>}
            </Form.Item>
            <Form.Item label="Family Code" name="Code_fam">
              <Button type="link" onClick={() => setShowFamilleList(true)}>Select Family</Button>
              {form.getFieldValue('Code_fam') && <p>Selected Family: {form.getFieldValue('Code_fam')}</p>}
            </Form.Item>
            {/* Stock information */}
            <Form.Item label="Maximum Stock" name="STK_MAX">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Minimum Stock" name="STK_MIN">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Security Stock" name="STK_SEC">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Unit Volume per Case" name="UVC">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Stock Quantity" name="qte_stk">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="VENTE_BLOQ" valuePropName="checked">
              <Checkbox>Sales Block</Checkbox>
            </Form.Item>
            <Form.Item name="ACHAT_BLOQ" valuePropName="checked">
              <Checkbox>Purchase Block</Checkbox>
            </Form.Item>
            <Form.Item name="TRANS_BLOQ" valuePropName="checked">
              <Checkbox>Transfer Block</Checkbox>
            </Form.Item>
            <Form.Item name="LIQUIDER" valuePropName="checked">
              <Checkbox>Liquidate</Checkbox>
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
