import { useEffect, useState } from "react";
import { Table } from "antd";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deletebCategory,
  getBlogCategories,
  resetState
} from "../../../features/bCategory/bCategorySlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import CustomModal from "../../../components/Modal";
import Meta from "../../../components/Meta";
import { toast } from "react-toastify";

interface BlogCategoryListProps {}

const BlogCatList: React.FC<BlogCategoryListProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bCategoryId, setBCategoryId] = useState<string>("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setBCategoryId(id);
  };

  const handleDeleteBCategory = async (id: string) => {
    await dispatch(deletebCategory(id));
    toast.success("Delete Blog Category successfully!");
    setIsModalOpen(false);
    dispatch(getBlogCategories());
  };

  const bCategoryState = useSelector((state: RootState) => state.bCategory.bCategories);

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

  const data = bCategoryState.map((bCategory, index) => ({
    key: index + 1,
    title: bCategory.title,
    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/blog-category/${bCategory._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger border-0 bg-transparent"
          onClick={() => {
            showModal(bCategory._id);
          }}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));
  return (
    <>
      <Meta title={"List Blog Category"} />
      <div>
        <h3 className="mb-4">Blog Categories</h3>
        <div>
          <Table columns={columns} dataSource={data} />
          <CustomModal
            title="Are you want to delete blog category this!"
            open={isModalOpen}
            hideModal={() => hideModal()}
            performAction={() => {
              handleDeleteBCategory(bCategoryId);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogCatList;
