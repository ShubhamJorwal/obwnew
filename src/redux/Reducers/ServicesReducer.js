import {
    FETCH_SERVICES_REQUEST,
    FETCH_SERVICES_SUCCESS,
    FETCH_SERVICES_FAILURE,
    CLEAR_ERRORS,
} from '../Constants/Services';

const initialState = {
    services: [],
    loading: false,
    error: null,
};

const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SERVICES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_SERVICES_SUCCESS:
            return {
                ...state,
                services: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_SERVICES_FAILURE:
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

export default servicesReducer;
