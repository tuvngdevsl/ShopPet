import { Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrands,
  getABrand,
  resetState,
  updateABrand
} from "../../../features/brand/brandSlice";
import { useLocation, useNavigate } from "react-router-dom";
interface BrandProps {}
const BrandFormSchema = Yup.object().shape({
  title: Yup.string().required("Brand name is Required")
});

const AddBrand: React.FC<BrandProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBrandId = location.pathname.split("/")[3];

  const { createdBrand, isError, isLoading, isSuccess, brandName, updatedBrand } = useSelector(
    (state: RootState) => state.brand
  );

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand added successfully!");
    }

    if (isSuccess && updatedBrand) {
      toast.success("Brand updated successfully!");
      navigate("/admin/list-brand");
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isLoading, isSuccess, isError, navigate, updatedBrand, createdBrand]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || ""
    },
    validationSchema: BrandFormSchema,
    onSubmit: async values => {
      try {
        if (getBrandId !== undefined) {
          const data = { id: getBrandId, brandData: values };
          await dispatch(updateABrand(data));
        } else {
          await dispatch(createBrands(values));
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
    <div>
      <h3>{getBrandId !== undefined ? "Edit" : "Add"} Brand</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <div className="mt-4">
            <Input
              name="title"
              type="text"
              placeholder="Enter Brand"
              className="form-floating py-3"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className="error">{formik.touched.title && formik.errors.title}</div>
          <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
            {getBrandId !== undefined ? "Update" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
