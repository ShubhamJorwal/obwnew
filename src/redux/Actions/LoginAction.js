import axios from 'axios';

// Action creator for user login
export const login = (email, password) => {
  return (dispatch) => {
    axios
      .post('https://admin.obwsalon.com/api/login', {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);
        dispatch(fetchServices()); // Fetch services after successful login
      })
      .catch((error) => {
        console.error(error);
        // Handle login error
      });
  };
};
