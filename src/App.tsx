import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { authUser } = useAuthStore();
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route
        path="/home"
        element={authUser ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={authUser ? <Navigate to="/home" replace /> : <Login />}
      />
      <Route
        path="/signup"
        element={authUser ? <Navigate to="/home" replace /> : <SignUp />}
      />
    </Routes>
  );
}

export default App;
