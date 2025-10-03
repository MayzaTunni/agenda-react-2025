import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const roleHierarchy = {
      admin: 3,
      professional: 2,
      client: 1,
    };

    if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default PrivateRoute;

