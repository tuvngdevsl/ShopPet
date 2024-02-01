import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { Color } from "../../types/color.type";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/`);
  return response.data.data;
};

const createColor = async (data: Color) => {
  const response = await axios.post(`${base_url}color/`, data, config);
  return response.data;
};

const getColor = async (id: string) => {
  const response = await axios.get(`${base_url}color/${id}`);
  return response.data.data;
};

const updateColor = async (data: any) => {
  const response = await axios.put(
    `${base_url}color/${data.id}`,
    {
      title: data.colorData.title
    },
    config
  );
  return response.data.data;
};

const deleteColor = async (id: string) => {
  const response = await axios.delete(`${base_url}color/${id}`, config);
  return response.data.data;
};

const categoryService = {
  getColors,
  getColor,
  createColor,
  updateColor,
  deleteColor
};
export default categoryService;
