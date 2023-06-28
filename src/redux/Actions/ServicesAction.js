import axios from 'axios';
import {
  FETCH_SERVICES_REQUEST,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_FAILURE,
  CLEAR_ERRORS,
} from '../Constants/Services';

// Action creator to fetch services
export const fetchServices = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SERVICES_REQUEST });

    const token = localStorage.getItem('token');

    axios
      .get('https://admin.obwsalon.com/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch({
          type: FETCH_SERVICES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SERVICES_FAILURE,
          payload: error.message,
        });
      });
  };
};


export const fetchServicesForWomen = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SERVICES_REQUEST });

    const token = localStorage.getItem('token');

    axios
      .get('https://admin.obwsalon.com/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data)
        const servicesForWomen = response.data.filter((service) => service.type === 'Women');
        dispatch({
          type: FETCH_SERVICES_SUCCESS,
          payload: servicesForWomen,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SERVICES_FAILURE,
          payload: error.message,
        });
      });
  };
};


export const fetchServicesForChild = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SERVICES_REQUEST });

    const token = localStorage.getItem('token');

    axios
      .get('https://admin.obwsalon.com/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const servicesForWomen = response.data.filter((service) => service.type === 'Child');
        dispatch({
          type: FETCH_SERVICES_SUCCESS,
          payload: servicesForWomen,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SERVICES_FAILURE,
          payload: error.message,
        });
      });
  };
};


export const fetchServicesForMen = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_SERVICES_REQUEST });

    const token = localStorage.getItem('token');

    axios
      .get('https://admin.obwsalon.com/api/services', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const servicesForWomen = response.data.filter((service) => service.type === 'Men');
        dispatch({
          type: FETCH_SERVICES_SUCCESS,
          payload: servicesForWomen,
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_SERVICES_FAILURE,
          payload: error.message,
        });
      });
  };
};

  
// console.log(response.data); 


// Action creator to clear errors
export const clearErrors = () => ({
  type: CLEAR_ERRORS,
});
