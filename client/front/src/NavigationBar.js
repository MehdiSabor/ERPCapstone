// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
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
  <Link to="/client" style={navItemStyle}>Clients</Link>
  <Link to="/article" style={navItemStyle}>Articles</Link>
  <Link to="/com" style={navItemStyle}>Commercials</Link>
  <Link to="/four" style={navItemStyle}>Fournisseurs</Link>
  <Link to="/devis" style={navItemStyle}>Devis</Link>
  <Link to="/bonliv" style={navItemStyle}>Bon de Livraison</Link>
  <Link to="/facture" style={navItemStyle}>Factures</Link>
  <Link to="/avoir" style={navItemStyle}>Avoirs</Link>
  <Link to="/reg" style={navItemStyle}>Règlements</Link>
  <Link to="/famille" style={navItemStyle}>Familles</Link>
</div>

      <div style={userStyle}>
        <span style={userIconStyle}>M</span>
        <span>Mary Jane</span>
      </div>
    </nav>
  );
};

export default NavigationBar;
