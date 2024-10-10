// In hooks/articleHooks.js
import { bulkUploadArticles } from '../models/articleAPI';
import { useState, useEffect,useCallback } from 'react';
import { getAllArticles,getArticleById, updateArticle,createArticle,deleteArticle } from '../models/articleAPI';

export const useFetchAllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllArticles()
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { articles, loading, error };
};



export const useFetchArticleById = (id) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define the fetching logic as a callable function
  const fetchArticle = useCallback(() => {
    if (id) {
      setLoading(true);
      setError('');  // Reset the error state on new fetch
      getArticleById(id)
        .then(response => {
          setArticle(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Call fetchArticle on initial mount and when `id` changes
  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);

  // Return everything including the fetchArticle function renamed as refetch for external usage
  return { article, loading, error, refetch: fetchArticle };
};


export const useUpdateArticle = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, articleData) => {
    try {
      await updateArticle(id, articleData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};


export const useCreateArticle = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (articleData) => {
    try {
      await createArticle(articleData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};


export const useDeleteArticle = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};



export const useBulkUploadArticles = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadResult, setUploadResult] = useState(null);

  const handleBulkUpload = async (file) => {
    setLoading(true);
    setError('');
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await bulkUploadArticles(formData);
      setUploadResult(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setLoading(false);
    }
  };

  return { handleBulkUpload, loading, error, uploadResult };
};

