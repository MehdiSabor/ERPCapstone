import React from 'react';
import { useFetchAllFours } from '../../hooks/fourHooks'; // Adjust the import path as necessary

const FourList = ({ onSelectFour }) => {
    const { Fours, loading, error } = useFetchAllFours();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h2>Fournisseurs List</h2>
        <ul>
          {Fours.map((four) => (
            <li key={four.code_frs} onClick={() => onSelectFour(four.code_frs)}>
            {four.id} {four.code_frs} - {four.sociale} - {four.desc}- {four.bloquer}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default FourList;
