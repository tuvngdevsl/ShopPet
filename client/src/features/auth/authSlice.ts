import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

const userItem = localStorage.getItem("user");
const customerItem = localStorage.getItem("customer");
const getUserfromLocalStorage = userItem ? JSON.parse(userItem) : null;
const getCustomerfromLocalStorage = customerItem ? JSON.parse(customerItem) : null;

const initialState = {
  user: getUserfromLocalStorage,
  customer: getCustomerfromLocalStorage,
  wistlist: null,
  isError: false,
  userRegisted: null,
  isLoading: false,
  isSuccess: false,
  message: ""
};

export const login = createAsyncThunk("auth/admin-login", async (user: any, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const register = createAsyncThunk("auth/register", async (user: any, thunkApi) => {
  try {
    return await authService.register(user);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const userLogin = createAsyncThunk("auth/user-login", async (user: any, thunkApi) => {
  try {
    return await authService.userLogin(user);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getUserProductWishlist = createAsyncThunk("user/wishlist", async (_, thunkApi) => {
  try {
    return await authService.getUserWishlist();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const resetStore = createAction("Reset_all");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        // state.customer = action.payload;
      })
      .addCase(login.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userRegisted = action.payload;
      })
      .addCase(register.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.userRegisted = null;
      })
      .addCase(userLogin.pending, state => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customer = action.payload;
        toast.info("customer Logged in successfully");
      })
      .addCase(userLogin.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.userRegisted = null;
      })
      .addCase(getUserProductWishlist.pending, state => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wistlist = action.payload;
      })
      .addCase(getUserProductWishlist.rejected, state => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.userRegisted = null;
      })
      .addCase(resetStore, () => initialState);
  }
});

export default authSlice.reducer;
