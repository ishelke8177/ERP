import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import config from '../config/config.json'
import { handleImageDelete, handleImageUpload } from "../utils/helper";

// Items //

export const fetchFoodItems = createAsyncThunk("fetchFoodItems", async () => {
    const resp = await axios.get(`${config.HOST_LINK}/items`)
    return resp?.data;
});

export const fetchItemById = createAsyncThunk("fetchItemById", async (itemId) => {
    const resp = await axios.get(`${config.HOST_LINK}/items/${itemId}`)
    return resp?.data;
});

export const updateItemById = createAsyncThunk("updateItemById", async ({ itemId, values, imageFile }) => {
    try {
        const resp = await axios.put(`${config.HOST_LINK}/items/${itemId}`, values)
        handleImageDelete(values?.image_name);
        handleImageUpload(imageFile)
        toast.success('Item Updated')
        return resp?.data;
    } catch (error) {
        toast.error('Failed to Update')
        console.log(error);
    }
});

export const deleteFoodItem = createAsyncThunk("deleteFoodItem", async (itemId) => {
    try {
        const resp = await axios.delete(`${config.HOST_LINK}/items/${itemId}`)
        handleImageDelete(resp?.data?.image_name)
        if(resp?.status === 200){
            toast.success('Item Deleted.')
        }
        return resp?.data;
    } catch (error) {
        toast.error('Failed to delete.')
    }
});

export const addFoodItem = createAsyncThunk("addFoodItem", async (itemObj) => {
    const resp = await axios.post(`${config.HOST_LINK}/items`, itemObj)
    return resp?.data;
});

// Orders //

export const orderItem = createAsyncThunk("orderItem", async (itemObj) => {
    try {
        const resp = await axios.post(`${config.HOST_LINK}/orders`, itemObj)

        if(resp?.status === 201){
            toast.success('Order Placed')
        }
        return resp?.data;
    } catch (error) {
        toast.error('Something Wrong, Try Later.')
        console.log(error);
    }
});

export const getOrderItems = createAsyncThunk("getOrderItems", async () => {
    const resp = await axios.get(`${config.HOST_LINK}/orders`)
    return resp?.data;
});