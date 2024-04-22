import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { Menu, Dropdown, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

const NavigationBar = () => {
  const user = useSelector(state => state.user); // Access user from Redux state
  const isAuthenticated = !!user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isManager = user?.IsManager;
  const canAccess = permission => user && (user[permission] || isManager);


  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Dispatch logout action
    navigate('/login'); // Redirect to login page
  };

  const userDropdownMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#f8f8f8',
    borderBottom: '1px solid #eaeaea',
    boxShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
  };

  const navItemStyle = {
    margin: '0 10px',
    color: '#333',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const brandStyle = {
    ...navItemStyle,
    fontSize: '18px',
  };

  const userStyle = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  };

  const userIconStyle = {
    fontSize: '24px',
    marginRight: '5px',
    color: '#333',
  };

  return (
    <nav style={navStyle}>
      <div style={brandStyle}>Ihssan</div>
      <div>
      <Link to="/" style={navItemStyle}>Home</Link>
      {canAccess('CanManageClients') && <Link to="/client" style={navItemStyle}>Clients</Link>}
      {canAccess('CanManageArticles') && <Link to="/article" style={navItemStyle}>Articles</Link>}
      {canAccess('CanManageCommercials') && <Link to="/com" style={navItemStyle}>Commercials</Link>}
      {canAccess('CanManageFournisseurs') && <Link to="/four" style={navItemStyle}>Fournisseurs</Link>}
      {canAccess('CanManageQuote') && <Link to="/devis" style={navItemStyle}>Devis</Link>}
      {canAccess('CanManageDeliveryNote') && <Link to="/bonliv" style={navItemStyle}>Bon de Livraison</Link>}
      {canAccess('CanManageInvoice') && <Link to="/facture" style={navItemStyle}>Factures</Link>}
      {canAccess('CanManageReturns') && <Link to="/avoir" style={navItemStyle}>Avoirs</Link>}
      {canAccess('CanManagePayments') && <Link to="/reg" style={navItemStyle}>Règlements</Link>}
      {canAccess('CanManageArticles') && <Link to="/famille" style={navItemStyle}>Familles</Link>}
      {isManager && <Link to="/user" style={navItemStyle}>Accounts</Link>}
    </div>
      {isAuthenticated ? (
        <Dropdown overlay={userDropdownMenu} trigger={['click']}>
          <div style={userStyle}>
            <UserOutlined style={userIconStyle} />
            <Text>{user.Name}</Text> {/* Using Text from Ant Design for better typography */}
          </div>
        </Dropdown>
      ) : (
        <Link to="/login" style={navItemStyle}>Login</Link>
      )}
    </nav>
  );
};

export default NavigationBar;
