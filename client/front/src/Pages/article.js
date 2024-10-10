import React, { useState, useEffect } from 'react';
import { useSidebar } from '../SidebarContext';
import ArticleList from '../components/article/ArticleList';
import ArticleForm from '../components/article/ArticleForm';
import SingleArticle from '../components/article/SingleArticle';
import ArticleDeleteButton from '../components/article/ArticleDeleteButton';
import ArticleUpdateForm from '../components/article/ArticleupdateForm';
import BulkUploadArticles from '../components/article/BulkUploadArticles';

const ArticleManagementPage = () => {
  const [currentView, setCurrentView] = useState('list');
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const { setSidebarButtons } = useSidebar();

  useEffect(() => {
    const buttons = [
      <button key="list" onClick={() => setCurrentView('list')}>View Articles</button>,
      <button key="create" onClick={() => setCurrentView('create')}>Create Article</button>,
       <button key="bulkUpload" onClick={() => setCurrentView('bulkUpload')}>Bulk Upload Articles</button>
    ];
    setSidebarButtons(buttons);
  }, [setSidebarButtons, setCurrentView]);

  const handleSelectArticle = (id) => {
    setSelectedArticleId(id.code_art);
    setCurrentView('view');
  };

  return (
    <div>
    
      {currentView === 'create' && <ArticleForm />}
      {currentView === 'bulkUpload' && <BulkUploadArticles />}
      
      {currentView === 'list' && <ArticleList onSelectArticle={handleSelectArticle} />}
      {currentView === 'view' && selectedArticleId && (
        <SingleArticle articleId={selectedArticleId} onChangeView={setCurrentView} />
      )}
    </div>
  );
};

export default ArticleManagementPage;
