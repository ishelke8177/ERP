import { createSlice } from "@reduxjs/toolkit";
import { deleteFoodItem, fetchFoodItems, fetchItemById, updateItemById } from "./apiCalls";

const foodItemSlice = createSlice({
    name: 'foodItems',
    initialState: {
        isLoading: false,
        items: [],
        item : null,
        isError: false
    },
    extraReducers: (builder) => {
        // fetch
        builder.addCase(fetchFoodItems.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchFoodItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.items = action.payload;
        })
        builder.addCase(fetchFoodItems.rejected, (state, action) => {
            state.isError = true;
        })

        // delete
        builder.addCase(deleteFoodItem.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(deleteFoodItem.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedItemId = action.payload.id; // Assuming the payload contains the ID of the deleted item
            state.items = state.items.filter(item => item.id !== deletedItemId);
        })
        builder.addCase(deleteFoodItem.rejected, (state, action) => {
            state.isError = true;
        })

        // get by id
        builder.addCase(fetchItemById.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchItemById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.item = action.payload;
        })
        builder.addCase(fetchItemById.rejected, (state, action) => {
            state.isError = true;
        })

        //update
        builder.addCase(updateItemById.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(updateItemById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.item = action.payload;

            const updatedIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (updatedIndex !== -1) {
              state.items[updatedIndex] = action.payload;
            }
        })
        builder.addCase(updateItemById.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default foodItemSlice.reducer;