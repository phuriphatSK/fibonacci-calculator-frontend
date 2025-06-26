import type React from "react";
import { useFibonacci } from "@/hooks/useFibonacci";
import { Header } from "@/components/Header";
import { FibonacciForm } from "./components/FibonacciForm";
import { FibonacciHistory } from "./components/FibonacciHistory";
import { useEffect, useState } from "react";

export const FibonacciPage: React.FC = () => {
  const { results, loading, calculate, loadHistory, pagination } =
    useFibonacci();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadHistory(currentPage);
  }, [loadHistory, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FibonacciForm
            onCalculate={async (index) => {
              const result = await calculate(index);
              await loadHistory(1);
              return {
                index: result.index,
                result: result.result,
                createdAt: new Date().toISOString(),
              };
            }}
            loading={loading}
          />
          <FibonacciHistory
            results={results}
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
};
