import React from 'react';
import { useFetchComById } from '../../hooks/comHooks'; // Adjust the import path as necessary

const SingleCom = ({ comId, onChangeView }) => {
    const { Com, loading, error } = useFetchComById(comId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!Com) return <p>No comercial found</p>;

    return (
      <div>
        <h3>Comercial Details</h3>
        <ul>
          {Object.entries(Com).map(([key, value]) => (
            // Assuming no complex relational fields to exclude for simplification
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
        <button onClick={() => onChangeView('update', comId)}>Update Comercial</button>
        <button onClick={() => onChangeView('delete', comId)}>Delete Comercial</button>
      </div>
    );
};

export default SingleCom;
