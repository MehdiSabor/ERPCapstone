import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Image, Typography, Modal, Button, message } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchArticleById } from '../../hooks/articleHooks';
import ArticleDeleteButton from './ArticleDeleteButton';
import ArticleUpdateForm from './ArticleupdateForm';

const { Title, Text } = Typography;

const SingleArticle = ({ articleId, onChangeView }) => {
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const { article, loading, error, refetch } = useFetchArticleById(articleId);
    const { setSidebarButtons } = useSidebar();


    const handleUpdateSuccess = () => {
        message.success('Article updated successfully!');
        setIsUpdateModalVisible(false);
        refetch();  // Assuming `refetch` is a function from your hook that re-fetches article data
    };

    useEffect(() => {
        const articleButtons = [
            <Button key="update" type="primary" onClick={() => setIsUpdateModalVisible(true)}>Update Article</Button>,
            <Button key="delete" type="danger" onClick={() => setIsDeleteModalVisible(true)}>Delete Article</Button>
        ];

        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2),
            ...articleButtons
        ]);

        return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    }, [setSidebarButtons]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!article) return <p>No article found</p>;


    const formatDate = (date) => new Date(date).toLocaleDateString();
    const placeholderImage = "https://via.placeholder.com/150";


    return (
        <div style={{ background: '#ececec',  }}>
            
                    <Row gutter={16}>
                {/* Card 1 */}
                <Col span={24}>
                    <Card title="General Information">
                        
                {/* Card 1 */}
                <Row gutter={16} align="middle">
    <Col span={6}>
        <Image
            width={150}
            src={article.photo || placeholderImage}
            fallback={placeholderImage}
            alt="Article"
        />
    </Col>
    <Col span={18}>
        <Row gutter={16}>
            <Col span={12}> {/* Middle column */}
                <Text strong>ID:</Text> {article.id}<br/>
                <Text strong>Code Art:</Text> {article.code_art}<br/>
                <Text strong>Code Fam:</Text> {article.Code_fam || "None"}<br/>
                <Text strong>Name:</Text> {article.nom}<br/>
            </Col>
            <Col span={12}> {/* Right column */}
                <Text strong>Description:</Text> {article.desc}<br/>
                <Text strong>UAF:</Text> {article.UAF}<br/>
                <Text strong>Ref OEM:</Text> {article.REF_OEM}<br/>
                <Text strong>Code Frs:</Text> {article.code_frs}<br/>
            </Col>
        </Row>
    </Col>
</Row>
                    </Card>
                </Col>

                {/* Card 2 */}
                <Col span={24}>
                    <Card title="Pricing Details">
                        <Row gutter={16}>
                            <Col span={12}>PA HT: {article.PA_HT}</Col>
                            <Col span={12}>TVA: {article.TVA}</Col>
                            <Col span={12}>PA TTC: {article.PA_TTC}</Col>
                            <Col span={12}>PV HT: {article.PV_HT}</Col>
                            <Col span={12}>PV TTC: {article.PV_TTC}</Col>
                            <Col span={12}>Max Discount: {article.REMISEMAX}</Col>
                        </Row>
                    </Card>
                </Col>

                {/* Card 3 */}
                <Col span={24}>
                    <Card title="Stock Details">
                        <Row gutter={16}>
                            <Col span={12}>Max Stock: {article.STK_MAX}</Col>
                            <Col span={12}>Min Stock: {article.STK_MIN}</Col>
                            <Col span={12}>Sec Stock: {article.STK_SEC}</Col>
                            <Col span={12}>UVC: {article.UVC}</Col>
                            <Col span={12}>Stock Quantity: {article.qte_stk}</Col>
                        </Row>
                    </Card>
                </Col>

                {/* Card 4 */}
                <Col span={24}>
                    <Card title="Status and Dates">
                        <Row gutter={16}>
                            <Col span={12}>Sales Block: {article.VENTE_BLOQ ? "Yes" : "No"}</Col>
                            <Col span={12}>Purchase Block: {article.ACHAT_BLOQ ? "Yes" : "No"}</Col>
                            <Col span={12}>Transfer Block: {article.TRANS_BLOQ ? "Yes" : "No"}</Col>
                            <Col span={12}>Liquidate: {article.LIQUIDER ? "Yes" : "No"}</Col>
                            <Col span={12}>Created At: {formatDate(article.createdAt)}</Col>
                            <Col span={12}>Updated At: {formatDate(article.updatedAt)}</Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
                   
                {/* Additional cards omitted for brevity */}

                <Modal
                    title="Update Article"
                    visible={isUpdateModalVisible}
                    footer={null}
                    onCancel={() => setIsUpdateModalVisible(false)}
                    width={800}
                >
                    <ArticleUpdateForm articleId={articleId} onFinishedUpdate={handleUpdateSuccess} />
                </Modal>

                <Modal
                    title="Delete Article"
                    visible={isDeleteModalVisible}
                    footer={null}
                    onCancel={() => setIsDeleteModalVisible(false)}
                >
                    <ArticleDeleteButton articleId={articleId} onSuccess={() => {
                        setIsDeleteModalVisible(false);
                        onChangeView('list');
                    }} />
                </Modal>
           
        </div>
    );
};

export default SingleArticle;
