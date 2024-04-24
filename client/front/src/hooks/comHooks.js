import { useState, useCallback, useEffect } from 'react';
import { getAllComs,getComById, updateCom,createCom,deleteCom } from '../models/comAPI';

export const useFetchAllComs = () => {
  const [Coms, setComs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllComs()
      .then(response => {
        setComs(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { Coms, loading, error };
};



export const useFetchComById = (id) => {
  const [Com, setCom] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define the fetching logic as a callable function using useCallback
  const fetchCom = useCallback(() => {
    if (id) {
      setLoading(true);
      setError(''); // Reset error state before new fetch attempt
      getComById(id)
        .then(response => {
          setCom(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Invoke fetchCom when the component mounts and when id changes
  useEffect(() => {
    fetchCom();
  }, [fetchCom]);

  // Return all the state management vars and the refetch function
  return { Com, loading, error, refetch: fetchCom };
};



export const useUpdateCom = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, ComData) => {
    try {
      await updateCom(id, ComData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};


export const useCreateCom = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (ComData) => {
    try {
      await createCom(ComData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};


export const useDeleteCom = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteCom(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};




