import {createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import customerReducer from '../redux/Reducers/CustomerReducer';
import servicesReducer from '../redux/Reducers/ServicesReducer'; // Import the services reducer


// Combine multiple reducers into a single root reducer
const rootReducer = combineReducers({
  customers: customerReducer,
  services: servicesReducer, // Add the services reducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

