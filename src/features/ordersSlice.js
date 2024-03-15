import { createSlice } from "@reduxjs/toolkit";
import { getOrderItems, orderItem } from "./apiCalls";

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        isLoading: false,
        ordersArr: [],
        isSuccess: false,
        isError: false
    },
    extraReducers: (builder) => {
        //add order
        builder.addCase(orderItem.pending, (state, action) => {
            state.isLoading = true;
            state.isSuccess = false
        })
        builder.addCase(orderItem.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ordersArr.push(action.payload);
            state.isSuccess = true
        })
        builder.addCase(orderItem.rejected, (state, action) => {
            state.isError = true;
            state.isSuccess = false
        })

        // fetch order
        builder.addCase(getOrderItems.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getOrderItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.ordersArr = action.payload;
        })
        builder.addCase(getOrderItems.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default ordersSlice.reducer;