import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";
import { Upload } from "../../types/upload.type";

interface UploadState {
  images: Upload[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
export const uploadImg = createAsyncThunk("upload/images", async (data: any, thunkApi) => {
  try {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append("images", data[i]);
    }
    return await uploadService.uploadImg(formData);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const delImg = createAsyncThunk("delete/images", async (id: any, thunkApi) => {
  try {
    await uploadService.deleteImg(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState: UploadState = {
  images: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(uploadImg.pending, state => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.images = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "";
      })
      .addCase(delImg.pending, state => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, state => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.images = [];
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.message = action.error.message || "";
      });
  }
});
export default uploadSlice.reducer;
