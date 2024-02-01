import axios from "axios";
import { config } from "../../utils/axiosConfig";
import { base_url } from "../../utils/base_url";

const uploadImg = async (data: any) => {
  const response = await axios.post(`${base_url}upload`, data, config);
  return response.data;
};

const deleteImg = async (id: any) => {
  const response = await axios.delete(`${base_url}upload/delete-img/${id}`, config);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg
};

export default uploadService;
