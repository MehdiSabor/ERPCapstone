import React, { useState } from 'react';
import { useAddItemToDevis } from '../../hooks/devisHooks'; // Adjust the import path as necessary
import ArticleList from '../article/ArticleList';

const AddItemToDevisForm = ({ refDevis }) => {
  const { addItem } = useAddItemToDevis();
  const [showItemList,setShowItemList] = useState(false);

  const initialState = {
    REF_DEV: refDevis, // This value is preset and should not change
    CODE_ART: '',
    ARTICLE: '',
    QTE: 0,
    GRATUIT: 0,
    PA_HT: 0,
    PV_HT: 0,
    PV_TTC: 0,
    REMISE: 0,
    
    TVA: 0,
   
  };

  const [itemData, setItemData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setItemData(prevData => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSelectArticle = (article) => {
    console.log(article);
    setItemData({ ...itemData, CODE_ART: article.code_art,
    ARTICLE: article.nom,
   
    
    PA_HT: article.PA_HT,
    PV_HT: article.PV_HT,
    PV_TTC: article.PV_TTC,
    
    
    TVA: article.TVA,
   });
    setShowItemList(false); // Close the ComList after selection
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(refDevis, itemData);
    // Optionally reset the form or provide feedback here
    setItemData(initialState);
  };

  return (
    <div>
      <h2>Add Item to Devis</h2>
      <form onSubmit={handleSubmit}>

      <button type="button" onClick={() => setShowItemList(true)}>Select Article</button>
                    {itemData.code_art && <p>Selected Article: {itemData.code_art}</p>}
                
                {showItemList && <ArticleList  onSelectArticle={handleSelectArticle} />}

        {/* Skip REF_DEV as it is already set */}
        {Object.keys(initialState).filter(key => key !== 'REF_DEV').map(key => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type={key.includes('QTE') || key.includes('GRATUIT')|| key.includes('PA_HT') || key.includes('PV_HT') || key.includes('PV_TTC') || key.includes('REMISE') || key === 'TVA' ? "number" : "text"}
              name={key}
              value={itemData[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </div>
        ))}
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemToDevisForm;
