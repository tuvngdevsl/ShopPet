import { Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getACategory,
  resetState,
  updateACategory
} from "../../../features/category/categorySlice";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import Meta from "../../../components/Meta";
import { useLocation, useNavigate } from "react-router-dom";

interface CategoryProps {}

const AddCategory: React.FC<CategoryProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split("/")[3];
  const dispatch: AppDispatch = useDispatch();

  const catState = useSelector((state: RootState) => state.category);
  const { isError, isLoading, isSuccess, createdCategory, categoryName, updatedCategory } =
    catState;

  useEffect(() => {
    if (getCategoryId) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success(`Category Created Successfully`);
    }
    if (isSuccess && updatedCategory) {
      toast.success(`Category Updated Successfully`);
      navigate("/admin/list-category");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isLoading, isSuccess, createCategory, updatedCategory, navigate]);

  const CategoryFormSchema = Yup.object().shape({
    title: Yup.string().required("Category is Required")
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || ""
    },
    validationSchema: CategoryFormSchema,
    onSubmit: async values => {
      try {
        if (getCategoryId !== undefined) {
          const data = {
            id: getCategoryId,
            categoryData: values
          };
          await dispatch(updateACategory(data));
        } else {
          await dispatch(createCategory(values));
          formik.resetForm();
        }
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  });

  return (
    <>
      <Meta title={"Add Product Category"} />
      <div>
        <h3>{getCategoryId !== undefined ? "Edit" : "Add"} Category</h3>
        <div>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
            <div className="mt-4">
              <Input
                name="title"
                type="text"
                placeholder="Enter Category"
                className="form-floating py-3"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="error">{formik.touched.title && formik.errors.title}</div>
            <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
              {getCategoryId !== undefined ? "Update" : "Create"} Category
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
