import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { Category } from "../../types/category.type";

const getCategories = async () => {
  const response = await axios.get(`${base_url}category`);
  return response.data.data;
};

const createCategory = async (data: Category) => {
  const response = await axios.post(`${base_url}category`, data, config);
  return response.data.data;
};

const getACategory = async (id: string) => {
  const response = await axios.get(`${base_url}category/${id}`);
  return response.data.data;
};

const updateCategory = async (data: any) => {
  const response = await axios.put(
    `${base_url}category/${data.id}`,
    {
      title: data.categoryData.title
    },
    config
  );
  return response.data.data;
};

const deleteCategory = async (id: any) => {
  const response = await axios.delete(`${base_url}category/${id}`, config);
  return response.data.data;
};

const categoryService = {
  getCategories,
  createCategory,
  getACategory,
  updateCategory,
  deleteCategory
};
export default categoryService;
