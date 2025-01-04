import { useAuthContext } from "./authContext.jsx";
import { Navigate } from "react-router-dom";

const SkeletonDashboard = () => {
  return (
    <div className="skeleton-dashboard">
      <div className="skeleton-sidebar"></div>
      <div className="skeleton-content">
        <div className="skeleton-header "></div>
        <div className="skeleton-cards">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
        <div className="skeleton-cards mt-10 ">
          <div className="skeleton-div"></div>
          <div className="skeleton-div"></div>
        </div>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuthContext();

  if (loading) {
    return <SkeletonDashboard />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
