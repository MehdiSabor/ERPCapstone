import { useState, useEffect } from 'react';
import { 
  createBonliv, validateBonliv, getBonlivById, updateBonliv, deleteBonliv,
  getAllBonliv, getBonlivByClient, getBonlivByCommercial, 
  deleteItemFromBonliv, updateItemInBonliv, getItemsInBonliv, bulkUpdateItemsInBonliv
} from '../models/bonlivAPI'; // Adjust the import path as necessary

export const useCreateBonliv = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (bonlivData) => {
    try {
      await createBonliv(bonlivData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};

export const useValidateBonliv = (refBonliv) => {
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const validate = async () => {
    try {
      
      await validateBonliv(refBonliv);
      setIsValidated(true);
    } catch (err) {
      setError(err.message);
      setIsValidated(false);
    }
  };

  return { validate, error, isValidated };
};

export const useFetchBonlivById = (id) => {
  const [bonliv, setBonliv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBonlivById(id)
        .then(response => {
          setBonliv(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  return { bonliv, loading, error };
};

export const useUpdateBonliv = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, bonlivData) => {
    try {
      await updateBonliv(id, bonlivData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};

export const useDeleteBonliv = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteBonliv(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};

export const useFetchAllBonliv = () => {
  const [bonliv, setBonliv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllBonliv()
      .then(response => {
        setBonliv(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { bonliv, loading, error };
};


// Example for useFetchBonlivByClient
export const useFetchBonlivByClient = (clientId) => {
  const [bonliv, setBonliv] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (clientId) {
      setLoading(true);
      getBonlivByClient(clientId)
        .then(response => {
          setBonliv(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [clientId]);

  return { bonliv, loading, error };
};

export const useFetchBonlivByCommercial = (commercialId) => {
    const [bonliv, setBonliv] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (commercialId) {
        setLoading(true);
        getBonlivByCommercial(commercialId)
          .then(response => {
            setBonliv(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [commercialId]);
  
    return { bonliv, loading, error };
  };

 

  
  export const useDeleteItemFromBonliv = () => {
    const [error, setError] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
  
    const deleteItem = async (refBonliv, codeArt) => {
      try {
        await deleteItemFromBonliv(refBonliv, codeArt);
        setIsDeleted(true);
      } catch (err) {
        setError(err.message);
        setIsDeleted(false);
      }
    };
  
    return { deleteItem, error, isDeleted };
  };

  
  export const useUpdateItemInBonliv = () => {
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
  
    const updateItem = async (refBonliv, codeArt, itemData) => {
      try {
        await updateItemInBonliv(refBonliv, codeArt, itemData);
        setIsUpdated(true);
      } catch (err) {
        setError(err.message);
        setIsUpdated(false);
      }
    };
  
    return { updateItem, error, isUpdated };
  };

  
  export const useFetchItemsInBonliv = (refBonliv,fetchTrigger) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (refBonliv) {
        setLoading(true);
        getItemsInBonliv(refBonliv)
          .then(response => {
            setItems(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [refBonliv, fetchTrigger]);
  
    return { items, loading, error };
  };
  
  export const useBulkUpdateItemsInBonliv = () => {
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
  
    const bulkUpdateItems = async (updates) => {
      try {
        const response = await bulkUpdateItemsInBonliv(updates);
        setIsUpdated(true);
        return response.data; // You can return the updated items if your API does so
      } catch (err) {
        setError(err.message);
        setIsUpdated(false);
      }
    };
  
    return { bulkUpdateItems, error, isUpdated, setError, setIsUpdated };
  };

