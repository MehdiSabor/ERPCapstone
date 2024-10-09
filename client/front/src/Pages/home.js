import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Modal, Button, message, Tabs } from "antd";
import { useSidebar } from "../SidebarContext";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Placeholder icons - you'll need to import the correct icons you want to use
import {
  UserOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  BoxPlotOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  FileExcelOutlined,
  DollarOutlined ,
  TeamOutlined,
  RetweetOutlined ,
  DashboardOutlined 
} from '@ant-design/icons';


const Home = () => {
  const user = useSelector(state => state.user); // Access user from Redux state
  const isManager = user?.IsManager;
  const canAccess = permission => isManager || (user && user[permission]);

  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const userButtons = [
      
     ];

     setSidebarButtons([
      // Adjust slice as necessary
       ...userButtons
     ]);

    return () => {
      setSidebarButtons([
        // Adjust slice as necessary
         ...userButtons
       ]);
    };
  }, [setSidebarButtons, user]);

  const categories = [
    { title: 'Clients', permission: 'CanManageClients', link: '/client', icon: <UserOutlined /> },
    { title: 'Articles', permission: 'CanManageArticles', link: '/article', icon: <ShoppingCartOutlined /> },
    { title: 'Commercials', permission: 'CanManageCommercials', link: '/com', icon: <BankOutlined /> },
    { title: 'Fournisseurs', permission: 'CanManageFournisseurs', link: '/four', icon: <BoxPlotOutlined /> },
    { title: 'Devis', permission: 'CanManageQuote', link: '/devis', icon: <FileTextOutlined /> },
    { title: 'Bon de Livraison', permission: 'CanManageDeliveryNote', link: '/bonliv', icon: <FileDoneOutlined /> },
    { title: 'Factures', permission: 'CanManageInvoice', link: '/facture', icon: <FileExcelOutlined /> },
    { title: 'Avoirs', permission: 'CanManageReturns', link: '/avoir', icon: <RetweetOutlined />  },
    { title: 'Règlements', permission: 'CanManagePayments', link: '/reg', icon: <DollarOutlined />  },
    // Since isManager has all permissions, no specific permission is required for the 'Familles' and 'Accounts' categories
    { title: 'Familles', permission: 'CanManageArticles', link: '/famille', icon: <TeamOutlined /> },
    { title: 'Accounts', permission: 'IsManager', link: '/user', icon: <TeamOutlined /> },
    { title: 'Dashboard', permission: 'IsManager', link: '/dashboard', icon: <DashboardOutlined /> }
  ];

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '150px',
  };
  const iconContainerStyle = {
    display: 'flex', // Ensures flex properties apply to children, which is the icon here
    alignItems: 'center', // Center align items vertically in the container
    justifyContent: 'center', // Center align items horizontally in the container
    width: '100%', // Takes full width of the card to center content properly
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>MY APPS</h2>
      <Row gutter={[16, 16]} justify="center">
        {categories.map(cat => canAccess(cat.permission) && (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={cat.title}>
            <Link to={cat.link}>
              <Card hoverable style={cardStyle}>
              <div style={iconContainerStyle}>
                {React.cloneElement(cat.icon, { style: { fontSize: '32px' } })} 
                </div>
                <Card.Meta title={cat.title} style={{ textAlign: 'center', marginTop: '12px' }} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;