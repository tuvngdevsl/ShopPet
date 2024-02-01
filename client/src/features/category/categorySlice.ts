import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";
import { Category } from "../../types/category.type";

interface CategoryState {
  categories: Category[];
  createdCategory: any;
  categoryName: string;
  updatedCategory: any;
  deletedCategory: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

export const getCategories = createAsyncThunk("/category/get-categories", async (_, thunkApi) => {
  try {
    return await categoryService.getCategories();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createCategory = createAsyncThunk(
  "/category/create-category",
  async (dataCategory: any, thunkApi) => {
    try {
      return await categoryService.createCategory(dataCategory);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getACategory = createAsyncThunk(
  "/category/get-category",
  async (id: string, thunkApi) => {
    try {
      return await categoryService.getACategory(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateACategory = createAsyncThunk(
  "/category/update-category",
  async (dataCategory: any, thunkApi) => {
    try {
      return await categoryService.updateCategory(dataCategory);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteACategory = createAsyncThunk(
  "/category/delete-category",
  async (id: any, thunkApi) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: CategoryState = {
  categories: [],
  categoryName: "",
  createdCategory: null,
  updatedCategory: null,
  deletedCategory: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
};
export const resetState = createAction("Reset_all");
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCategories.pending, state => {
        state.isLoading = true;
      })
      .addCase(getCategories.fulfilled, (state, action: any) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(createCategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action: any) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(getACategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(getACategory.fulfilled, (state, action: any) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.categoryName = action.payload.title;
      })
      .addCase(getACategory.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(updateACategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateACategory.fulfilled, (state, action: any) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedCategory = action.payload;
      })
      .addCase(updateACategory.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteACategory.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteACategory.fulfilled, (state, action: any) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteACategory.rejected, (state, action: any) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default categorySlice.reducer;
