import React from 'react';
import { useFetchFourById } from '../../hooks/fourHooks'; // Adjust the import path as necessary

const SingleFour = ({ fourId, onChangeView }) => {
    const { Four, loading, error } = useFetchFourById(fourId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!Four) return <p>No fourercial found</p>;

    return (
      <div>
        <h3>Fournisseur Details</h3>
        <ul>
        
          {Object.entries(Four).map(([key, value]) => (
            // Assuming no fourplex relational fields to exclude for simplification
            <li key={key}>{`${key}: ${value}`}</li>
          ))}
        </ul>
        <button onClick={() => onChangeView('update', fourId)}>Update Fournisseur</button>
        <button onClick={() => onChangeView('delete', fourId)}>Delete Fournisseur</button>
      </div>
    );
};

export default SingleFour;
