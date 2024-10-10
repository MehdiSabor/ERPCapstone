// In hooks/clientHooks.js
import { bulkUploadClients } from '../models/clientAPI';
import { useState, useCallback, useEffect } from 'react';
import { getAllClients,getClientById, updateClient,createClient,deleteClient } from '../models/clientAPI';

export const useFetchAllClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllClients()
      .then(response => {
        setClients(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { clients, loading, error };
};



export const useFetchClientById = (id) => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define the fetching logic as a callable function using useCallback
  const fetchClient = useCallback(() => {
    if (id) {
      setLoading(true);
      setError(''); // Reset the error state on new fetch
      getClientById(id)
        .then(response => {
          setClient(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Call fetchClient on initial mount and when `id` changes
  useEffect(() => {
    fetchClient();
  }, [fetchClient]);

  // Return everything including the fetchClient function, renamed as refetch for external usage
  return { client, loading, error, refetch: fetchClient };
};



export const useUpdateClient = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, clientData) => {
    try {
      await updateClient(id, clientData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};


export const useCreateClient = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (clientData) => {
    try {
      await createClient(clientData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};


export const useDeleteClient = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteClient(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};



export const useBulkUploadClients = () => {
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
      const response = await bulkUploadClients(formData);
      setUploadResult(response.data);
    } catch (err) {
      setError(err.message || 'An error occurred during upload');
    } finally {
      setLoading(false);
    }
  };

  return { handleBulkUpload, loading, error, uploadResult };
};

