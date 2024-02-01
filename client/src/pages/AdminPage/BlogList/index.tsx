import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { deleteBlog, getBlogs, resetState } from "../../../features/blog/blogSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Meta from "../../../components/Meta";
import CustomModal from "../../../components/Modal";

interface BlogListProps {}

const BlogList: React.FC<BlogListProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bCategoryId, setBCategoryId] = useState<string>("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, [dispatch]);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setBCategoryId(id);
  };

  const handleDeleteBlog = async (id: string) => {
    await dispatch(deleteBlog(id));
    toast.success("Delete Blog successfully!");
    setIsModalOpen(false);
    dispatch(getBlogs());
  };

  const blogState = useSelector((state: RootState) => state.blog.blogs);

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
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "Action",
      dataIndex: "action"
    }
  ];

  const data = blogState.map((blog, index) => ({
    key: index + 1,
    title: blog.title,
    category: blog.category,
    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/blog/${blog._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger border-0 bg-transparent"
          onClick={() => {
            showModal(blog._id);
          }}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  return (
    <>
      <Meta title={"List Blog"} />
      <div>
        <h3 className="mb-4">Blogs</h3>
        <div>
          <Table columns={columns} dataSource={data} />
          <CustomModal
            title="Are you want to delete blog category this!"
            open={isModalOpen}
            hideModal={() => hideModal()}
            performAction={() => {
              handleDeleteBlog(bCategoryId);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BlogList;
