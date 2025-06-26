import { useState, useCallback } from "react";
import type { FibonacciResult, Pagination } from "@/types";
import {
  calculate,
  pagination as fetchPagination,
} from "@/feature/Fibonacci/api";
import axios from "axios";

export const useFibonacci = () => {
  const [results, setResults] = useState<FibonacciResult[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async (page = 1, limit = 5) => {
    setLoading(true);
    try {
      const res = await fetchPagination(page, limit);
      setResults(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateFibonacci = useCallback(
    async (index: number) => {
      setLoading(true);
      setError(null);

      try {
        const resultFromAPI = await calculate(index);
        await loadHistory();
        return resultFromAPI;
      } catch (err: unknown) {
        let errorMessage = "เกิดข้อผิดพลาดในการคำนวณ";

        if (axios.isAxiosError(err) && err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        setError(errorMessage);
        throw new Error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [loadHistory]
  );

  const clearResults = useCallback(() => {
    setResults([]);
  }, []);

  return {
    pagination,
    results,
    loading,
    error,
    calculate: calculateFibonacci,
    loadHistory,
    clearResults,
  };
};
