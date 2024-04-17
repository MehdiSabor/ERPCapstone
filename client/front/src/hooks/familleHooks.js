import { useState, useEffect } from 'react';
import * as familleAPI from '../models/familleAPI';

export const useFamilles = () => {
  const [familles, setFamilles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    familleAPI.getAllFamilles()
      .then(response => {
        setFamilles(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { familles, loading, error };
};

export const useCreateFamille = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await familleAPI.createFamille(data);
      setIsSubmitting(false);
      return response.data;
    } catch (err) {
      setError(err.message);
      setIsSubmitting(false);
      throw err;
    }
  };

  return { handleCreate, isSubmitting, error };
};

export const useUpdateFamille = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);
  
    const handleUpdate = async (id, data) => {
      setIsUpdating(true);
      try {
        const response = await familleAPI.updateFamille(id, data);
        setIsUpdating(false);
        return response.data;
      } catch (err) {
        setError(err.message);
        setIsUpdating(false);
        throw err;
      }
    };
  
    return { handleUpdate, isUpdating, error };
  };
  
  export const useDeleteFamille = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDelete = async (id) => {
      setIsDeleting(true);
      try {
        await familleAPI.deleteFamille(id);
        setIsDeleting(false);
      } catch (err) {
        setError(err.message);
        setIsDeleting(false);
      }
    };
  
    return { handleDelete, isDeleting, error };
  };
  
  export const useFetchFamilleById = (id) => {
    const [famille, setFamille] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      setLoading(true);
      familleAPI.getFamilleById(id)
        .then(response => {
          setFamille(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }, [id]);
  
    return { famille, loading, error };
  };
  