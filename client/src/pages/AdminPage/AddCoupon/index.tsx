import { Input } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import {
  createCoupon,
  getCoupon,
  resetState,
  updateCoupon
} from "../../../features/coupon/couponSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../../../components/Meta";
interface CouponProps {}

const CouponFormSchema = Yup.object().shape({
  name: Yup.string().required("Coupon name is Required!"),
  expiry: Yup.date().required("Date is Required!"),
  discount: Yup.number().required("Discount is Required!")
});

const AddCoupon: React.FC<CouponProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getCouponId = location.pathname.split("/")[3];

  const {
    isError,
    isLoading,
    isSuccess,
    createdCoupon,
    couponName,
    expiryName,
    discountName,
    updatedCoupon
  } = useSelector((state: RootState) => state.coupon);

  const changeDateFormat = (date: any) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getCoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success("Created coupon successfully!");
    }

    if (isSuccess && updatedCoupon) {
      toast.success("Updated coupon successfully!");
      navigate("/admin/list-coupon");
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isLoading, isSuccess, createdCoupon, updatedCoupon, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || "",
      expiry: changeDateFormat(expiryName) || "",
      discount: discountName || ""
    },
    validationSchema: CouponFormSchema,
    onSubmit: async values => {
      try {
        if (getCouponId !== undefined) {
          const data = { id: getCouponId, couponData: values };
          await dispatch(updateCoupon(data));
        } else {
          await dispatch(createCoupon(values));
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

  console.log(formik.values.expiry);
  return (
    <>
      <Meta title={getCouponId !== undefined ? "Edit Coupon" : "Add Coupon"} />
      <div>
        <h3>{getCouponId !== undefined ? "Edit" : "Add"} Coupon</h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
            <div className="mt-4">
              <Input
                name="name"
                type="text"
                placeholder="Enter Color"
                className="form-floating py-3"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
              />
            </div>
            <div className="error">{formik.touched.name && formik.errors.name}</div>
            <div className="mt-4">
              <Input
                name="expiry"
                type="date"
                placeholder="Enter Color"
                className="form-floating py-3"
                value={formik.values.expiry}
                onChange={formik.handleChange("expiry")}
                onBlur={formik.handleBlur("expiry")}
              />
            </div>
            <div className="error">{formik.touched.expiry && formik.errors.expiry}</div>
            <div className="mt-4">
              <Input
                name="discount"
                type="number"
                placeholder="Enter Discount"
                className="form-floating py-3"
                value={formik.values.discount}
                onChange={formik.handleChange("discount")}
                onBlur={formik.handleBlur("discount")}
              />
            </div>
            <div className="error">{formik.touched.discount && formik.errors.discount}</div>
            <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
              {getCouponId !== undefined ? "Update" : "Create"} Coupon
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCoupon;
