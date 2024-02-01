import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";
import { Brand } from "../../types/brand.type";

interface BrandState {
  brands: Brand[];
  createdBrand: any;
  updatedBrand: any;
  deletedBrand: any;
  brandName: string;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

export const getBrands = createAsyncThunk("brand/get-brands", async (_, thunkApi) => {
  try {
    return await brandService.getBrands();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createBrands = createAsyncThunk(
  "brand/create-brand",
  async (dataBrand: any, thunkApi) => {
    try {
      return await brandService.createBrand(dataBrand);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getABrand = createAsyncThunk("brand/getABrand", async (id: any, thunkApi) => {
  try {
    return await brandService.getBrand(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateABrand = createAsyncThunk("brand/updateABrand", async (data: any, thunkApi) => {
  try {
    return await brandService.updateBrand(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteBrand = createAsyncThunk("/brand/delete-brand", async (id: any, thunkApi) => {
  try {
    return await brandService.deleteBrand(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState: BrandState = {
  brands: [],
  brandName: "",
  createdBrand: null,
  updatedBrand: null,
  deletedBrand: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ""
};
export const resetState = createAction("Reset_all");
export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBrands.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.brands = action.payload;
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(createBrands.pending, state => {
        state.isLoading = true;
      })
      .addCase(createBrands.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.createdBrand = action.payload;
      })
      .addCase(createBrands.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(getABrand.pending, state => {
        state.isLoading = true;
      })
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.brandName = action.payload.title;
      })
      .addCase(getABrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(updateABrand.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateABrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedBrand = action.payload;
      })
      .addCase(updateABrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteBrand.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default brandSlice.reducer;
