import React from 'react';
import { useFetchAllArticles } from '../../hooks/articleHooks';
const ArticleList = ({ onSelectArticle }) => {
    const { articles, loading, error } = useFetchAllArticles();
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
  
    return (
      <div>
        <h2>Articles List</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id} onClick={() => onSelectArticle(article.id)}>
            {article.code_clt} {article.nom} - {article.ville}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default ArticleList;
