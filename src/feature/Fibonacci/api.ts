import type {
  FibonacciHistory,
  FibonacciResult,
  PaginationHistory,
} from "@/types";
import axiosInstance from "../../lib/axiosInstance";

export const calculate = async (index: number): Promise<FibonacciResult> => {
  const response = await axiosInstance.post<FibonacciResult>(
    "/fibonacci/calculate",
    { index }
  );
  return response.data;
};

export const history = async (): Promise<FibonacciHistory> => {
  const response = await axiosInstance.get<FibonacciHistory>(
    "/fibonacci/history"
  );
  return response.data;
};

export const pagination = async (
  page: number,
  limit: number
): Promise<PaginationHistory> => {
  const response = await axiosInstance.get<PaginationHistory>(
    "/fibonacci/history",
    {
      params: {
        page,
        limit,
      },
    }
  );
  return response.data;
};
