import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginComponent from "./LoginComponent/LoginComponent";
import RegisterComponent from "./RegisterComponent/RegisterComponent";
import { useAuth } from "@/hooks/useAuth";
import Home from "./Home/Home";

const PrivateRoute = ({ children }: any) => {
  const { isAuthenticated } = useAuth(); // Check if user is logged in
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="register" element={<RegisterComponent />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
