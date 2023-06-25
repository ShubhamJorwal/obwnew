// reducers.js
import {
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_FAILURE,
    CLEAR_ERRORS,
  } from '../Constants/Customers';
  
  const initialState = {
    customers: [],
    loading: false,
    error: null,
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CUSTOMERS_SUCCESS:
        return {
          ...state,
          loading: false,
          customers: action.payload,
        };
      case FETCH_CUSTOMERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export default customerReducer;
  