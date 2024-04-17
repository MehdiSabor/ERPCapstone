import { useState, useEffect } from 'react';
import { createReglement, updateReglement,getReglementById
    ,deleteReglementDetail, deleteReglement , getAllReglements,getAllUnifiedFactureAvoir,
     createReglementDetailsBatch, addDetailReglement   } from '../models/regAPI';
   
    
     export const useCreateReglement = (onSuccess) => {
        const [isCreating, setIsCreating] = useState(false);
        const [error, setError] = useState(null);
      
        const handleCreate = async (reglementData) => {
          setIsCreating(true);
          try {
            const response = await createReglement(reglementData);
            setIsCreating(false);
            if (onSuccess && typeof onSuccess === 'function') {
              onSuccess(response.data);  // Invoke the onSuccess callback with the response data
            }
            return response.data;
          } catch (err) {
            setError(err.message);
            setIsCreating(false);
            throw err;
          }
        };
      
        return { handleCreate, isCreating, error };
      };
      

export const useUpdateReglement = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdate = async (id, reglementData) => {
    setIsUpdating(true);
    try {
      const response = await updateReglement(id, reglementData);
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


export const useFetchReglementById = (id) => {
  const [reglement, setReglement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getReglementById(id)
        .then(response => {
          setReglement(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  return { reglement, loading, error };
};


export const useDeleteReglement = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteReglement(id);
      setIsDeleting(false);
    } catch (err) {
      setError(err.message);
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting, error };
};


export const useFetchAllReglements = () => {
  const [reglements, setReglements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllReglements()
      .then(response => {
        setReglements(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { reglements, loading, error };
};


export const useFetchAllUnifiedFactureAvoir = () => {
  const [unifiedRecords, setUnifiedRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAllUnifiedFactureAvoir()
      .then(response => {
        setUnifiedRecords(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { unifiedRecords, loading, error };
};

export const useCreateReglementDetailsBatch = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateBatch = async (regDetailsArray) => {
    setIsCreating(true);
    try {
      const response = await createReglementDetailsBatch(regDetailsArray);
      setIsCreating(false);
      return response.data;  // Return the response data if needed
    } catch (err) {
      setError(err.message);
      setIsCreating(false);
      throw err;
    }
  };

  return { handleCreateBatch, isCreating, error };
};



export const useAddDetailReglement = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddDetail = async (regDetailData) => {
        setIsLoading(true);
        try {
            const response = await addDetailReglement(regDetailData);
            setIsLoading(false);
            return response.data; // Assuming the API responds with the added detail
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    };

    return { handleAddDetail, isLoading, error };
};


// Hook to handle the deletion
export const useDeleteReglementDetail = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (refRegV, refAvFac) => {
        setIsDeleting(true);
        try {
            await deleteReglementDetail(refRegV, refAvFac);
            setIsDeleting(false);
            return true;
        } catch (err) {
            setError(err.message);
            setIsDeleting(false);
            return false;
        }
    };

    return { handleDelete, isDeleting, error };
};
