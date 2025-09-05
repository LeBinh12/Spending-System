import axios from "axios";
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, validateResponse } from "../types/auth";
import { API_URL } from "../config/config";


export const authApi = {
    login: async (payload: LoginRequest): Promise<LoginResponse> => {
        const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, payload);
    return response.data;
    },
    register: async(payload: RegisterRequest): Promise<RegisterResponse> => {
        const response = await axios.post<RegisterResponse>(`${API_URL}/auth/register`, payload);
    return response.data;
    },
    validate: async (token: string) => {
    const response = await axios.get<validateResponse>(`${API_URL}/auth/validate`, {
      params: { token }, 
    });
    return response.data;
  },
}