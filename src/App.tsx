import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { FibonacciPage } from "./feature/Fibonacci";
import { LoginPage } from "./feature/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({
//   children,
// }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" replace />;
// };

const AppContent: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/fibonacci" element={<FibonacciPage />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <AppContent />
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
