import { useEffect, useState } from "react";
import { Table } from "antd";
import { deleteCoupon, getCoupons, resetState } from "../../../features/coupon/couponSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import CustomModal from "../../../components/Modal";
import Meta from "../../../components/Meta";

interface CouponListProps {}
const columns = [
  {
    title: "No",
    dataIndex: "key"
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: any, b: any) => a.title.length - b.title.length
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a: any, b: any) => a.expiry.length - b.expiry.length
  },
  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a: any, b: any) => a.discount - b.discount
  },
  {
    title: "Action",
    dataIndex: "action"
  }
];

const CouponList: React.FC<CouponListProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [couponId, setCouponId] = useState<string>("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, [dispatch]);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setCouponId(id);
  };

  const handleDeleteColor = async (id: string) => {
    await dispatch(deleteCoupon(id));
    toast.success("Delete Blog Category successfully!");
    setIsModalOpen(false);
    dispatch(getCoupons());
  };

  const couponState = useSelector((state: RootState) => state.coupon.coupons);

  const data = couponState.map((coupon, index) => ({
    key: index + 1,
    title: coupon.name,
    expiry: new Date(coupon.expiry).toLocaleString(),
    discount: coupon.discount,
    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/coupon/${coupon._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger border-0 bg-transparent"
          onClick={() => {
            showModal(coupon._id);
          }}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  return (
    <>
      <Meta title={"List Coupons"} />
      <div>
        <h3 className="mb-4">Coupon</h3>
        <div>
          <Table columns={columns} dataSource={data} />
          <CustomModal
            title="Are you want to delete blog category this!"
            open={isModalOpen}
            hideModal={() => hideModal()}
            performAction={() => {
              handleDeleteColor(couponId);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CouponList;
