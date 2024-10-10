// In components/client/BulkUploadClients.js

import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useBulkUploadClients } from '../../hooks/clientHooks';

const BulkUploadClients = () => {
  const [file, setFile] = useState(null);
  const { handleBulkUpload, loading, error, uploadResult } = useBulkUploadClients();

  const handleUpload = async () => {
    if (!file) {
      message.error('Please select a file first!');
      return;
    }

    await handleBulkUpload(file);

    if (uploadResult) {
      message.success(`Upload successful. Created: ${uploadResult.created}, Updated: ${uploadResult.updated}`);
    }

    if (error) {
      message.error(`Upload failed: ${error}`);
    }
  };

  const props = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    file,
  };

  return (
    <div>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select Excel File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file}
        loading={loading}
        style={{ marginTop: 16 }}
      >
        {loading ? 'Uploading' : 'Start Upload'}
      </Button>
      {uploadResult && (
        <div style={{ marginTop: 16 }}>
          <p>Created: {uploadResult.created}</p>
          <p>Updated: {uploadResult.updated}</p>
          {uploadResult.errors.length > 0 && (
            <p>Errors: {uploadResult.errors.length}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BulkUploadClients;