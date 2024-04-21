import React, { useEffect } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { useSidebar } from '../../SidebarContext';
import { useFetchClientById } from '../../hooks/clientHooks';

const SingleClient = ({ clientId, onChangeView }) => {
    const { client, loading, error } = useFetchClientById(clientId);
    const { setSidebarButtons } = useSidebar();

    useEffect(() => {
      // Define SingleClient specific buttons
      const clientButtons = [
          <Button key="update" onClick={() => onChangeView('update', clientId)}>Update Client</Button>,
          <Button key="delete" onClick={() => onChangeView('delete', clientId)}>Delete Client</Button>
      ];

      // Set the buttons for this client view
      setSidebarButtons(prevButtons => [
          ...prevButtons.slice(0, 2), // Assume first two are base buttons, adjust slice as necessary
          ...clientButtons
      ]);

      // Clean up by removing only the client-specific buttons on unmount
      return () => {
          setSidebarButtons(prevButtons => prevButtons.slice(0, 2));
      };
  }, [setSidebarButtons, onChangeView, clientId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!client) return <p>No client found</p>;

    const formatDate = (date) => date ? new Date(date).toLocaleDateString() : 'Not provided';

    return (
        
            <Row gutter={16}>
                {/* Card 1 */}
                <Col span={24}>
                    <Card title="Client Information">
                        <Row gutter={16}>
                            <Col span={12}>Code Clt: {client.code_clt}</Col>
                            <Col span={12}>Name: {client.nom}</Col>
                            <Col span={12}>Account: {client.compte}</Col>
                            <Col span={12}>Phone: {client.tel}</Col>
                            <Col span={12}>Address: {client.adresse}</Col>
                            <Col span={12}>City: {client.ville}</Col>
                            <Col span={12}>Note: {client.note}</Col>
                        </Row>
                    </Card>
                </Col>

                {/* Card 2 */}
                <Col span={24}>
                    <Card title="Financial Information">
                        <Row gutter={16}>
                            <Col span={12}>Due: {client.echeance}</Col>
                            <Col span={12}>Payment Mode: {client.mode_paie}</Col>
                            <Col span={12}>General Discount: {client.REMISE_G}</Col>
                            <Col span={12}>Blocked: {client.bloquer}</Col>
                            <Col span={12}>Ceiling: {client.plafond}</Col>
                            <Col span={12}>Salesperson Code: {client.code_com}</Col>
                            <Col span={12}>Balance: {client.SOLDE}</Col>
                        </Row>
                    </Card>
                </Col>

                {/* Card 3 */}
                <Col span={24}>
                    <Card title="Additional Information">
                        <Row gutter={16}>
                            <Col span={12}>Payment Conditions: {client.cond_paie || 'N/A'}</Col>
                            <Col span={12}>Delivery Mode: {client.mode_liv || 'N/A'}</Col>
                            <Col span={12}>Category Code: {client.code_cat || 'N/A'}</Col>
                            <Col span={12}>Created At: {formatDate(client.createdAt)}</Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        
    );
};

export default SingleClient;
