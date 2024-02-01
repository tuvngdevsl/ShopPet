import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);
  return response.data.data;
};

const createBlog = async (data: any) => {
  const response = await axios.post(`${base_url}blog/`, data, config);
  return response.data.data;
};

const getBlog = async (id: any) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  return response.data.data;
};

const updateBlog = async (Blog: any) => {
  const response = await axios.put(
    `${base_url}blog/${Blog.id}`,
    {
      title: Blog.blogData.title,
      category: Blog.blogData.category,
      description: Blog.blogData.description,
      images: Blog.blogData.images
    },
    config
  );
  return response.data.data;
};

const deleteBlog = async (id: any) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  return response.data.data;
};

const categoryService = {
  getBlogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog
};
export default categoryService;
