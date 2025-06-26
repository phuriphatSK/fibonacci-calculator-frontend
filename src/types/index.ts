export interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
}

export interface FibonacciHistory {
  calculations: FibonacciResult[];
  total: number;
  page: number;
  totalPages: number;
}

export interface FibonacciResult {
  id: string;
  index: number;
  result: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface PaginationHistory {
  data: FibonacciResult[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
