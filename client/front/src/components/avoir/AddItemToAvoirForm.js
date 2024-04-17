import React, { useState } from 'react';
import { useAddItemToAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary
import ArticleList from '../article/ArticleList';

const AddItemToAvoirForm = ({ refAvoir }) => {
  const { addItem } = useAddItemToAvoir();
  const [showItemList, setShowItemList] = useState(false);

  const initialState = {
    REF_AVR: refAvoir, // This value is preset and should not change
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
    setItemData({ ...itemData, 
      CODE_ART: article.code_art,
      ARTICLE: article.nom,
      PA_HT: article.PA_HT,
      PV_HT: article.PV_HT,
      PV_TTC: article.PV_TTC,
      TVA: article.TVA,
    });
    setShowItemList(false); // Close the ArticleList after selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(refAvoir, itemData);
    setItemData(initialState); // Reset form after submission
  };

  return (
    <div>
      <h2>Add Item to Avoir</h2>
      <form onSubmit={handleSubmit}>
        <button type="button" onClick={() => setShowItemList(true)}>Select Article</button>
        {itemData.CODE_ART && <p>Selected Article: {itemData.ARTICLE}</p>}
        {showItemList && <ArticleList onSelectArticle={handleSelectArticle} />}
        {Object.keys(initialState).filter(key => key !== 'REF_AVR').map(key => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type={key.includes('QTE') || key.includes('GRATUIT') || key.includes('PA_HT') || key.includes('PV_HT') || key.includes('PV_TTC') || key.includes('REMISE') || key === 'TVA' ? "number" : "text"}
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

export default AddItemToAvoirForm;
