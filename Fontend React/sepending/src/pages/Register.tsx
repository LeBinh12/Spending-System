import { useState } from "react";
import InputField from "../components/InputField";
import { Eye, EyeOff } from "lucide-react";
import { useRegister } from "../hooks/useAuth";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading, status, error } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }
    register({
      username: form.username,
      email: form.email,
      password: form.password,
    });
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tạo tài khoản</h1>
        <p className="text-gray-600">Đăng ký để bắt đầu quản lý chi tiêu</p>
      </div>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Username */}
        <InputField
          label="Tên đăng nhập"
          id="username"
          name="username"
          placeholder="bin123"
          required
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        {/* Email */}
        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="nhapemail@domain.com"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <InputField
          label="Mật khẩu"
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          rightIcon={
            showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )
          }
          onRightIconClick={() => setShowPassword(!showPassword)}
        />

        {/* Confirm Password */}
        <InputField
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="••••••••"
          required
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
          rightIcon={
            showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )
          }
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
          >
            {loading ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {status && (
          <p className="text-green-600 text-sm">Đăng ký thành công!</p>
        )}
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Đã có tài khoản?{" "}
          <a
            href="/auth"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Đăng nhập
          </a>
        </p>
      </div>
    </>
  );
}
