import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email,
        password: password
      });

      const userRole = response.data.role; // e.g., "INSTRUCTOR"
      alert("Login Successful! Role: " + userRole);

      // Convert to uppercase to match the backend 'INSTRUCTOR' string exactly
      const normalizedRole = userRole.toUpperCase();

      if (normalizedRole === 'INSTRUCTOR') {
        navigate('/instructor-dashboard');
      } else if (normalizedRole === 'ADMIN') {
        navigate('/admin-dashboard');
      } else {
        // Default fallback for 'STUDENT' or any other role
        navigate('/student-dashboard');
      }
    } catch (error) {

      alert("Login Failed: Incorrect email or password");
      console.error("Auth Error:", error);
    }
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial' }}>
      <h2>Personalized Learning System - UC1 Login</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Email:</label>
        <input 
          type="email" 
          placeholder="role@edu.com" 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ padding: '8px', width: '250px' }} 
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block' }}>Password:</label>
        <input 
          type="password" 
          placeholder="password123" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ padding: '8px', width: '250px' }} 
        />
      </div>

      <button 
        onClick={handleLogin} 
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Login
      </button>

      <p style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        Hint: Use <b>role@edu.com</b> / <b>password123</b>
      </p>
    </div>
  );
};

export default LoginPage;