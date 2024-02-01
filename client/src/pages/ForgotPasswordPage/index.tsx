import React from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import classNames from "classnames/bind";
import styles from "./ForgotPassword.module.scss";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import Input from "../../components/Input";

const cx = classNames.bind(styles);

const ForgotPassword: React.FC = () => {
  return (
    <>
      <Meta title={"Forgot Password"} />
      <BreadCrumb title={"Forgot Password"} />
      <Container class1="forgot-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className={cx("forgot-card")}>
              <h3 className="text-center mb-3">Reset your password</h3>
              <p className="text-center mb-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form action="" className="d-flex flex-column gap-15">
                <Input
                  type="email"
                  name="email"
                  classname={cx("form-custom")}
                  placeholder="Enter your email"
                  value="email"
                  onchange={() => {}}
                  onblur={() => {}}
                />
                <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    Submit
                  </button>
                  <Link to="/login"> Cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
