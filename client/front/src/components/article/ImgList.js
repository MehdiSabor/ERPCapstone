import React, { useState, useEffect } from 'react';
import { List, Card, message } from 'antd';

const ImgList = ({ onSelectImg }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    setImages([
      { id: 1, url: 'https://example.com/image1.jpg', title: 'Image 1' },
      { id: 2, url: 'https://example.com/image2.jpg', title: 'Image 2' },
      { id: 3, url: 'https://example.com/image3.jpg', title: 'Image 3' },
      // Add more images as needed
    ]);
  }, []);

  const handleSelect = (id) => {
    onSelectImg(id);
    message.success('Image selected successfully!');
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 6,
        xxl: 3,
      }}
      dataSource={images}
      renderItem={item => (
        <List.Item>
          <Card
            hoverable
            cover={<img alt={`Cover for ${item.title}`} src={item.url} />}
            onClick={() => handleSelect(item.id)}
          >
            {item.title}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ImgList;
