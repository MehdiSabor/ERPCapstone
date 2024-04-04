import React from 'react';
import { useDeleteArticle } from '../../hooks/articleHooks';

const ArticleDeleteButton = ({ articleId, onSuccess }) => {
  const { handleDelete } = useDeleteArticle();

  const handleClick = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      await handleDelete(articleId);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  };

  return (
    <button onClick={handleClick}>Delete Article</button>
  );
};

export default ArticleDeleteButton;
