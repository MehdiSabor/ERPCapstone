import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import Redux hooks
import { ConfigProvider } from 'antd';
// Import all necessary components and pages
import Home from './Pages/home';
import ClientManagementPage from './Pages/client';
import ArticleManagementPage from './Pages/article';
import ComManagementPage from './Pages/com';
import FourManagementPage from './Pages/four';
import DevisManagementPage from './Pages/devis';
import BonlivManagementPage from './Pages/bonliv';
import FactureManagementPage from './Pages/facture';
import AvoirManagementPage from './Pages/avoir';
import RegManagementPage from './Pages/reg';
import FamilleManagementPage from './Pages/famille';
import UserManagementPage from './Pages/user';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import { SidebarProvider } from './SidebarContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import DashboardPage from './Pages/dashboard';

function App() {
  const user = useSelector(state => state.user); // Use Redux state to get user and permissions
  const isAuthenticated = !!user;

  const checkPermission = (permission) => user?.[permission] || user?.IsManager;

  // Wrap permission checks and redirect if needed
  const PermissionRoute = ({ permission, children }) => (
    isAuthenticated && checkPermission(permission) ? children : <Navigate to="/login" replace />
  );

  // Style objects for the application layout
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const bodyStyle = {
    display: 'flex',
    flex: 1,
  };

  const contentStyle = {
    flexGrow: 1,
    overflow: 'auto',
    background: '#f0f0f0',
    padding: '20px',
  };

  return (
    <BrowserRouter>
    <ConfigProvider
  theme={{
    token: {
      fontFamily: "'Poppins', sans-serif",
      fontFamilyCode: "'Poppins', monospace",
      colorPrimary: '#0047AB',  // Blue color set as primary
    }
  }}
>
      <SidebarProvider>
        <div className="App" style={appStyle}>
          <NavigationBar />
          <div className="App-body" style={bodyStyle}>
            <Sidebar />
            <main className="App-content" style={contentStyle}>
              <Routes>
                {/* Redirect users trying to access login/register when they are already authenticated */}
                <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
                
                <Route element={isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}>
                <Route path="/" element={<Home />} />
                  <Route path="/user" element={<PermissionRoute permission="IsManager"><UserManagementPage /></PermissionRoute>} />
                  <Route path="/dashboard" element={<PermissionRoute permission="IsManager"><DashboardPage /></PermissionRoute>} />
                  <Route path="/client" element={<PermissionRoute permission="CanManageClients"><ClientManagementPage /></PermissionRoute>} />
                  <Route path="/article" element={<PermissionRoute permission="CanManageArticles"><ArticleManagementPage /></PermissionRoute>} />
                  <Route path="/com" element={<PermissionRoute permission="CanManageCommercials"><ComManagementPage /></PermissionRoute>} />
                  <Route path="/four" element={<PermissionRoute permission="CanManageFournisseurs"><FourManagementPage /></PermissionRoute>} />
                  <Route path="/devis" element={<PermissionRoute permission="CanManageQuote"><DevisManagementPage /></PermissionRoute>} />
                  <Route path="/bonliv" element={<PermissionRoute permission="CanManageDeliveryNote"><BonlivManagementPage /></PermissionRoute>} />
                  <Route path="/facture" element={<PermissionRoute permission="CanManageInvoice"><FactureManagementPage /></PermissionRoute>} />
                  <Route path="/avoir" element={<PermissionRoute permission="CanManageReturns"><AvoirManagementPage /></PermissionRoute>} />
                  <Route path="/reg" element={<PermissionRoute permission="CanManagePayments"><RegManagementPage /></PermissionRoute>} />
                  <Route path="/famille" element={<PermissionRoute permission="CanManageArticles"><FamilleManagementPage /></PermissionRoute>} />
                </Route>
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
