import type { User } from "@/types";
import axiosInstance from "../../lib/axiosInstance";

export const login = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/auth/google");
  return response.data;
};

export const fetchProfile = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/auth/profile");
  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};
