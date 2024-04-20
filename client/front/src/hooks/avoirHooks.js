import { useState, useEffect } from 'react';
import { 
  createAvoir, validateAvoir, getAvoirById, updateAvoir, deleteAvoir,
  getAllAvoir, getAvoirByClient, getAvoirByCommercial, addItemToAvoir,
  deleteItemFromAvoir, updateItemInAvoir, getItemsInAvoir
} from '../models/avoirAPI'; // Adjust the import path as necessary

export const useCreateAvoir = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (avoirData) => {
    try {
      await createAvoir(avoirData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};

export const useValidateAvoir = () => {
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const validate = async (refAvoir) => {
    try {
      
      await validateAvoir(refAvoir);
      setIsValidated(true);
    } catch (err) {
      setError(err.message);
      setIsValidated(false);
    }
  };

  return { validate, error, isValidated };
};

export const useFetchAvoirById = (id) => {
  const [avoir, setAvoir] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getAvoirById(id)
        .then(response => {
          setAvoir(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  return { avoir, loading, error };
};

export const useUpdateAvoir = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, avoirData) => {
    try {
      await updateAvoir(id, avoirData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};

export const useDeleteAvoir = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteAvoir(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};

export const useFetchAllAvoir = () => {
  const [avoir, setAvoir] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllAvoir()
      .then(response => {
        setAvoir(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { avoir, loading, error };
};


// Example for useFetchAvoirByClient
export const useFetchAvoirByClient = (clientId) => {
  const [avoir, setAvoir] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (clientId) {
      setLoading(true);
      getAvoirByClient(clientId)
        .then(response => {
          setAvoir(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [clientId]);

  return { avoir, loading, error };
};

export const useFetchAvoirByCommercial = (commercialId) => {
    const [avoir, setAvoir] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (commercialId) {
        setLoading(true);
        getAvoirByCommercial(commercialId)
          .then(response => {
            setAvoir(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [commercialId]);
  
    return { avoir, loading, error };
  };

  export const useAddItemToAvoir = () => {
    const [error, setError] = useState('');
    const [isAdded, setIsAdded] = useState(false);
  
    const addItem = async (refAvoir, itemData) => {
      try {
        await addItemToAvoir(refAvoir, itemData);
        setIsAdded(true);
      } catch (err) {
        setError(err.message);
        setIsAdded(false);
      }
    };
  
    return { addItem, error, isAdded };
  };

  
  export const useDeleteItemFromAvoir = () => {
    const [error, setError] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
  
    const deleteItem = async (refAvoir, codeArt) => {
      try {
        await deleteItemFromAvoir(refAvoir, codeArt);
        setIsDeleted(true);
      } catch (err) {
        setError(err.message);
        setIsDeleted(false);
      }
    };
  
    return { deleteItem, error, isDeleted };
  };

  
  export const useUpdateItemInAvoir = () => {
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
  
    const updateItem = async (refAvoir, codeArt, itemData) => {
      try {
        await updateItemInAvoir(refAvoir, codeArt, itemData);
        setIsUpdated(true);
      } catch (err) {
        setError(err.message);
        setIsUpdated(false);
      }
    };
  
    return { updateItem, error, isUpdated };
  };

  
  export const useFetchItemsInAvoir = (refAvoir,fetchTrigger) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (refAvoir) {
        setLoading(true);
        getItemsInAvoir(refAvoir)
          .then(response => {
            setItems(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [refAvoir, fetchTrigger]);
  
    return { items, loading, error };
  };
  

