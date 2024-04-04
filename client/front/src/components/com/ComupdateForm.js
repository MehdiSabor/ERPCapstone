import React, { useState, useEffect } from 'react';
import { useUpdateCom, useFetchComById } from '../../hooks/comHooks'; // Adjust the import path as necessary

const ComUpdateForm = ({ comId }) => {
  const { Com, loading: fetching } = useFetchComById(comId);
  const { handleUpdate, isUpdated } = useUpdateCom();

  // Reflecting Comercial's fields based on your schema
  const initialState = {
    code_com: 0,
    nom: '',
    tel: '',
    email: ''
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (Com) {
      // Populate form data with the Comercial's current data
      setFormData({ ...initialState, ...Com });
    }
  }, [Com]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleUpdate(comId, formData);
    if (isUpdated) {
      // Handle successful update (e.g., show a message or redirect)
    }
  };

  if (fetching) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit}>
      {/* Iterate over formData to generate input fields */}
      {Object.keys(formData).map(key => (
        <div key={key}>
          <label>{key}: </label>
          <input
            type={key === "code_com" ? "number" : "text"}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={key}
          />
        </div>
      ))}
      <button type="submit">Update Comercial</button>
    </form>
  );
};

export default ComUpdateForm;
