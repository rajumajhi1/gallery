import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      style={{ 
        position: 'absolute', 
        top: '1rem', 
        right: '1rem',
        width: 'auto',
        padding: '0.5rem 1rem'
      }}
    >
      Logout
    </button>
  );
}

function ProtectedRoute() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <LogoutButton />
      <div 
        style={{ 
          minHeight: '100vh',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none'
        }}
      >
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}

export default ProtectedRoute; 