import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getEnquiry = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

const deleteAEnquiry = async (id: string) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const getAEnquiry = async (id: string) => {
  const response = await axios.get(`${base_url}enquiry/${id}`, config);
  return response.data;
};

const updateEnquiry = async (enq: any) => {
  const response = await axios.put(
    `${base_url}enquiry/${enq.id}`,
    {
      status: enq.enqData
    },
    config
  );
  return response.data;
};

const enquiryServices = {
  getEnquiry,
  deleteAEnquiry,
  getAEnquiry,
  updateEnquiry
};

export default enquiryServices;
