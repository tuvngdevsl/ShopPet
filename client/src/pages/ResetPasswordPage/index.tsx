import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import classNames from "classnames/bind";
import styles from "./ResetPassword.module.scss";
import Container from "../../components/Container";
import { Input } from "reactstrap";
const cx = classNames.bind(styles);



const ResetPassword = () => {
  return (
    <>
      <Meta title={"Reset Password"} />
      <BreadCrumb title={"Reset Password"} />
      <Container class1="reset-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className={cx("reset-card")}>
              <h3 className="text-center mb-3">Reset Password</h3>
              <form action="" className="d-flex flex-column gap-15">
                <Input
                  type="password"
                  classname={cx("form-custom")}
                  placeholder="Enter your password"
                  name="password"
                />
                <Input
                  type="password"
                  classname={cx("form-custom")}
                  placeholder="Confirm your password"
                  name="password"
                />

                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    OK
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
