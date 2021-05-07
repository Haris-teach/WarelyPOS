import { createSlice } from '@reduxjs/toolkit';

export const mainslice = createSlice({
    name: 'main',
    fun: false,

    initialState: {
        s_id: "10",
        stf_name: 'Haris',
        loc_id: '3',
    },
    reducers: {
        Stf_id: (state, action) => {
            state.s_id = action.payload;
        },
        Call: (state, action) => {
            state.fun = action.payload;
        },
        Stf_Name: (state, action) => {
            state.stf_name = action.payload;
        },
        Loc_ID: (state, action) => {
            state.loc_id = action.payload;
        }
    }
})

export const {
    Stf_id,
    Call,
    Stf_Name,
    Loc_ID,
} = mainslice.actions

export default mainslice.reducer;