import { Link } from "react-router-dom";

import styles from "./Footer.module.scss";
import classNames from "classnames/bind";
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";

const cx = classNames.bind(styles);

const Footer: React.FC = () => {
  return (
    <div>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer=top-data d-flex align-items-center">
                <img src="images/newsletter.png" alt="newsletter" className={cx("footer-img")} />
                <h2 className="mb-0 text-white">Sign up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Your email address"
                  aria-label="Your email address"
                  aria-describedby="basic-addon2"
                />
                <span className={cx("input-group-text", "p-4")} id="basic-addon2">
                  Subcribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-4">
                  HNOI: B6C Nam Trung Yen, Phuong Trung Hoa, <br /> Cau Giay, Ha Noi <br />
                  PinCode: 8033
                </address>
                <a href="tel:+84865607682" className="text-white mt-3 d-block mb-1">
                  +84 865607682
                </a>
                <a href="mailto:tuvngdevsl@gmail.com" className="text-white mt-2 d-block mb-0">
                  tuvngdevsl@gmail.com
                </a>
                <div className={cx("social_icons d-flex align-items-center mt-4", "gap-15")}>
                  <a href="/">
                    <BsLinkedin className="text-white fs-2" />
                  </a>
                  <a href="/">
                    <BsGithub className="text-white fs-2" />
                  </a>
                  <a href="/">
                    <BsInstagram className="text-white fs-2" />
                  </a>
                  <a href="/">
                    <BsFacebook className="text-white fs-2" />
                  </a>
                  <a href="/">
                    <BsYoutube className="text-white fs-2" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className={cx("d-flex flex-column", "footer-links")}>
                <Link className="py-2 mb-1" to="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link className="py-2 mb-1" to="/refund-policy">
                  Refund Policy
                </Link>
                <Link className="py-2 mb-1" to="/shipping-policy">
                  Shipping Policy
                </Link>
                <Link className="py-2 mb-1" to="/terms-conditions">
                  Terms and Conditions
                </Link>
                <Link className="py-2 mb-1" to="/blogs">
                  Blog
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className={cx("d-flex flex-column", "footer-links")}>
                <Link className="py-2 mb-1" to="">
                  About Us
                </Link>
                <Link className="py-2 mb-1" to="">
                  Faq
                </Link>
                <Link className="py-2 mb-1" to="/contact">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">QuickLink</h4>
              <div className={cx("d-flex flex-column", "footer-links")}>
                <Link className="py-2 mb-1" to="">
                  Dogs
                </Link>
                <Link className="py-2 mb-1" to="">
                  Cats
                </Link>
                <Link className="py-2 mb-1" to="">
                  Small Animal
                </Link>
                <Link className="py-2 mb-1" to="">
                  Accessory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center text-white">
                &copy; {new Date().getFullYear()} Powered by VuTu
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
