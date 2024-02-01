import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { Link, NavLink } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../features/category/categorySlice";
import { useEffect } from "react";
const cx = classNames.bind(styles);

const HeaderComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const getAllCategories = () => {
    dispatch(getCategories());
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const categoryState = useSelector((state: RootState) => state.category.categories);

  return (
    <div>
      <header className={cx("header-top-stript", "py-2")}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="mb-0">Free shipping for orders over $100</p>
            </div>
            <div className="col-6">
              <p className="text-end telephone">
                Hotline:
                <a className="text-dark" href="tel:+84 865607622">
                  +84 865607622
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className={cx("header-upper", "py-3")}>
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white ml-3" to="/">
                  Pet Shop
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product...."
                  aria-label="Search Product...."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-5" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare"
                    className={cx("d-flex align-items-center text-dark", "gap-10")}
                  >
                    <svg
                      width="35px"
                      height="35px"
                      fill="#ffffff"
                      viewBox="0 0 100 100"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g
                        id="4.-To-refresh"
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <g
                          transform="translate(0.000000, 8.000000)"
                          stroke="#ffffff"
                          strokeWidth="4"
                        >
                          <path
                            d="M89,40 C89,17.90861 71.09139,0 49,0 C34.1239759,0 21.1446258,8.12062657 14.2530697,20.1707596"
                            id="Layer-1"
                          ></path>
                          <polyline
                            id="Layer-2"
                            transform="translate(89.000000, 37.000000) scale(1, -1) rotate(11.000000) translate(-89.000000, -37.000000) "
                            points="79 42 89 32 99 42"
                          ></polyline>
                          <path
                            d="M91,84 C91,61.90861 73.09139,44 51,44 C36.1239759,44 23.1446258,52.1206266 16.2530697,64.1707596"
                            id="Layer-3"
                            transform="translate(51.000000, 64.000000) scale(-1, -1) translate(-51.000000, -64.000000) "
                          ></path>
                          <polyline
                            id="Layer-4"
                            transform="translate(11.000000, 47.000000) scale(-1, 1) rotate(11.000000) translate(-11.000000, -47.000000) "
                            points="1 52 11 42 21 52"
                          ></polyline>
                        </g>
                      </g>
                    </svg>
                    <p className="mb-0 text-white">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div>
                <div>
                  <Link
                    to="/wishlist"
                    className={cx("d-flex align-items-center text-dark", "gap-10")}
                  >
                    <svg
                      id="Capa_1"
                      width="36px"
                      height="36px"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                    >
                      <g id="Layer_46" data-name="Layer 46">
                        <path
                          d="M56.73,10.82a16.36,16.36,0,0,0-23,0L32,12.51l-1.7-1.69a16.36,16.36,0,0,0-23,0,16.28,16.28,0,0,0,0,23L30.94,
             57.52a1.51,1.51,0,0,0,2.12,0L56.73,33.85A16.36,16.36,0,0,0,56.73,10.82ZM54.61,31.73,32,54.33,9.39,31.73a13.21,
             13.21,0,0,1-3.89-9.4A13.35,13.35,0,0,1,18.79,9.05a13.16,13.16,0,0,1,9.39,3.89l2.76,2.75a1.49,1.49,0,0,0,2.12,0l2.76-2.75A13.29,13.29,0,0,1,54.61,31.73Z"
                        ></path>
                      </g>
                    </svg>
                    <p className="mb-0 text-white">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to="/login" className={cx("d-flex align-items-center text-dark", "gap-10")}>
                    <svg
                      id="Capa_1"
                      height="33px"
                      width="33px"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title></title>
                      <g id="about">
                        <path
                          d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"
                          id="id_101"
                          style={{ fill: "rgb(255, 255, 255)" }}
                        ></path>
                        <path
                          d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"
                          id="id_102"
                          style={{ fill: "rgb(255, 255, 255)" }}
                        ></path>
                      </g>
                    </svg>
                    <p className="mb-0 text-white">
                      Login <br /> My Account
                    </p>
                  </Link>
                </div>
                <div>
                  <Link to="/cart" className={cx("d-flex align-items-center text-dark", "gap-10")}>
                    <svg
                      id="Capa_1"
                      height="35px"
                      width="35px"
                      fill="#febd69"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0px"
                      y="0px"
                      viewBox="0 0 511.999 511.999"
                      style={{ background: "new 0 0 511.999 511.999" }}
                      xmlSpace="preserve"
                    >
                      <g>
                        <g>
                          <path
                            d="M214.685,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029
			C259.713,423.028,239.513,402.828,214.685,402.828z M214.685,467.742c-10.966,0-19.887-8.922-19.887-19.887
			c0-10.966,8.922-19.887,19.887-19.887s19.887,8.922,19.887,19.887C234.572,458.822,225.65,467.742,214.685,467.742z"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M372.63,402.828c-24.829,0-45.029,20.2-45.029,45.029c0,24.829,20.2,45.029,45.029,45.029s45.029-20.2,45.029-45.029
			C417.658,423.028,397.458,402.828,372.63,402.828z M372.63,467.742c-10.966,0-19.887-8.922-19.887-19.887
			c0-10.966,8.922-19.887,19.887-19.887c10.966,0,19.887,8.922,19.887,19.887C392.517,458.822,383.595,467.742,372.63,467.742z"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M383.716,165.755H203.567c-6.943,0-12.571,5.628-12.571,12.571c0,6.943,5.629,12.571,12.571,12.571h180.149
			c6.943,0,12.571-5.628,12.571-12.571C396.287,171.382,390.659,165.755,383.716,165.755z"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M373.911,231.035H213.373c-6.943,0-12.571,5.628-12.571,12.571s5.628,12.571,12.571,12.571h160.537
			c6.943,0,12.571-5.628,12.571-12.571C386.481,236.664,380.853,231.035,373.911,231.035z"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <g>
                          <path
                            d="M506.341,109.744c-4.794-5.884-11.898-9.258-19.489-9.258H95.278L87.37,62.097c-1.651-8.008-7.113-14.732-14.614-17.989
			l-55.177-23.95c-6.37-2.767-13.773,0.156-16.536,6.524c-2.766,6.37,0.157,13.774,6.524,16.537L62.745,67.17l60.826,295.261
			c2.396,11.628,12.752,20.068,24.625,20.068h301.166c6.943,0,12.571-5.628,12.571-12.571c0-6.943-5.628-12.571-12.571-12.571
			H148.197l-7.399-35.916H451.69c11.872,0,22.229-8.44,24.624-20.068l35.163-170.675
			C513.008,123.266,511.136,115.627,506.341,109.744z M451.69,296.301H135.619l-35.161-170.674l386.393,0.001L451.69,296.301z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <div className="d-flex flex-column">
                      <span className="badge bg-white text-dark">0</span>
                      <p className="mb-0 text-white">$ 5000</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className={cx("header-bottom", "py-3")}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className={cx("menu-bottom d-flex align-items-center", "gap-30")}>
                <div>
                  <div className="dropdown">
                    <button
                      className="btn dropdown-toggle d-flex justify-items-center align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <CiMenuBurger className="text-white mr-5" />
                      <span
                        className="me-5 fs-4 d-line-block text-white"
                        style={{ marginLeft: "15px" }}
                      >
                        Shop Categories
                      </span>
                    </button>
                    <ul className={cx("dropdown-menu", "menu")}>
                      {categoryState &&
                        categoryState.map((category: any, index: any) => {
                          return (
                            <li>
                              <Link className={cx("dropdown-item", "text-white")} key={index} to="">
                                {category.title}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className={cx("menu-links")}>
                  <div className={cx("d-flex align-items-center", "gap-15")}>
                    <NavLink to="/" className="text-white">
                      Home
                    </NavLink>
                    <NavLink to="/product" className="text-white">
                      Our Store
                    </NavLink>
                    <NavLink to="/blogs" className="text-white">
                      Blogs
                    </NavLink>
                    <NavLink to="/contact" className="text-white">
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderComponent;
