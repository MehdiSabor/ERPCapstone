import React, { useState, useEffect } from 'react';
import { useUpdateItemInAvoir } from '../../hooks/avoirHooks'; // Adjust the import path as necessary

const UpdateItemInAvoirForm = ({ refAvoir, article, onSuccess }) => {
  const { updateItem, isUpdated } = useUpdateItemInAvoir();

  const [formData, setFormData] = useState(article || {});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    // When the article prop changes, update the formData state
    setFormData(article || {});
  }, [article]);
  
  useEffect(() => {
    if (submitAttempted && isUpdated) {
      console.log('Item updated successfully');
      if (onSuccess) {
        onSuccess(); // Call the onSuccess callback
      }
      setSubmitAttempted(false); // Reset submit attempt state
    }
  }, [isUpdated, onSuccess, submitAttempted]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let parsedValue = value;

    // Parse numbers differently based on the input name
    if (type === 'number') {
        parsedValue = ['QTE'].includes(name) ? parseInt(value, 10) : parseFloat(value);
        if (isNaN(parsedValue)) { // Fallback to 0 if parsing results in NaN
            parsedValue = 0;
        }
    } else if (type === 'checkbox') {
        parsedValue = checked;
    }

    setFormData(prevState => ({
        ...prevState,
        [name]: parsedValue
    }));
};


const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true); // Indicate that a submit has been attempted
    await updateItem(refAvoir, formData.CODE_ART, formData);
    // Move response handling to useEffect
  };

  // Early return if article is not provided
  if (!article) return <p>No article selected for update.</p>;

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(formData).map(key => (
        <div key={key} key={key}>
          <label>{key}:</label>
          <input
            type={['QTE', 'GRATUIT', 'PA_HT', 'PV_HT', 'PV_TTC', 'REMISE', 'REMISEG', 'TVA'].includes(key) ? 'number' : 'text'}
            name={key}
            value={typeof formData[key] === 'number' ? formData[key].toString() : formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit">Update Item</button>
    </form>
  );
};

export default UpdateItemInAvoirForm;
