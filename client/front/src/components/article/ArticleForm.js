import React, { useState } from 'react';
import { useCreateArticle } from '../../hooks/articleHooks';

const ArticleForm = () => {
  const { handleCreate } = useCreateArticle();
  const initialState = {
    code_art: '',
    nom: '',
    desc: '',
    photo: '',
    UAF: '',
    PA_HT: '',
    TVA: '',
    PA_TTC: '',
    PV_HT: '',
    PV_TTC: '',
    Code_fam: '',
    code_sfam: '',
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
    code_frs: '',
    qte_stk: ''
  };

  const [articleData, setArticleData] = useState(initialState);

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
      code_sfam: articleData.code_sfam !== '' ? parseInt(articleData.code_sfam, 10) : null,
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
                type={['PA_HT', 'TVA', 'PA_TTC', 'PV_HT', 'PV_TTC', 'STK_MAX', 'STK_MIN', 'qte_stk', 'UAF', 'REMISEMAX'].includes(key) ? "number" : key.includes('BLOQ') || key === 'LIQUIDER' ? "checkbox" : "text"}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ArticleForm;
