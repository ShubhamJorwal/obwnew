import React, { useState } from 'react';
import axios from 'axios';
import './mainlogin.scss'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const MainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const Navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login API
      const response = await axios.post('https://admin.obwsalon.com/api/login', {
        email,
        password,
      });

      // Extract the token from the response
      const token = response.data.token;

      // Store the token in localStorage or any other state management solution of your choice
      localStorage.setItem('token', token);

      // Clear the form and error message
      setEmail('');
      setPassword('');
      setError('');
      Navigate('/home')
    } catch (error) {
      // Handle login error
      toast("Invalid email or password")
      setError('Invalid email or password');
    }
  };

  return (
    <div id='main_login'>
        <div class="circle"></div>

      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {/* {error && <p>{error}</p>} */}
      
      <ToastContainer position="bottom-right" />
    </div>
  );
};


export default MainLogin
