import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bCategoryService from "./bCategoryService";
import { bCategory } from "../../types/bCategory.type";

interface BCategoryState {
  bCategories: bCategory[];
  bCategoryTitle: string;
  createdbCategory: any;
  updatedbCategory: any;
  deletedbCategory: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

export const createbCategory = createAsyncThunk(
  "/blogCategory/create-bCategory",
  (data: any, thunkApi) => {
    try {
      return bCategoryService.createbCategory(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getBlogCategories = createAsyncThunk(
  "/blogCategory/get-blogCategories",
  (_, thunkApi) => {
    try {
      return bCategoryService.getBlogCategories();
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getBlogCategory = createAsyncThunk(
  "/blogCategory/get-bCategory",
  (id: any, thunkApi) => {
    try {
      return bCategoryService.getbCategory(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const updateBCategory = createAsyncThunk(
  "/blogCategory/update-bCategory",
  (data: any, thunkApi) => {
    try {
      return bCategoryService.updatebCategory(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deletebCategory = createAsyncThunk(
  "/blogCategory/delete-bCategory",
  (id: string, thunkApi) => {
    try {
      return bCategoryService.deletebCategory(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: BCategoryState = {
  bCategories: [],
  bCategoryTitle: "",
  createdbCategory: null,
  updatedbCategory: null,
  deletedbCategory: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
};

export const resetState = createAction("Reset_all");

const bCategorySlice = createSlice({
  name: "bCategories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBlogCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.bCategories = action.payload;
      })
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(createbCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(createbCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.createdbCategory = action.payload;
      })
      .addCase(createbCategory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(getBlogCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.bCategoryTitle = action.payload.title;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(updateBCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateBCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedbCategory = action.payload;
      })
      .addCase(updateBCategory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(deletebCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(deletebCategory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.deletedbCategory = action.payload;
      })
      .addCase(deletebCategory.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default bCategorySlice.reducer;
