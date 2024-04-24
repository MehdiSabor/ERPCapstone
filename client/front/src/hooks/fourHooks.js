import { useState, useEffect, useCallback } from 'react';
import { getAllFours,getFourById, updateFour,createFour,deleteFour } from '../models/fourAPI';

export const useFetchAllFours = () => {
  const [Fours, setFours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllFours()
      .then(response => {
        setFours(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { Fours, loading, error };
};



export const useFetchFourById = (id) => {
  const [Four, setFour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define the fetching logic as a callable function using useCallback
  const fetchFour = useCallback(() => {
    if (id) {
      setLoading(true);
      setError(''); // Reset error state before new fetch attempt
      getFourById(id)
        .then(response => {
          setFour(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Invoke fetchFour when the component mounts and when id changes
  useEffect(() => {
    fetchFour();
  }, [fetchFour]);

  // Return all the state management vars and the refetch function
  return { Four, loading, error, refetch: fetchFour };
};



export const useUpdateFour = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, FourData) => {
    try {
      await updateFour(id, FourData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};


export const useCreateFour = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (FourData) => {
    try {
      await createFour(FourData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};


export const useDeleteFour = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteFour(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};




