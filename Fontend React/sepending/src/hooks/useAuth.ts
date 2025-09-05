import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { authApi } from "../api/authApi";
import type { LoginRequest, RegisterRequest } from "../types/auth";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    const { login: saveToken } = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (payload: LoginRequest) => {
        setLoading(true);
        setError(null);
        try {
            const res = await authApi.login(payload);
            console.log(res);
            if (res.succeeded) {
                saveToken(res.data.token);
                navigate("/");
            } else {
                setError(res.message || "Đăng nhập thất bại");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}

export const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState(false);
    const register = async (payload: RegisterRequest) => {
        setLoading(true);
        setError(null);
        try {
            const res = await authApi.register(payload);
            console.log(res);
            if (res.succeeded) {
                setStatus(true);
            } else {
                setError(res.message);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return { register, loading, error, status };
}