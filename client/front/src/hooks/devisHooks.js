import { useState, useEffect } from 'react';
import { 
  createDevis, validateDevis, getDevisById, updateDevis, deleteDevis,
  getAllDevis, getDevisByClient, getDevisByCommercial, addItemToDevis,
  deleteItemFromDevis, updateItemInDevis, getItemsInDevis
} from '../models/devisAPI'; // Adjust the import path as necessary

export const useCreateDevis = () => {
  const [error, setError] = useState('');
  const [isCreated, setIsCreated] = useState(false);

  const handleCreate = async (devisData) => {
    try {
      await createDevis(devisData);
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
      setIsCreated(false);
    }
  };

  return { handleCreate, error, isCreated };
};

export const useValidateDevis = (refDevis) => {
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const validate = async () => {
    try {
      await validateDevis(refDevis);
      setIsValidated(true);
    } catch (err) {
      setError(err.message);
      setIsValidated(false);
    }
  };

  return { validate, error, isValidated };
};

export const useFetchDevisById = (id) => {
  const [devis, setDevis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      getDevisById(id)
        .then(response => {
          setDevis(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  return { devis, loading, error };
};

export const useUpdateDevis = () => {
  const [error, setError] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = async (id, devisData) => {
    try {
      await updateDevis(id, devisData);
      setIsUpdated(true);
    } catch (err) {
      setError(err.message);
      setIsUpdated(false);
    }
  };

  return { handleUpdate, error, isUpdated };
};

export const useDeleteDevis = () => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteDevis(id);
      setIsDeleted(true);
    } catch (err) {
      setError(err.message);
      setIsDeleted(false);
    }
  };

  return { handleDelete, error, isDeleted };
};

export const useFetchAllDevis = () => {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllDevis()
      .then(response => {
        setDevis(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { devis, loading, error };
};


// Example for useFetchDevisByClient
export const useFetchDevisByClient = (clientId) => {
  const [devis, setDevis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (clientId) {
      setLoading(true);
      getDevisByClient(clientId)
        .then(response => {
          setDevis(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [clientId]);

  return { devis, loading, error };
};

export const useFetchDevisByCommercial = (commercialId) => {
    const [devis, setDevis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (commercialId) {
        setLoading(true);
        getDevisByCommercial(commercialId)
          .then(response => {
            setDevis(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [commercialId]);
  
    return { devis, loading, error };
  };

  export const useAddItemToDevis = () => {
    const [error, setError] = useState('');
    const [isAdded, setIsAdded] = useState(false);
  
    const addItem = async (refDevis, itemData) => {
      try {
        await addItemToDevis(refDevis, itemData);
        setIsAdded(true);
      } catch (err) {
        setError(err.message);
        setIsAdded(false);
      }
    };
  
    return { addItem, error, isAdded };
  };

  
  export const useDeleteItemFromDevis = () => {
    const [error, setError] = useState('');
    const [isDeleted, setIsDeleted] = useState(false);
  
    const deleteItem = async (refDevis, codeArt) => {
      try {
        await deleteItemFromDevis(refDevis, codeArt);
        setIsDeleted(true);
      } catch (err) {
        setError(err.message);
        setIsDeleted(false);
      }
    };
  
    return { deleteItem, error, isDeleted };
  };

  
  export const useUpdateItemInDevis = () => {
    const [error, setError] = useState('');
    const [isUpdated, setIsUpdated] = useState(false);
  
    const updateItem = async (refDevis, codeArt, itemData) => {
      try {
        await updateItemInDevis(refDevis, codeArt, itemData);
        setIsUpdated(true);
      } catch (err) {
        setError(err.message);
        setIsUpdated(false);
      }
    };
  
    return { updateItem, error, isUpdated };
  };

  
  export const useFetchItemsInDevis = (refDevis,fetchTrigger) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      if (refDevis) {
        setLoading(true);
        getItemsInDevis(refDevis)
          .then(response => {
            setItems(response.data);
            setLoading(false);
          })
          .catch(err => {
            setError(err.message);
            setLoading(false);
          });
      }
    }, [refDevis, fetchTrigger]);
  
    return { items, loading, error };
  };
  

