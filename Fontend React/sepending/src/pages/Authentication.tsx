import { useState } from "react";
import InputField from "../components/InputField";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Authentication() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const { login, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(form);
  };

  return (
    <>
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .672-3 1.5S10.343 11 12 11s3 .672 3 1.5S13.657 14 12 14m0 0v1m0-8V6m0 12a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Đăng nhập</h1>
        <p className="text-gray-600">Đăng nhập để bắt đầu quản lý chi tiêu</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Email */}
        <InputField
          label="Username: "
          id="username"
          name="username"
          type="text"
          placeholder="abcxyz"
          required
          icon={
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12H8m0 0l-4-4m4 4l-4 4m12-4h-4"
              />
            </svg>
          }
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Password có toggle */}
        <InputField
          label="Mật khẩu:"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          icon={
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 11c0-1.657-1.343-3-3-3s-3 1.343-3 3"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13v-2a7 7 0 0114 0v2M12 17h.01"
              />
            </svg>
          }
          rightIcon={
            showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )
          }
          onRightIconClick={() => setShowPassword(!showPassword)}
        />

        {/* Remember me + Quên mật khẩu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-700"
            >
              Ghi nhớ đăng nhập
            </label>
          </div>
          <div className="text-sm">
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Quên mật khẩu?
            </a>
          </div>
        </div>

        {/* Nút Đăng nhập */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150"
          >
            Đăng nhập
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </>
  );
}
