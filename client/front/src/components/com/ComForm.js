import React, { useState } from 'react';
import { useCreateCom } from '../../hooks/comHooks'; // Adjust the import path as necessary

const ComForm = () => {
  const { handleCreate } = useCreateCom();
  const initialState = {
    code_com: 0,
    nom: '',
    tel: '',
    email: ''
  };

  const [comData, setComData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Since all the fields in ComForm are either text or number, no need for the checkbox logic here
    setComData({
      ...comData,
      [name]: type === 'number' ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...comData,
      // Ensure any specific data transformations if needed
    };
    await handleCreate(payload);
    // Reset form or provide feedback here
    setComData(initialState);
  };

  return (
    <div>
      <h2>Create Comercial</h2>
      <form onSubmit={handleSubmit}>
        {/* Iterate over each field defined in the initialState for input generation */}
        {Object.keys(initialState).map(key => (
          <div key={key}>
            <label>{key}: </label>
            <input
              type={key === "code_com" ? "number" : "text"}
              name={key}
              value={comData[key]}
              onChange={handleChange}
              placeholder={key}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ComForm;
