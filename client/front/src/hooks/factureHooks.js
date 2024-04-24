import { useState, useEffect, useCallback } from 'react';
import {
  getFactureById,
  getAllFactures,
  validateFacture,
  getAllDetailFacturesByFacture,
  cancelFacture,
} from '../models/factureAPI'; // Adjust the import path as necessary



export const useFetchFactureById = (id) => {
  const [facture, setFacture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Define the fetching logic as a callable function using useCallback
  const fetchFacture = useCallback(() => {
    if (id) {
      setLoading(true);
      setError(''); // Reset error state before new fetch attempt
      getFactureById(id)
        .then(response => {
          setFacture(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  // Invoke fetchFacture when the component mounts and when id changes
  useEffect(() => {
    fetchFacture();
  }, [fetchFacture]);

  // Return all the state management vars and the refetch function
  return { facture, loading, error, refetch: fetchFacture };
};

export const useFetchAllFactures = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getAllFactures()
      .then(response => {
        setFactures(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { factures, loading, error };
};
export const useValidateFacture = () => {
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const validate = async (refFAC) => {
    try {
      await validateFacture(refFAC);
      setIsValidated(true);
    } catch (err) {
      setError(err.message);
      setIsValidated(false);
    }
  };

  return { validate, error, isValidated };
};

export const useFetchDetailFacturesByFacture = (refFAC) => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (refFAC) {
      setLoading(true);
      getAllDetailFacturesByFacture(refFAC)
        .then(response => {
          setDetails(response.data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [refFAC]);

  return { details, loading, error };
};

export const useCancelFacture = () => {
  const [error, setError] = useState('');
  const [isCancelled, setIsCancelled] = useState(false);

  const handleCancel = async (refFAC) => {
      try {
          await cancelFacture(refFAC);
          setIsCancelled(true);
      } catch (err) {
          setError(err.message);
          setIsCancelled(false);
      }
  };

  return { handleCancel, error, isCancelled };
};