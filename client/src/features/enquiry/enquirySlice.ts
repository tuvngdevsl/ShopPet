import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import enquiryServices from "./enquiryServices";
import { Enquiry } from "../../types/enquiry.type";

interface EnquiryState {
  enquiries: Enquiry[];
  isLoading: boolean;
  updatedEnquiry: any;
  enqName: string;
  enqPhone: string;
  enqEmail: string;
  enqComment: string;
  enqStatus: string;
  deletedEnquiry: any;
  isSuccess: boolean;
  isError: boolean;
  message: string;
}

export const getEnquiries = createAsyncThunk("/enquiry/get-enquiries", async (_, thunkApi) => {
  try {
    return await enquiryServices.getEnquiry();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteAEnquiry = createAsyncThunk(
  "/enquiry/delete-enquiry",
  async (id: string, thunkApi) => {
    try {
      return await enquiryServices.deleteAEnquiry(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAEnquiry = createAsyncThunk(
  "/enquiry/get-enquiry",
  async (id: string, thunkApi) => {
    try {
      return await enquiryServices.getAEnquiry(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "/enquiry/update-enquiry",
  async (enq: any, thunkApi) => {
    try {
      return await enquiryServices.updateEnquiry(enq);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState: EnquiryState = {
  enquiries: [],
  isLoading: false,
  enqName: "",
  enqPhone: "",
  enqEmail: "",
  enqComment: "",
  enqStatus: "",
  updatedEnquiry: null,
  deletedEnquiry: null,
  isSuccess: false,
  isError: false,
  message: ""
};

const enquirySlice = createSlice({
  name: "enquiry",
  initialState,
  reducers: {},
  extraReducers: builders => {
    builders
      .addCase(getEnquiries.pending, state => {
        state.isLoading = true;
      })
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.enquiries = action.payload;
      })
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteAEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(getAEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.enqName = action.payload.name;
        state.enqPhone = action.payload.phone;
        state.enqEmail = action.payload.email;
        state.enqComment = action.payload.comment;
        state.enqStatus = action.payload.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(updateEnquiry.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default enquirySlice.reducer;
