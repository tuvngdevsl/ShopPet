import axios from "axios";
import { base_url } from "../../utils/base_url";
import { configHeaderCustomer } from "../../utils/axiosConfig";

const login = async (userData: any) => {
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const register = async (userData: any) => {
  const response = await axios.post(`${base_url}user/register`, userData);
  if (response.data) {
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
  }
  return response.data.data;
};

const userLogin = async (userData: any) => {
  const response = await axios.post(`${base_url}user/login`, userData);
  if (response.data) {
    localStorage.setItem("customer", JSON.stringify(response.data));
  }
  return response.data.data;
};

const getUserWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, configHeaderCustomer);
  return response.data.data;
};

const authService = {
  login,
  register,
  userLogin,
  getUserWishlist
};

export default authService;
