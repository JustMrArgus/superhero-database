import { useState, useCallback } from "react";
import { superheroApi } from "../services/api";

export const useSuperheroes = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSuperheroes = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await superheroApi.getAll(page, 5);
      setSuperheroes(response.data.superheroes);
      const hasMore = response.data.superheroes.length === 5;
      setTotalPages(hasMore ? page + 1 : page);
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSuperhero = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await superheroApi.create(formData);
        await fetchSuperheroes(1);
        return response.data.superhero;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchSuperheroes]
  );

  const updateSuperhero = useCallback(
    async (id, formData) => {
      setLoading(true);
      setError(null);
      try {
        const response = await superheroApi.update(id, formData);
        await fetchSuperheroes(currentPage);
        return response.data.superhero;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchSuperheroes, currentPage]
  );

  const deleteSuperhero = useCallback(
    async (id) => {
      setLoading(true);
      setError(null);
      try {
        await superheroApi.delete(id);
        await fetchSuperheroes(currentPage);
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchSuperheroes, currentPage]
  );

  const getSuperhero = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await superheroApi.getById(id);
      return response.data.superhero;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    superheroes,
    loading,
    error,
    currentPage,
    totalPages,
    fetchSuperheroes,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero,
    getSuperhero,
  };
};
