import React from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../../components/Container";
const cx = classNames.bind(styles);

const ContactPage: React.FC = () => {
  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title="Contact" />
      <Container class1={cx("py-5 home-wrapper-2", "contact-wrapper")}>
        <div className="row">
          <div className="col-12">
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3760.479664130343!2d105.78743642664452!3d21.014566437187998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1704278874117!5m2!1sen!2s"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className={cx("d-flex justify-content-between", "contact-inner-wrapper")}>
              <div className="">
                <h3 className={cx("contact-title", "mb-4")}>Contact</h3>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <input
                      type="text"
                      className={cx("form-custom", "form-control")}
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className={cx("form-custom", "form-control")}
                      placeholder="Email"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      className={cx("form-custom", "form-control")}
                      placeholder="Mobile Number"
                    />
                  </div>
                  <div>
                    <textarea
                      className={cx("w-100 form-control", "form-custom")}
                      name=""
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="">
                    <button className="button border-0">Submit</button>
                  </div>
                </form>
              </div>
              <div className="">
                <h3 className={cx("contact-title", "mb-4")}>Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="fs-5 gap-15 d-flex align-items-center">
                      <AiOutlineHome />
                      <address className="mb-0">
                        B6C Nam Trung Yen, Trung Hoa, Cau Giay, Ha Noi
                      </address>
                    </li>
                    <li className="fs-5 gap-15 d-flex align-items-center">
                      <BiPhoneCall />
                      <a href="tel:+84865607622">+84 865607622</a>
                    </li>
                    <li className="fs-5 gap-15 d-flex align-items-center">
                      <AiOutlineMail />
                      <a href="mailto:tuvngdevsl@gmail.com">tuvngdevsl@gmail.com</a>
                    </li>
                    <li className="fs-5 gap-15 d-flex align-items-center">
                      <BiInfoCircle />
                      <p className="mb-0">Monday - Friday 8 AM - 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ContactPage;
