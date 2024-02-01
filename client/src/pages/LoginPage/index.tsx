import { useEffect } from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Input from "../../components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login, resetStore, userLogin } from "../../features/auth/authSlice";
import { AppDispatch } from "../../app/store";
// import { useAppDispatch } from '../../Hook/hook'

const cx = classNames.bind(styles);

// type Props = {};

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(resetStore());
  }, []);
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    email: Yup.string().email("Email should be valid").required("Email is required"),
    password: Yup.string().required("Password is required")
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: schema,
    onSubmit: async values => {
      await dispatch(login(values));
      await dispatch(userLogin(values));
    }
  });
  const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth);
  console.log(user);

  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("/admin");
    } else {
      navigate("");
    }
  }, [user, isLoading, isError, isSuccess, message, navigate]);

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title={"Login"} />
      <Container class1="login-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className={cx("login-card")}>
              <h3 className="text-center mb-3">Login</h3>
              <p className="text-center">Login to your account to continute.</p>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-15">
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  classname={cx("form-custom")}
                  value={formik.values.email}
                  onchange={formik.handleChange("email")}
                  onblur={formik.handleChange("email")}
                />
                <div className={cx("error", "mt-2")}>
                  {formik.touched.email && formik.errors.email}
                </div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  classname={cx("form-custom")}
                  value={formik.values.password}
                  onchange={formik.handleChange("password")}
                  onblur={formik.handleChange("password")}
                />
                <div className={cx("error")}>
                  {formik.touched.password && formik.errors.password}
                </div>
                <div className="">
                  <Link to="/forgot-password"> Forgot Password?</Link>
                </div>
                <div className="d-flex justify-content-center gap-15 align-items-center">
                  <button type="submit" className="button border-0 text-white">
                    Login
                  </button>
                  <Link to="/register" className={cx("button border-0", "register")}>
                    Register
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

export default LoginPage;
