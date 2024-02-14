import { createSlice } from '@reduxjs/toolkit';

const accountOpeningSlice = createSlice({
    name: 'accountopening',
    initialState: {
        data: {},
    },
    reducers: {
        setAccountOpeningData: (state, action) => {
            state.data = { ...state.data, ...action.payload };
        },

        clearAccountOpeningData: (state, action) => {
            state.data = {};
        },
    },
});

export const accountOpeningReducer = accountOpeningSlice.reducer;

export const { clearAccountOpeningData, setAccountOpeningData } = accountOpeningSlice.actions;
