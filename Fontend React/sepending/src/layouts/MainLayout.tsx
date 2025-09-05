import { Outlet, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

export default function MainLayout() {
  const { user, logout, token } = useAuthContext();
  useEffect(() => {
    console.log("user", user);
  }, [user]);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold text-blue-600">
            Hệ thống quản lý chi tiêu
          </h1>
        </Link>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-500">
            About
          </Link>
          <Link to="/expenses" className="hover:text-blue-500">
            Expenses
          </Link>
          {token ? (
            <>
              <span className="text-gray-700 font-medium">
                Xin chào, {user?.username}
              </span>
              <button
                onClick={logout}
                className="ml-4 px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link to="/auth" className="hover:text-blue-500">
              Đăng nhập
            </Link>
          )}
        </nav>
      </header>

      {/* Nội dung thay đổi theo từng route */}
      <main className="p-6">
        <Outlet />
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        © 2025 Spending System
      </footer>
    </div>
  );
}
