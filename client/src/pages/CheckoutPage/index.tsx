import classNames from "classnames/bind";
import styles from "./Checkout.module.scss";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../../components/Container";

const cx = classNames.bind(styles);

const Checkout: React.FC = () => {
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Dev corner</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className={cx("breadcrumb-item", "total-price")}>
                    <Link to="/cart" className="text-dark">
                      Cart
                    </Link>
                  </li>
                  <li className={cx("breadcrumb-item active", "total-price")} aria-current="page">
                    Information
                  </li>
                  <li className={cx("breadcrumb-item active", "total-price")} aria-current="page">
                    Shipping
                  </li>
                  <li className={cx("breadcrumb-item active", "total-price")} aria-current="page">
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className={cx("title", "total")}>Contact Information</h4>
              <p className="user-details">VuTu (tuvngdevsl@gmail.com)</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form action="" className="d-flex flex-wrap gap-15 justify-content-between">
                <div className="w-100">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select Country
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input type="text" placeholder="First Name" className="form-control" />
                </div>
                <div className="flex-grow-1">
                  <input type="text" placeholder="Last Name" className="form-control" />
                </div>
                <div className="w-100">
                  <input type="text" placeholder="Address" className="form-control" />
                </div>
                <div className="w-100">
                  <input type="text" placeholder="Apartment, Suite, etc" className="form-control" />
                </div>
                <div className="flex-grow-1">
                  <input type="text" placeholder="City" className="form-control" />
                </div>
                <div className="flex-grow-1">
                  <select name="" className="form-control form-select" id="">
                    <option value="" selected disabled>
                      Select State
                    </option>
                  </select>
                </div>
                <div className="flex-grow-1">
                  <input type="text" className="form-control" placeholder="Zipcode" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shopping
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "0px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      1
                    </span>
                    <img src="images/product1.jpg" alt="product" className="img-fluid" />
                  </div>
                  <div>
                    <h5 className={cx("total-price")}>abcdf</h5>
                    <p className={cx("total-price")}>s/ #123213123</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5>$ 100</h5>
                </div>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className={cx("total")}>Subtotal</p>
                <p className={cx("total-price")}>$ 10000</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className={cx("total", "mb-0")}>Shipping</p>
                <p className={cx("total-price", "mb-0")}>$ 10000</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className={cx("total")}>Total</h4>
              <h5 className={cx("total-price")}>$ 10000</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
