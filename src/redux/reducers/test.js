import {createSlice} from '@reduxjs/toolkit';

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

export function loginAsync(cb) {
    return async (dispatch) => {
        dispatch(loginRequest()); // Dispatch loginRequest action to set loading to true
        try {
            // Simulating an asynchronous login request
            setTimeout(() => {
                dispatch(loginSuccess({user: 'mer'})); // Dispatch loginSuccess after a delay
                cb();
            }, 10000);
        } catch (error) {
            dispatch(loginFailure(error)); // Dispatch loginFailure if an error occurs
        }
    };
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
