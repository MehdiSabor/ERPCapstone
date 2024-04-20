import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/home';

import ClientManagementPage from './Pages/client';
import ArticleManagementPage from './Pages/article';
import ComManagementPage from './Pages/com';
import FourManagementPage from './Pages/four';
import DevisManagementPage from './Pages/devis';
import BonlivManagementPage from './Pages/bonliv';
import  FactureManagementPage from './Pages/facture';
import AvoirManagementPage from './Pages/avoir';
import RegManagementPage from './Pages/reg';
import FamilleManagementPage from './Pages/famille';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import {SidebarProvider} from './SidebarContext';

function App() {
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
   <SidebarProvider>
   <div className="App" style={appStyle}>
        <NavigationBar />
        <div className="App-body" style={bodyStyle}>
          <Sidebar />
          <main className="App-content" style={contentStyle}>
            <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/client" element={<ClientManagementPage />} />
            <Route path="/com" element={<ComManagementPage />} />
            <Route path="/four" element={<FourManagementPage />} />
            <Route path="/article" element={<ArticleManagementPage />} />
            <Route path="/devis" element={<DevisManagementPage />} />
            <Route path="/bonliv" element={<BonlivManagementPage />} />
            <Route path="/facture" element={<FactureManagementPage />} />
            <Route path="/avoir" element={<AvoirManagementPage />} />
         <Route path="/reg" element={<RegManagementPage/>} />
         <Route path="/famille" element={<FamilleManagementPage />} />
         </Routes>
          </main>
        </div>
      </div>
      </SidebarProvider>
    </BrowserRouter>
  );
}



export default App;

