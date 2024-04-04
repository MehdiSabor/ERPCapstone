import React from 'react';
import { useFetchAllComs } from '../../hooks/comHooks'; // Adjust the import path as necessary

const ComList = ({ onSelectCom }) => {
    const { Coms, loading, error } = useFetchAllComs();
    console.log(Coms);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
      <div>
        <h2>Commercials List</h2>
        <ul>
          {Coms.map((com) => (
            <li key={com.code_com} onClick={() => onSelectCom(com.code_com)}>
            {com.code_com}  {com.nom} - {com.tel} - {com.email}
            </li>
          ))}
        </ul>
      </div>
    );
};

export default ComList;
