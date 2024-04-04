import React from 'react';
import { useFetchArticleById } from '../../hooks/articleHooks';

const SingleArticle = ({ articleId, onChangeView }) => {
    const { article, loading, error } = useFetchArticleById(articleId);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!article) return <p>No article found</p>;

    // Function to format the value based on its type for better readability
    const formatValue = (key, value) => {
      if (key === 'bloquer') return value ? 'Yes' : 'No';
      if (key === 'createdAt') return new Date(value).toLocaleDateString();
      return value;
    };

    return (
      <div>
        <h3>Article Details</h3>
        <ul>
          {Object.entries(article).map(([key, value]) => (
            // Exclude relational or complex fields from direct rendering
            !['devis', 'bonliv', 'facture', 'avoirs', 'reglements', 'UnifiedFactureAvoir', 'comercial'].includes(key) && (
              <li key={key}>{`${key}: ${formatValue(key, value)}`}</li>
            )
          ))}
        </ul>
        <button onClick={() => onChangeView('update', articleId)}>Update Article</button>
        <button onClick={() => onChangeView('delete', articleId)}>Delete Article</button>
      </div>
    );
};

export default SingleArticle;
