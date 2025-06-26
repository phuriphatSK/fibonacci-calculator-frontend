import { useState, useCallback } from "react";
import type { FibonacciResult } from "@/types";
import { calculate, history } from "@/feature/Fibonacci/api";
import axios from "axios";

export const useFibonacci = () => {
  const [results, setResults] = useState<FibonacciResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const latestHistory = await history();
      setResults(latestHistory.calculations);
    } catch (err: unknown) {
      let errorMessage = "ไม่สามารถโหลดประวัติได้";
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
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
        await loadHistory(); // โหลดประวัติใหม่หลังคำนวณเสร็จ
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
    results,
    loading,
    error,
    calculate: calculateFibonacci,
    loadHistory,
    clearResults,
  };
};
