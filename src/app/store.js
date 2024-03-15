import { configureStore } from "@reduxjs/toolkit";
import ordersSlice from "../features/ordersSlice";
import foodItemSlice from "../features/foodItemSlice";

const store = configureStore({
    reducer: {
        foodItems: foodItemSlice,
        orders: ordersSlice
    },
})

export default store;