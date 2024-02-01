import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerServices";
import { Customer } from "../../types/customer.type";

export const getUsers = createAsyncThunk("customer/get-customer", async (_, thunkAPI) => {
  try {
    return await customerService.getUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

interface CustomerState {
  customers: Customer[];
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: CustomerState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
};

const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUsers.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message || "";
      });
  }
});

export default customerSlice.reducer;
