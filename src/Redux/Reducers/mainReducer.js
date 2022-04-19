import { createSlice } from '@reduxjs/toolkit';

export const mainslice = createSlice({
    name: 'main',
    fun: false,

    initialState: {
        s_id: "10",
        stf_name: 'Haris',
        loc_id: '3',
        stf_id: '11',
        select: 'Burger',
        item_value: '1',
        poss_end: true,
        sale_his: 4,
        sel: 0,
        saleClose: [{ "created_at": "2021-05-06 18:16:54", "end_sell": "0", "end_time": "06:16:55", "id": 31, "open_sell": null, "start_time": "17:46:00", "stf_id": "8", "updated_at": "2021-05-06 18:16:54" }],
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
        },
        Stf_ID: (state, action) => {
            state.stf_id = action.payload;
        },
        SaleClose: (state, action) => {
            state.saleClose = action.payload;
        },
        SetSelect: (state, action) => {
            state.select = action.payload;
        },
        SetItem_value: (state, action) => {
            state.item_value = action.payload;
        },
        SetPoss_end: (state, action) => {
            state.poss_end = action.payload;
        },
        SetSale_his: (state, action) => {
            state.sale_his = action.payload;
        },
        SetSel: (state, action) => {
            state.sel = action.payload;
        },
    }
})

export const {
    Stf_id,
    Call,
    Stf_Name,
    Loc_ID,
    Stf_ID,
    SaleClose,
    SetSelect,
    SetItem_value,
    SetPoss_end,
    SetSale_his,
    SetSel,
} = mainslice.actions

export default mainslice.reducer;