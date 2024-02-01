import React, { useEffect } from "react";
import { Input } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import {
  createbCategory,
  getBlogCategory,
  resetState,
  updateBCategory
} from "../../../features/bCategory/bCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../../../components/Meta";

interface BlogCategoryProps {}

const AddBlogCat: React.FC<BlogCategoryProps> = () => {
  // Hooks and Redux state
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const blogCategoryId = location.pathname.split("/")[3];
  const { isError, isLoading, isSuccess, createdbCategory, bCategoryTitle, updatedbCategory } =
    useSelector((state: RootState) => state.bCategory);

  // Fetch blog category data on component mount or update
  useEffect(() => {
    if (blogCategoryId !== undefined) {
      dispatch(getBlogCategory(blogCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [blogCategoryId, dispatch]);

  // Display toasts based on API responses
  useEffect(() => {
    if (isSuccess && createdbCategory) {
      toast.success("Created Blog Category successfully!");
    }

    if (isSuccess && updatedbCategory) {
      toast.success("Update Blog Category successfully!");
      navigate("/admin/blog-category-list");
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isLoading, isSuccess, createdbCategory, updatedbCategory, navigate]);

  // Form validation schema
  const BlogCategoryFromSchema = Yup.object().shape({
    title: Yup.string().required("Blog Category name is Required!")
  });

  // Formik form handling
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: bCategoryTitle || ""
    },
    validationSchema: BlogCategoryFromSchema,
    onSubmit: async values => {
      try {
        if (blogCategoryId !== undefined) {
          // Update existing blog category
          const data = {
            id: blogCategoryId,
            bCategoryData: values
          };
          await dispatch(updateBCategory(data));
        } else {
          // Create new blog category
          await dispatch(createbCategory(values));
          formik.resetForm();
        }

        // Reset Redux state after 2 seconds
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  });

  // Render component
  return (
    <>
      <Meta title={blogCategoryId !== undefined ? "Edit Blog Category" : "Add Blog Category"} />
      <div>
        <h3>{blogCategoryId !== undefined ? "Edit" : "Add"} Blog Category</h3>
        <div>
          <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
            <div className="mt-4">
              {/* Input for Blog Category title */}
              <Input
                name="blogCategory"
                type="text"
                placeholder="Enter Blog Category"
                className="form-floating py-3"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
              />
            </div>
            {/* Display validation error, if any */}
            <div className="error">{formik.touched.title && formik.errors.title}</div>
            {/* Submit button */}
            <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
              {blogCategoryId !== undefined ? "Update" : "Create"} Blog Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlogCat;
