import React, { useState, useEffect } from "react";
import axios from "axios";
import "./mainlogin.scss";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const MainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branches, setBranches] = useState([]); // New state for branches
  const [option, setOption] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    // Fetch branch data from the API
    const fetchBranches = async () => {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem("token");

        // Send GET request to fetch branches
        const response = await axios.get(
          "https://admin.obwsalon.com/api/branch",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );

        // Extract the branches from the response
        const branchesData = response.data;

        // Set the branches state
        setBranches(branchesData);
      } catch (error) {
        // Handle error
        console.log("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []); // Run once on component mount

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the login API
      const response = await axios.post(
        "https://admin.obwsalon.com/api/login",
        {
          email,
          password,
        }
      );

      // Extract the token from the response
      const token = response.data.token;

      // Store the token in localStorage or any other state management solution of your choice
      localStorage.setItem("token", token);
      localStorage.setItem("branchName", 1);

      // Clear the form, error message, and option selection
      setEmail("");
      setPassword("");
      setError("");
      setOption("");

      Navigate("/services/women");
    } catch (error) {
      // Handle login error
      toast("Invalid email or password");
      setError("Invalid email or password");
    }
  };

  return (
    <div id="main_login">
      <div className="circle"></div>

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
        <select
          id="inputselection"
          // required
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="">Select an option</option>
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>
        <button type="submit">Login</button>
      </form>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default MainLogin;
