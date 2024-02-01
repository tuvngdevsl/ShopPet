import orderService from "./orderServices";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOrders = createAsyncThunk("/order/get-orders", async (_, thunkApi) => {
  try {
    return await orderService.getOrders();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getOrderByUser = createAsyncThunk("/order/get-order", async (id: string, thunkApi) => {
  try {
    return await orderService.getOrder(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState = {
  orders: [],
  orderByUser: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrders.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.orders = action.payload;
        state.message = "success";
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(getOrderByUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(getOrderByUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.orderByUser = action.payload;
        state.message = "success";
      })
      .addCase(getOrderByUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      });
  }
});

export default orderSlice.reducer;
