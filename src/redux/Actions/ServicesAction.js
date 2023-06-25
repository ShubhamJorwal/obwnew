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

        axios
            .get('https://admin.obwsalon.com/api/services')
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

// Action creator to clear errors
export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});
