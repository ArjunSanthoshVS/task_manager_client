import './App.css';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TaskBoardPage from "./pages/TaskBoardPage";

const checkTokenValidity = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (err) {
    localStorage.removeItem("token");
    return false;
  }
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkTokenValidity());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(checkTokenValidity());
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <TaskBoardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
