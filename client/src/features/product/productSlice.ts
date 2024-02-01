import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productServices";
import { Product } from "../../types/product.type";

interface ProductState {
  products: Product[];
  addToWishList: any;
  createdProduct: any;
  updatedProduct: any;
  productTitle: string;
  productDescription: string;
  productPrice: string;
  productBrand: string;
  productCategory: string;
  productTags: string;
  productColor: any;
  productQuantity: string;
  productImages: string;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}
export const getProducts = createAsyncThunk("product/get-products", async (_, thunkApi) => {
  try {
    return await productService.getProducts();
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const createProducts = createAsyncThunk(
  "product/create-products",
  async (productData: any, thunkApi) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk("product/get-product", async (id: any, thunkApi) => {
  try {
    return await productService.getProduct(id);
  } catch (error) {
    return thunkApi.rejectWithValue(error);
  }
});

export const updateAProduct = createAsyncThunk(
  "product/update-product",
  async (data: any, thunkApi) => {
    try {
      return await productService.updateProduct(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "/product/delete-product",
  async (id: any, thunkApi) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "/product/wishlist",
  async (productId: any, thunkApi) => {
    try {
      return await productService.addToWishList(productId);
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const initialState: ProductState = {
  products: [],
  createdProduct: null,
  updatedProduct: null,
  addToWishList: null,
  productTitle: "",
  productDescription: "",
  productPrice: "",
  productBrand: "",
  productCategory: "",
  productTags: "",
  productColor: null,
  productQuantity: "",
  productImages: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};
export const resetState = createAction("Reset_all");
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: buider => {
    buider
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "";
      })
      .addCase(createProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.createdProduct = action.payload;
      })
      .addCase(createProducts.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "";
      })
      .addCase(getAProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.productTitle = action.payload.title;
        state.productDescription = action.payload.description;
        state.productPrice = action.payload.price;
        state.productBrand = action.payload.brand;
        state.productCategory = action.payload.category;
        state.productTags = action.payload.tags;
        state.productColor = action.payload.color;
        state.productQuantity = action.payload.quantity;
        state.productImages = action.payload.images;
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(updateAProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateAProduct.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.updatedProduct = action.payload;
      })
      .addCase(updateAProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, state => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(addToWishList.pending, state => {
        state.isLoading = true;
      })
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isError = false;
        state.isLoading = false;
        state.addToWishList = action.payload;
        state.message = "Product Added to Wishlist";
      })
      .addCase(addToWishList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error.message || "";
      })
      .addCase(resetState, () => initialState);
  }
});
export default productSlice.reducer;
