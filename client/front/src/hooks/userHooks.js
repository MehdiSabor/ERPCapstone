import { useState, useEffect, useCallback } from 'react';
import * as userAPI from '../models/userAPI';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    userAPI.getAllUsers()
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
};

export const useCreateUser = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleCreate = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await userAPI.createUser(data);
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

export const useUpdateUser = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);
  
    const handleUpdate = async (id, data) => {
      setIsUpdating(true);
      try {
        const response = await userAPI.updateUser(id, data);
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
  
  export const useDeleteUser = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
  
    const handleDelete = async (id) => {
      setIsDeleting(true);
      try {
        await userAPI.deleteUser(id);
        setIsDeleting(false);
      } catch (err) {
        setError(err.message);
        setIsDeleting(false);
      }
    };
  
    return { handleDelete, isDeleting, error };
  };
  
 
  export const useFetchUserById = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    // Define the fetching logic as a callable function using useCallback
    const fetchUser = useCallback(() => {
      if (id) {
        setLoading(true);
        setError(null); // Reset error state before new fetch attempt
        userAPI.getUserById(id)
          .then(response => {
            setUser(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [id]);
  
    // Invoke fetchUser when the component mounts and when id changes
    useEffect(() => {
      fetchUser();
    }, [fetchUser]);
  
    // Return all the state management vars and the refetch function
    return { user, loading, error, refetch: fetchUser };
  };
  
  