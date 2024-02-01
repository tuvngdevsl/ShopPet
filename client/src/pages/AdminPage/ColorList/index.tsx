import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { deleteColor, getColors, resetState } from "../../../features/color/colorSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import CustomModal from "../../../components/Modal";
import Meta from "../../../components/Meta";

interface ColorListProps {}

const ColorList: React.FC<ColorListProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [colorId, setColorId] = useState<string>("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, [dispatch]);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setColorId(id);
  };

  const handleDeleteColor = async (id: string) => {
    await dispatch(deleteColor(id));
    toast.success("Delete Blog Category successfully!");
    setIsModalOpen(false);
    dispatch(getColors());
  };

  const colorState = useSelector((state: RootState) => state.color.colors);

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
      title: "Action",
      dataIndex: "action"
    }
  ];

  const data = colorState.map((color, index) => ({
    key: index + 1,
    title: color.title,

    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/color/${color._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger border-0 bg-transparent"
          onClick={() => {
            showModal(color._id);
          }}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  return (
    <>
      <Meta title={"List Colors"} />
      <div>
        <h3 className="mb-4">Colors</h3>
        <div>
          <Table columns={columns} dataSource={data} />
          <CustomModal
            title="Are you want to delete blog category this!"
            open={isModalOpen}
            hideModal={() => hideModal()}
            performAction={() => {
              handleDeleteColor(colorId);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ColorList;
