import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './Pages/home';

import ClientManagementPage from './Pages/client';
import ArticleManagementPage from './Pages/article';
import ComManagementPage from './Pages/com';
import FourManagementPage from './Pages/four';
import DevisManagementPage from './Pages/devis';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/client" element={<ClientManagementPage />} />
            <Route path="/com" element={<ComManagementPage />} />
            <Route path="/four" element={<FourManagementPage />} />
            <Route path="/article" element={<ArticleManagementPage />} />
            <Route path="/devis" element={<DevisManagementPage />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
