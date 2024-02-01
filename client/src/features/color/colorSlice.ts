import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";
import { Color } from "../../types/color.type";

interface ColorState {
  colors: Color[];
  colorTitle: string;
  createdColor: any;
  updatedColor: any;
  deletedColor: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}
export const getColors = createAsyncThunk("/color/get-colors", (_, thunkApi) => {
  try {
    return colorService.getColors();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createColor = createAsyncThunk(
  "/color/create-color",
  async (dataColor: any, thunkApi) => {
    try {
      return await colorService.createColor(dataColor);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getColor = createAsyncThunk("/blogCategory/get-bCategory", (id: any, thunkApi) => {
  try {
    return colorService.getColor(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});
export const updateColor = createAsyncThunk(
  "/blogCategory/update-bCategory",
  (data: any, thunkApi) => {
    try {
      return colorService.updateColor(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteColor = createAsyncThunk(
  "/blogCategory/delete-bCategory",
  (id: string, thunkApi) => {
    try {
      return colorService.deleteColor(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: ColorState = {
  colors: [],
  createdColor: null,
  colorTitle: "",
  updatedColor: null,
  deletedColor: null,
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
};
export const resetState = createAction("Reset_all");
const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getColors.pending, state => {
        state.isLoading = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(createColor.pending, state => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.createdColor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(getColor.pending, state => {
        state.isLoading = true;
      })
      .addCase(getColor.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.colorTitle = action.payload.title;
      })
      .addCase(getColor.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(updateColor.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedColor = action.payload;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteColor.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.deletedColor = action.payload;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default colorSlice.reducer;
