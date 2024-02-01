import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";
import { Coupon } from "../../types/coupon.type";

interface CouponState {
  coupons: Coupon[];
  couponName: string;
  expiryName: string;
  discountName: string;
  createdCoupon: any;
  updatedCoupon: any;
  deletedCoupon: any;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

export const getCoupons = createAsyncThunk("/coupon/get-coupons", async (_, thunkApi) => {
  try {
    return couponService.getCoupons();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCoupon = createAsyncThunk(
  "/coupon/create-coupon",
  async (dataCoupon: any, thunkApi) => {
    try {
      return await couponService.createCoupon(dataCoupon);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getCoupon = createAsyncThunk("/coupon/get-coupon", (id: any, thunkApi) => {
  try {
    return couponService.getCoupon(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const updateCoupon = createAsyncThunk("/coupon/update-coupon", (data: any, thunkApi) => {
  try {
    return couponService.updateCoupon(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const deleteCoupon = createAsyncThunk("/coupon/delete-coupon", (id: string, thunkApi) => {
  try {
    return couponService.deleteCoupon(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const resetState = createAction("Reset_all");

const initialState: CouponState = {
  coupons: [],
  couponName: "",
  expiryName: "",
  discountName: "",
  createdCoupon: null,
  updatedCoupon: null,
  deletedCoupon: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: ""
};

const couponSlice = createSlice({
  initialState,
  name: "coupon",
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCoupons.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCoupons.fulfilled, (state, action) => {
        (state.isSuccess = true),
          (state.isLoading = false),
          (state.isError = false),
          (state.coupons = action.payload);
      })
      .addCase(getCoupons.rejected, (state, action) => {
        (state.isError = false), (state.message = action.error.message || "");
      })
      .addCase(createCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        (state.isSuccess = true),
          (state.isLoading = false),
          (state.isError = false),
          (state.createdCoupon = action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        (state.isError = false), (state.message = action.error.message || "");
      })
      .addCase(getCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.couponName = action.payload.name;
        state.expiryName = action.payload.expiry;
        state.discountName = action.payload.discount;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(updateCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedCoupon = action.payload;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteCoupon.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.deletedCoupon = action.payload;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default couponSlice.reducer;
