import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAEnquiry,
  getEnquiries,
  resetState,
  updateEnquiry
} from "../../../features/enquiry/enquirySlice";
import { AppDispatch, RootState } from "../../../app/store";
import { Link } from "react-router-dom";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import CustomModal from "../../../components/Modal";
import Meta from "../../../components/Meta";
import { toast } from "react-toastify";
interface EnquiryProps {}
const columns = [
  {
    title: "No",
    dataIndex: "key"
  },
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Email",
    dataIndex: "email"
  },
  {
    title: "Phone",
    dataIndex: "phone"
  },
  {
    title: "Status",
    dataIndex: "status"
  },
  {
    title: "Action",
    dataIndex: "action"
  }
];

const Enquiries: React.FC<EnquiryProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [enquiryId, setEnquiryId] = useState<string>("");

  const showModal = (id: string) => {
    setOpen(true);
    setEnquiryId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, [dispatch]);

  const enquiryState = useSelector((state: RootState) => state.enquiry.enquiries);

  const setEnquiryStatus = (e: any, id: string) => {
    const data = {
      id: id,
      enqData: e
    };

    dispatch(updateEnquiry(data));
  };
  const deleteEnquiry = async (id: string) => {
    await dispatch(deleteAEnquiry(id));
    setOpen(false);
    toast.success("Delete enquiry successfully!");
    dispatch(getEnquiries());
  };
  const data = enquiryState.map((enquiry, index) => ({
    key: index + 1,
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone,
    status: (
      <>
        <select
          name=""
          defaultValue={enquiry.status ? enquiry.status : "Submitted"}
          className="form-control form-select"
          id=""
          onChange={e => setEnquiryStatus(e.target.value, enquiry._id)}
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </>
    ),
    action: (
      <>
        <Link className="ms-3 fs-2 text-danger" to={`/admin/enquiries/${enquiry._id}`}>
          <AiOutlineEye />
        </Link>
        <button
          className="ms-3 fs-2 text-danger bg-transparent border-0"
          onClick={() => showModal(enquiry._id)}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  return (
    <>
      <Meta title={"List Enquiry"} />
      <div>
        <h3 className="mb-4">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          title="Are you want to delete this enquiry?"
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteEnquiry(enquiryId);
          }}
        />
      </div>
    </>
  );
};

export default Enquiries;
