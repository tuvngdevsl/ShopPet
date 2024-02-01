import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AppDispatch } from "../../../app/store";
import {
  deleteACategory,
  getCategories,
  resetState
} from "../../../features/category/categorySlice";
import { RootState } from "../../../app/store";
import Meta from "../../../components/Meta";
import CustomModal from "../../../components/Modal";
import { toast } from "react-toastify";

interface CategoryListProps {}

const CategoryList: React.FC<CategoryListProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setCategoryId(id);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const categoriesState = useSelector((state: RootState) => state.category.categories);
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

  const data = categoriesState.map((category, index) => ({
    key: index + 1,
    title: category.title,
    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/category/${category._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger border-0 bg-transparent"
          onClick={() => showModal(category._id)}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  const delCategory = async (id: string) => {
    try {
      await dispatch(deleteACategory(id));
      toast.success("Delete category successfully!");
      dispatch(getCategories());
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("An error occurred while deleting category");
    }
  };

  return (
    <>
      <Meta title={"List Product Category"} />
      <div>
        <h3 className="mb-4">Product Categories</h3>
        <div>
          <Table columns={columns} dataSource={data} />
          <CustomModal
            title="Are you sure you want to delete this category?"
            open={isModalOpen}
            hideModal={hideModal}
            performAction={() => delCategory(categoryId)}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryList;
