import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/auth";

interface AuthContextType {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          const res = await authApi.validate(token);
          if (res.succeeded) {
            setUser(res.data);
          } else {
            logout();
          }
        } catch (err) {
          logout();
        }
      }
    };
    validateToken();
  }, [token]);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/home");
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext phải dùng trong AuthProvider");
  return context;
};
