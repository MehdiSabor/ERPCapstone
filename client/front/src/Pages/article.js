import React, { useState } from 'react';
import ArticleList from '../components/article/ArticleList';
import ArticleForm from '../components/article/ArticleForm';
import SingleArticle from '../components/article/SingleArticle';
import ArticleDeleteButton from '../components/article/ArticleDeleteButton';
import ArticleUpdateForm from '../components/article/ArticleupdateForm';


const ArticleManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleSelectArticle = (id) => {
    setSelectedArticleId(id);
    setCurrentView('view');
  };

  return (
    <div>
      <button onClick={() => setCurrentView('list')}>View Articles</button>
      <button onClick={() => setCurrentView('create')}>Create Article</button>
      {currentView === 'create' && <ArticleForm />}
      {currentView === 'update' && <ArticleUpdateForm articleId={selectedArticleId} />}
      {currentView === 'delete' && <ArticleDeleteButton articleId={selectedArticleId} onSuccess={() => setCurrentView('list')} />}
  
      {currentView === 'list' && <ArticleList onSelectArticle={handleSelectArticle} />}
      {currentView === 'view' && selectedArticleId && (
        <SingleArticle articleId={selectedArticleId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default ArticleManagementPage;
