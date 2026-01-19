import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requireLibrarian = false }) => {
  const { isAuthenticated, isLibrarian, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireLibrarian && !isLibrarian()) {
    return (
      <div className="unauthorized">
        <h2>⚠️ Access Denied</h2>
        <p>Only wizards (librarians) can access this page! 🧙‍♂️</p>
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
