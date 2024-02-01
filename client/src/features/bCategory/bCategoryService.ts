import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { bCategory } from "../../types/bCategory.type";

const createbCategory = async (data: bCategory) => {
  const response = await axios.post(`${base_url}blogCategory/`, data, config);
  return response.data.data;
};

const getBlogCategories = async () => {
  const response = await axios.get(`${base_url}blogCategory/`);
  return response.data.data;
};

const getbCategory = async (id: string) => {
  const response = await axios.get(`${base_url}blogCategory/${id}`);
  return response.data.data;
};

const updatebCategory = async (data: any) => {
  const response = await axios.put(
    `${base_url}blogCategory/${data.id}`,
    {
      title: data.bCategoryData.title
    },
    config
  );
  return response.data.data;
};

const deletebCategory = async (id: string) => {
  const response = await axios.delete(`${base_url}blogCategory/${id}`, config);
  return response.data.data;
};

const bCategoryService = {
  getBlogCategories,
  createbCategory,
  getbCategory,
  updatebCategory,
  deletebCategory
};
export default bCategoryService;
