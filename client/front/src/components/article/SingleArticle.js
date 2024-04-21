import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchArticleById } from '../../hooks/articleHooks';

const SingleArticle = ({ articleId, onChangeView }) => {
    const { article, loading, error } = useFetchArticleById(articleId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
        const articleButtons = [
            <button key="update" onClick={() => onChangeView('update', articleId)}>Update Article</button>,
            <button key="delete" onClick={() => onChangeView('delete', articleId)}>Delete Article</button>
        ];

        setSidebarButtons(prevButtons => [
            ...prevButtons.slice(0, 2),
            ...articleButtons
        ]);

        return () => setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
    }, [setSidebarButtons, onChangeView, articleId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!article) return <p>No article found</p>;

    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
        <div style={{ background: '#ececec', padding: '30px' }}>
            <Row gutter={16}>
                {/* Card 1 */}
                <Col span={24}>
                    <Card title="General Information">
                        <Row gutter={16}>
                            <Col span={12}>ID: {article.id}</Col>
                            <Col span={12}>Code Art: {article.code_art}</Col>
                            <Col span={12}>Code Fam: {article.Code_fam || "None"}</Col>
                            <Col span={12}>Name: {article.nom}</Col>
                            <Col span={12}>Description: {article.desc}</Col>
                            <Col span={12}>Photo: {article.photo}</Col>
                            <Col span={12}>UAF: {article.UAF}</Col>
                            <Col span={12}>Ref OEM: {article.REF_OEM}</Col>
                            <Col span={12}>Code Frs: {article.code_frs}</Col>
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
        </div>
    );
};

export default SingleArticle;
