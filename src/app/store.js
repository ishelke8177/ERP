import { configureStore } from "@reduxjs/toolkit";
import foodItemSlice from "../features/foodItemSlice";
import ordersSlice from "../features/ordersSlice";

const store = configureStore({
    reducer: {
        foodItems: foodItemSlice,
        orders: ordersSlice
    },
})

export default store;