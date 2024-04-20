import React, { useState,useEffect } from 'react';
import { useCreateArticle } from '../../hooks/articleHooks';
import FourList from '../four/FourList';
import FamilleList from '../famille/ListFamilles';

const ArticleForm = () => {
  const { handleCreate } = useCreateArticle();
  const [showFourList, setShowFourList] = useState(false);
  const [showFamilleList, setShowFamilleList] = useState(false);
  
  const [PA_TTC, setPA_TTC] = useState(0);
  const [PV_TTC, setPV_TTC] = useState(0);

  const initialState = {
    code_art: '',
    nom: '',
    desc: '',
    photo: '',
    UAF: '',
    PA_HT: '',
    TVA: '',
    
    PV_HT: '',
    
    Code_fam: '',
    
    STK_MAX: '',
    STK_MIN: '',
    STK_SEC: '',
    UVC: '',
    REMISEMAX: '',
    REF_OEM: '',
    VENTE_BLOQ: false,
    ACHAT_BLOQ: false,
    TRANS_BLOQ: false,
    LIQUIDER: false,
    
    qte_stk: ''
  };

  const [articleData, setArticleData] = useState(initialState);

  const handleSelectFour = (code_frs) => {
    setArticleData({ ...articleData, code_frs });
    setShowFourList(false); // Close the ComList after selection
};
const handleSelectFamille = (Code_fam) => {
  setArticleData({ ...articleData, Code_fam });
  setShowFamilleList(false);
};

useEffect(() => {
  // Calculate PA_TTC and PV_TTC whenever PA_HT, PV_HT, or TVA changes
  if(articleData.PA_HT && articleData.TVA) {
    setPA_TTC(articleData.PA_HT * (1 + articleData.TVA / 100));
  }
  if(articleData.PV_HT && articleData.TVA) {
    setPV_TTC(articleData.PV_HT * (1 + articleData.TVA / 100));
  }
}, [articleData.PA_HT, articleData.PV_HT, articleData.TVA]); 


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For checkboxes
    if (type === 'checkbox') {
      setArticleData({ ...articleData, [name]: checked });
    } 
    // For number inputs, allow empty string to represent no input (null equivalent)
    else if (['PA_HT', 'TVA', 'PA_TTC', 'PV_HT', 'PV_TTC', 'STK_MAX', 'STK_MIN', 'qte_stk', 'UAF', 'REMISEMAX'].includes(name)) {
      setArticleData({ ...articleData, [name]: value === '' ? '' : parseFloat(value) });
    } 
    // For text and other inputs
    else {
      setArticleData({ ...articleData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...articleData,
      // Parse integers or set null for empty strings
      UAF: articleData.UAF !== '' ? parseInt(articleData.UAF, 10) : null,
      Code_fam: articleData.Code_fam !== '' ? parseInt(articleData.Code_fam, 10) : null,
      
      STK_MAX: articleData.STK_MAX !== '' ? parseInt(articleData.STK_MAX, 10) : null,
      STK_SEC: articleData.STK_SEC !== '' ? parseInt(articleData.STK_SEC, 10) : null,
      UVC: articleData.UVC !== '' ? parseInt(articleData.UVC, 10) : null,
      STK_MIN: articleData.STK_MIN !== '' ? parseInt(articleData.STK_MIN, 10) : null,
      qte_stk: articleData.qte_stk !== '' ? parseInt(articleData.qte_stk, 10) : null,
      // Floats or null for empty strings
      PA_HT: articleData.PA_HT !== '' ? parseFloat(articleData.PA_HT) : null,
      TVA: articleData.TVA !== '' ? parseFloat(articleData.TVA) : null,
      // Continue for other numerical fields as necessary
      // Directly assign booleans and strings, they don't need parsing
      PA_TTC, 
      PV_TTC
    };

    console.log(payload); // For debugging
    await handleCreate(payload);
     // Reset form after submission
  };

  return (
    <div>
      <h2>Create Article</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialState).map(key => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>
              {key.replace(/_/g, ' ')}:
              <input
                type={['PA_HT', 'TVA', 'PV_HT', 'STK_MAX', 'STK_MIN', 'qte_stk', 'UAF', 'REMISEMAX'].includes(key) ? "number" : key.includes('BLOQ') || key === 'LIQUIDER' ? "checkbox" : "text"}
                name={key}
                value={key.includes('BLOQ') || key === 'LIQUIDER' ? articleData[key] : articleData[key]}
                checked={key.includes('BLOQ') || key === 'LIQUIDER' ? articleData[key] : undefined}
                onChange={handleChange}
                placeholder={key.replace(/_/g, ' ')}
                // Adjust required fields as necessary based on your application's requirements
              />
             
            </label>
          </div>
        ))}
        <p>PA_TTC: {PA_TTC.toFixed(2)}</p>
        <p>PV_TTC: {PV_TTC.toFixed(2)}</p>
        <button type="button" onClick={() => setShowFourList(true)}>Select Fournisseur</button>
                    {articleData.code_frs && <p>Selected Fournisseur: {articleData.code_frs}</p>}
                
                    <button type="button" onClick={() => setShowFamilleList(true)}>Select Famille</button>
                    {articleData.Code_fam && <p>Selected Famille: {articleData.Code_fam}</p>}
        {showFamilleList && <FamilleList onSelectFamille={handleSelectFamille} />}
       
                {showFourList && <FourList  onSelectFour={handleSelectFour} />}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArticleForm;