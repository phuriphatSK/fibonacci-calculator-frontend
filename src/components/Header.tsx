import { LogOut, Calculator } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null;
  if (!user) return null;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Calculator className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-xl font-semibold text-gray-900">
              Fibonacci Calculator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src={user.picture || "https://via.placeholder.com/32"}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border"
              />

              <span className="text-sm text-gray-700 hidden sm:inline">
                {user.name}
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-100 transition"
              type="button"
            >
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
