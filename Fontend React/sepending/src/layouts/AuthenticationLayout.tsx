import { Outlet } from "react-router-dom";

export default function AuthenticationLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="w-full max-w-md px-8 py-12 mx-4 bg-white rounded-xl shadow-2xl">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
