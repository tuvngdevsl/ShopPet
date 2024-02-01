import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config, configHeaderCustomer } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);
  return response.data.data;
};

const createProduct = async (product: any) => {
  const response = await axios.post(`${base_url}product/`, product, config);
  return response.data;
};

const getProduct = async (id: any) => {
  const response = await axios.get(`${base_url}product/${id}`);
  return response.data.data;
};

const updateProduct = async (Product: any) => {
  const response = await axios.put(
    `${base_url}product/${Product.id}`,
    {
      title: Product.productData.title,
      description: Product.productData.description,
      price: Product.productData.price,
      brand: Product.productData.brand,
      category: Product.productData.category,
      tags: Product.productData.tags,
      colors: Product.productData.colors,
      quantity: Product.productData.quantity,
      images: Product.productData.images
    },
    config
  );
  return response.data.data;
};

const deleteProduct = async (id: any) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  return response.data.data;
};

const addToWishList = async (prodId: any) => {
  const response = await axios.put(`${base_url}product/wishlist`, { prodId }, configHeaderCustomer);
  return response.data.data;
};

const productService = {
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  addToWishList
};

export default productService;
