import {createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.loading = true; // Set loading to true when login request is initiated
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.loading = false; // Set loading back to false when login is successful
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.loading = false; // Set loading back to false when login fails
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false; // Set loading back to false when login fails
        },
        startLoading(state) {
            state.isLoading = true;
        },
    },
});

export const {
    loginSuccess,
    logout,
    loginRequest,
    loginFailure,
    clearError,
} = authSlice.actions;

export function loginAsync(body, cb) {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const response = await axios.post('https://backend-ada-8su2.vercel.app/auth/signin', body);
            const token = response.data.token;
            const decoded = jwtDecode(token);
            dispatch(loginSuccess(decoded));
            cb();
        } catch (error) {
            if (error.response) {
                return dispatch(loginFailure(error.response.data.message))
            }
            return dispatch(loginFailure(`${error.message}`));
        }
    };
}

export function register(body, cb) {
    return async (dispatch) => {
        dispatch(loginRequest());
        try{
            const response = await axios.post('https://backend-ada-8su2.vercel.app/auth/signup', body);
            console.log(response)

        }catch (error) {
            return dispatch(loginFailure(`${error.message}`))
        }
    }
}

export function logoutAsync() {
    return async (dispatch) => {
        dispatch(loginRequest());
        setTimeout(() => {
            dispatch(logout());
        }, 10000);
    };
}

export function clearErrorAfterDelay(delay) {
    return async (dispatch) => {
        setTimeout(() => {
            dispatch(clearError());
        }, delay)
    };
}

export const authReducer = authSlice.reducer;
