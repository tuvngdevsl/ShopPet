import React, { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Input from "../../components/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { register, resetStore } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);

interface RegisterProps {}

const RegisterFormSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required!"),
  lastname: Yup.string().required("Lastname is required!"),
  email: Yup.string().required("Email is required!"),
  phone: Yup.number().required("Phone is required!"),
  password: Yup.string().required("Password is required!"),
  confirmpassword: Yup.string().required("Confirm password is required!")
});
const RegisterPage: React.FC<RegisterProps> = () => {
  const dispatch: AppDispatch = useDispatch();

  const { userRegisted, isSuccess, isError } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isSuccess && userRegisted) {
      toast.info("Register user successfully!");
    }
    if (isError) {
      toast.error("Register user not successfully!");
    }
  }, [isSuccess, isError]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmpassword: ""
    },
    validationSchema: RegisterFormSchema,
    onSubmit: async values => {
      await dispatch(register(values));
      formik.resetForm();
      useEffect(() => {
        dispatch(resetStore());
      }, []);
    }
  });

  return (
    <>
      <Meta title={"Register"} />
      <BreadCrumb title={"Register"} />
      <Container class1="register-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className={cx("register-card")}>
              <h3 className="text-center mb-3">Register</h3>
              <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  classname={cx("form-custom")}
                  value={formik.values.firstname}
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                />
                <div className="error fs-5">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  classname={cx("form-custom")}
                  value={formik.values.lastname}
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                />
                <div className="error fs-5">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>

                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  classname={cx("form-custom")}
                  value={formik.values.email}
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                />
                <div className="error fs-5">{formik.touched.email && formik.errors.email}</div>
                <Input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  classname={cx("form-custom")}
                  value={formik.values.phone}
                  onchange={formik.handleChange}
                  onblur={formik.handleBlur}
                />
                <div className="error fs-5">{formik.touched.phone && formik.errors.phone}</div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  classname={cx("form-custom")}
                  value={formik.values.password}
                  onchange={formik.handleChange("password")}
                  onblur={formik.handleBlur("password")}
                />
                <div className="error fs-5">
                  {formik.touched.password && formik.errors.password}
                </div>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  name="confirmpassword"
                  classname={cx("form-custom")}
                  value={formik.values.confirmpassword}
                  onchange={formik.handleChange("confirmpassword")}
                  onblur={formik.handleBlur("confirmpassword")}
                />
                <div className="error fs-5">
                  {formik.touched.confirmpassword && formik.errors.confirmpassword}
                </div>
                <div className="">
                  <Link to="/login"> Are you have account?</Link>
                </div>
                <div className="d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    Register
                  </button>
                  <Link to="/login" className={cx("button border-0", "register")}>
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RegisterPage;
