import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getOrders = async () => {
  const response = await axios.get(`${base_url}user/get-orders`, config);
  return response.data.data;
};

const getOrder = async (id: string) => {
  const response = await axios.post(`${base_url}user/getorderbyuser/${id}`, "", config);
  return response.data.data;
};

const orderService = {
  getOrders,
  getOrder
};

export default orderService;
