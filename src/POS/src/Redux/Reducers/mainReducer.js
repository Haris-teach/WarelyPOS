import { createSlice } from '@reduxjs/toolkit';

export const mainslice = createSlice({
    name: 'main',
    fun: false,

    initialState: {
        float_price: 0,
        reLoad: false,
        dis_Zero: 0,
        printer_address: '',
        s_id: "10",
        stf_name: 'Haris',
        loc_id: '3',
        stf_id: '11',
        select: 'Burger',
        item_value: '1',
        poss_end: true,
        sale_his: 5,
        sel: 0,

        total_discount: 0,
        d: 0,
        c_Screen: false,
        customer_id: [{ "address_line_1": null, "address_line_2": null, "id": null, "mobile": null, "name": null }],
        array: [],
        loaded: false,
        subtotal: 0,
        total2: 0,
        dis2: 0,
        allData: [],
        closeSale: true,
        opendrawer: false,
        counter: 0,
        order_dynamic: 129,
        screenSwitch: 'first',
        saleClose: [{ "created_at": "2021-05-06 18:16:54", "end_sell": "0", "end_time": "06:16:55", "id": 31, "open_sell": null, "start_time": "17:46:00", "stf_id": "8", "updated_at": "2021-05-06 18:16:54" }],
    },
    reducers: {
        SetPrinter_Address: (state, action) => {
            state.printer_address = action.payload;
        },
        SetFloat_price: (state, action) => {
            state.float_price = action.payload;
        },
        SetREload: (state, action) => {
            state.reLoad = action.payload;
        },
        SetDis_Zero: (state, action) => {
            state.dis_Zero = action.payload;
        },
        SetOrder_Dynamic: (state, action) => {
            state.order_dynamic = action.payload;
        },
        SetCounter: (state, action) => {
            state.counter = action.payload
        },
        Stf_id: (state, action) => {
            state.s_id = action.payload;
        },
        SetOpen: (state, action) => {
            state.opendrawer = action.payload;
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
        SetD: (state, action) => {
            state.d = action.payload;
        },
        SetTotal_dis: (state, action) => {
            state.total_discount = action.payload;
        },
        SetCustomer_id: (state, action) => {
            state.customer_id = action.payload;
        },
        SetArray: (state, action) => {
            state.array = action.payload;
        },
        SetC_Screen: (state, action) => {
            state.c_Screen = action.payload;
        },
        SetLoaded: (state, action) => {
            state.loaded = action.payload;
        },
        SetSubTotal: (state, action) => {
            state.subtotal = action.payload;
        },
        SetTotal2: (state, action) => {
            state.total2 = action.payload;
        },
        SetDis2: (state, action) => {
            state.dis2 = action.payload;
        },
        SetScreenSwitch: (state, action) => {
            state.screenSwitch = action.payload;
        },
        SetCloseSale: (state, action) => {
            state.closeSale = action.payload;
        },
        SetALLData: (state, action) => {
            state.allData = action.payload;
        },

    }
})

export const {
    SetFloat_price,
    SetREload,
    SetDis_Zero,
    SetOrder_Dynamic,
    SetPrinter_Address,
    SetALLData,
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
    SetD,
    SetTotal_dis,
    SetCustomer_id,
    SetArray,
    SetC_Screen,
    SetLoaded,
    SetSubTotal,
    SetTotal2,
    SetDis2,
    SetOpen,
    SetScreenSwitch,
    SetCloseSale,
    SetCounter,
} = mainslice.actions

export default mainslice.reducer;