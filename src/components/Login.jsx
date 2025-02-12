import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Debug logs
    console.log('Entered username:', username);
    console.log('Entered password:', password);
    console.log('Expected username:', import.meta.env.VITE_USERNAME);
    console.log('Expected password:', import.meta.env.VITE_PASSWORD);

    // Strict comparison of credentials
    const isValidUsername = username === import.meta.env.VITE_USERNAME;
    const isValidPassword = password === import.meta.env.VITE_PASSWORD;

    console.log('Username match:', isValidUsername);
    console.log('Password match:', isValidPassword);

    if (isValidUsername && isValidPassword) {
      sessionStorage.setItem('isLoggedIn', 'true');
      navigate('/');
    } else {
      setError('Invalid username or password');
      // Add shake animation to form
      const form = document.querySelector('.login-form');
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background"></div>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back</h2>
          <p className="login-subtitle">Please enter your credentials to continue</p>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <button type="submit" className="login-button">
            Login
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login; 