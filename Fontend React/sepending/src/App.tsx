import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { lazy, Suspense } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Register from "./pages/Register";
import AuthenticationLayout from "./layouts/AuthenticationLayout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Expenses = lazy(() => import("./pages/Expenses"));
const Authentication = lazy(() => import("./pages/Authentication"));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>

        <Route element={<AuthenticationLayout />}>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
