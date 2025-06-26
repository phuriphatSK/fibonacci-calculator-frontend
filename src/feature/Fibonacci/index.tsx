import type React from "react";
import { useFibonacci } from "@/hooks/useFibonacci";
import { Header } from "@/components/Header";
import { FibonacciForm } from "./components/FibonacciForm";
import { FibonacciHistory } from "./components/FibonacciHistory";
import { useEffect } from "react";

export const FibonacciPage: React.FC = () => {
  const { results, loading, calculate, loadHistory } = useFibonacci();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FibonacciForm
            onCalculate={async (index: number) => {
              await calculate(index);
            }}
            loading={loading}
          />
          <FibonacciHistory results={results} />
        </div>
      </main>
    </div>
  );
};
