import { useEffect, useState } from "react";
import { Table } from "antd";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteBrand, getBrands, resetState } from "../../../features/brand/brandSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../../components/Modal";
import Meta from "../../../components/Meta";
import { toast } from "react-toastify";

interface BrandListProps {}

const BrandList: React.FC<BrandListProps> = () => {
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, [dispatch]);

  const brandState = useSelector((state: RootState) => state.brand.brands);

  const showModal = (id: string) => {
    setOpen(true);
    setBrandId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const delBrand = async (id: string) => {
    await dispatch(deleteBrand(id));
    dispatch(getBrands());
    toast.success("Delete brand successfully!");
    setOpen(false);
  };

  const columns = [
    {
      title: "No",
      dataIndex: "key"
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Action",
      dataIndex: "action"
    }
  ];

  const data = brandState?.map((brand, index) => ({
    key: index + 1,
    title: brand.title,
    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/brand/${brand._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger bg-transparent border-0"
          onClick={() => showModal(brand._id)}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  return (
    <>
      <Meta title={"List brand"} />
      <div>
        <h3 className="mb-4">Brands</h3>
        <div>
          <Table columns={columns} dataSource={data} />
        </div>
        <CustomModal
          title="Are you want to delete this brand?"
          hideModal={hideModal}
          open={open}
          performAction={() => {
            delBrand(brandId);
          }}
        />
      </div>
    </>
  );
};

export default BrandList;
