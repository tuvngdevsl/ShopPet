import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const createBrand = async (data: any) => {
  const response = await axios.post(`${base_url}brand`, data, config);
  return response.data.data;
};

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand`);
  return response.data.data;
};

const getBrand = async (id: any) => {
  const response = await axios.get(`${base_url}brand/${id}`);
  return response.data.data;
};

const updateBrand = async (brand: any) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    config
  );
  return response.data.data;
};

const deleteBrand = async (id: any) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  return response.data.data;
};

const brandService = { getBrands, createBrand, getBrand, updateBrand, deleteBrand };

export default brandService;
