import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";
import { Blog } from "../../types/blog.type";

interface BlogState {
  blogs: Blog[];
  blogTitle: string;
  blogCategory: string;
  blogDescription: string;
  blogImages: string;
  createdBlog: any;
  updatedBlog: any;
  deletedBlog: any;
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  message: string;
}

export const getBlogs = createAsyncThunk("/blog/get-blogs", (_, thunkApi) => {
  try {
    return blogService.getBlogs();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createBlog = createAsyncThunk("/blog/create-blog", (dataBlog: any, thunkApi) => {
  try {
    return blogService.createBlog(dataBlog);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const getABlog = createAsyncThunk("blog/get-blog", async (id: any, thunkApi) => {
  try {
    return await blogService.getBlog(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateABlog = createAsyncThunk("blog/update-blog", async (data: any, thunkApi) => {
  try {
    return await blogService.updateBlog(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const deleteBlog = createAsyncThunk("/blog/delete-blog", async (id: any, thunkApi) => {
  try {
    return await blogService.deleteBlog(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

const initialState: BlogState = {
  blogs: [],
  blogTitle: "",
  blogDescription: "",
  createdBlog: null,
  deletedBlog: null,
  updatedBlog: null,
  blogImages: "",
  blogCategory: "",
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: ""
};

export const resetState = createAction("Reset_all");
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBlogs.pending, state => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(createBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.createdBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.isLoading = false;
        state.message = action.error.message || "";
      })
      .addCase(getABlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.blogTitle = action.payload.title;
        state.blogCategory = action.payload.category;
        state.blogDescription = action.payload.description;
        state.blogImages = action.payload.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(updateABlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedBlog = action.payload;
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteBlog.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.deletedBlog = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});

export default blogSlice.reducer;
