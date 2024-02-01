import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";
import { Coupon } from "../../types/coupon.type";

const getCoupons = async () => {
  const response = await axios.get(`${base_url}coupon`, config);
  return response.data.data;
};

const createCoupon = async (data: Coupon) => {
  const response = await axios.post(`${base_url}coupon`, data, config);
  return response.data.data;
};

const getCoupon = async (id: string) => {
  const response = await axios.get(`${base_url}coupon/${id}`, config);
  return response.data.data;
};

const updateCoupon = async (data: any) => {
  const response = await axios.put(
    `${base_url}coupon/${data.id}`,
    {
      name: data.couponData.name,
      expiry: data.couponData.expiry,
      discount: data.couponData.discount
    },
    config
  );
  return response.data.data;
};

const deleteCoupon = async (id: string) => {
  const response = await axios.delete(`${base_url}coupon/${id}`, config);
  return response.data.data;
};

const couponService = {
  getCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon
};

export default couponService;
