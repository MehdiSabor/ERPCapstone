import React, { useState, useEffect } from 'react';
import { useUpdateArticle, useFetchArticleById } from '../../hooks/articleHooks';

const ArticleUpdateForm = ({ articleId }) => {
  const { article, loading: fetching } = useFetchArticleById(articleId);
  const { handleUpdate, isUpdated } = useUpdateArticle();

  // Adjusted initialState to match the Article model
  const initialState = {
    code_art: '',
    nom: '',
    desc: '',
    photo: '',
    UAF: 0,
    PA_HT: 0.0,
    TVA: 0.0,
    PA_TTC: 0.0,
    PV_HT: 0.0,
    PV_TTC: 0.0,
    Code_fam: 0,
    code_sfam: 0,
    STK_MAX: 0,
    STK_MIN: 0,
    STK_SEC: 0,
    UVC: 0,
    REMISEMAX: 0.0,
    REF_OEM: '',
    VENTE_BLOQ: false,
    ACHAT_BLOQ: false,
    TRANS_BLOQ: false,
    LIQUIDER: false,
    code_frs: '',
    qte_stk: 0
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (article) {
      // Ensure boolean fields are correctly interpreted
      const updatedArticleData = {
        ...article,
        VENTE_BLOQ: article.VENTE_BLOQ === true,
        ACHAT_BLOQ: article.ACHAT_BLOQ === true,
        TRANS_BLOQ: article.TRANS_BLOQ === true,
        LIQUIDER: article.LIQUIDER === true
      };
      setFormData({ ...initialState, ...updatedArticleData });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(articleId, formData);
    if (isUpdated) {
      // Handle successful update here
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(initialState).map(key => (
        <div key={key}>
          <label>{key.replace(/_/g, ' ')}:</label>
          <input
            type={['PA_HT', 'TVA', 'PA_TTC', 'PV_HT', 'PV_TTC', 'STK_MAX', 'STK_MIN', 'STK_SEC', 'UVC', 'REMISEMAX', 'qte_stk', 'Code_fam', 'code_sfam'].includes(key) ? "number" : key.includes('BLOQ') || key === 'LIQUIDER' ? "checkbox" : "text"}
            name={key}
            value={key.includes('BLOQ') || key === 'LIQUIDER' ? undefined : formData[key]}
            checked={key.includes('BLOQ') || key === 'LIQUIDER' ? formData[key] : undefined}
            onChange={handleChange}
            placeholder={key.replace(/_/g, ' ')}
          />
        </div>
      ))}
      <button type="submit">Update Article</button>
    </form>
  );
};

export default ArticleUpdateForm;
