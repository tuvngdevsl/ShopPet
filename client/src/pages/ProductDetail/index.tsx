import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ProductCard from "../../components/ProductCard";
import classNames from "classnames/bind";
import styles from "./Product.module.scss";
import ReactStars from "react-stars";
import { useEffect, useState } from "react";
import Color from "../../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import Container from "../../components/Container";
import petShopProducts from "../../mock/productData";

const cx = classNames.bind(styles);

const ProductDetail = () => {
  const copyToClipboard = (text: string) => {
    const textField = document.createElement("textarea");
    textField.innerText = text.toString();
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const [orderedProduct, setOrderedProduct] = useState(true);
  useEffect(() => {
    setOrderedProduct(true);
  }, []);
  return (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className={cx("main-product-image")}>
                <div className={cx("other-product-images", "d-flex flex-wrap gap-15")}>
                  <div>
                    <img src="/images/product7.jpg" alt="product" className="img-fluid" />
                  </div>
                  <div>
                    <img src="/images/product7.jpg" alt="product" className="img-fluid" />
                  </div>
                  <div>
                    <img src="/images/product7.jpg" alt="product" className="img-fluid" />
                  </div>
                  <div>
                    <img src="/images/product7.jpg" alt="product" className="img-fluid" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className={cx("main-product-details")}>
                <div className={cx("border-bottom")}>
                  <h3 className={cx("title")}> Cat </h3>
                </div>
                <div className={cx("border-bottom", "py-3")}>
                  <p className="price">$200.00</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars count={5} size={24} color2={"#ffd700"} />
                    <p className={cx("mb-0", "t-review")}>(2 Reviews)</p>
                  </div>
                  <a href="#review" className={cx("review-btn")}>
                    Write a Review
                  </a>
                </div>
                <div className={cx("border-bottom")}>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className={cx("product-heading")}>Type : </h3>
                    <p className={cx("product-data")}>Cats</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className={cx("product-heading")}>Brand : </h3>
                    <p className={cx("product-data")}>Cats</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className={cx("product-heading")}>Category : </h3>
                    <p className={cx("product-data")}>Cats</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className={cx("product-heading")}>Tags : </h3>
                    <p className={cx("product-data")}>Special</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className={cx("product-heading")}>Availability : </h3>
                    <p className={cx("product-data")}>In Stock</p>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className={cx("product-heading")}>Size : </h3>
                    <div className="d-flex flex-wrap gap-15">
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        X
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        XXL
                      </span>
                      <span className="badge border border-1 bg-white text-dark border-secondary">
                        M
                      </span>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className={cx("product-heading")}>Color : </h3>
                    <Color />
                  </div>
                  <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-3">
                    <h3 className={cx("product-heading")}>Quantity : </h3>
                    <div>
                      <input
                        type="number"
                        value={1}
                        name=""
                        min={1}
                        max={10}
                        style={{ width: "70px" }}
                        className="form-control"
                      />
                    </div>
                    <div className="d-flex align-items-center gap-30 ms-5">
                      <button type="submit" className="button border-0">
                        Add to Cart
                      </button>
                      <button className={cx("button border-0", "register")}>Buy it Now</button>
                    </div>
                  </div>
                  <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-3">
                    <div>
                      <a href="#add">
                        <TbGitCompare className="fs-3 me-2" />
                        Add to Compare
                      </a>
                    </div>
                    <div>
                      <a href="#addtowish">
                        <AiOutlineHeart className="fs-3 me-2" />
                        Add to Wishlist
                      </a>
                    </div>
                  </div>
                  <div className="d-flex gap-10 flex-column my-3">
                    <h3 className={cx("product-heading")}>Shipping & Return : </h3>
                    <p className={cx("product-data")}>
                      Free shipping and returns available on all orders! <br /> We ship all US
                      domestic orders within <b>5-10 business days! </b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className={cx("product-heading")}>Product Link:</h3>
                    <a
                      href="javascript:void(0); #"
                      onClick={() => {
                        copyToClipboard("/images/product7.jpg");
                      }}
                    >
                      Copy Product Link
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={cx("description-wrapper", "py-5 home-wrapper-2")}>
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro ullam temporibus
                pariatur ipsum error animi id unde laboriosam quidem deleniti tempore dicta esse
                magni provident nemo possimus vitae, saepe nihil!
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={cx("reviews-wrapper", "home-wrapper-2")}>
        <div className="row">
          <div className="col-12">
            <h3>Reviews</h3>
            <div className={cx("review-inner-wrapper")}>
              <div className={cx("review-head", "d-flex justify-content-between align-items-end")}>
                <div>
                  <h4 className="mb-4">Customer Review</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars count={5} size={24} color2={"#ffd700"} />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a href="/" className="text-decoration-underline">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className={cx("review-form", "py-4")}>
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars count={5} size={24} color2={"#ffd700"} />
                  </div>
                  <div>
                    <textarea
                      className={cx("w-100 form-control", "form-custom")}
                      name=""
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className={cx("reviews", "mt-4")}>
                <div className={cx("reviews")}>
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">Navdeep</h6>
                    <ReactStars count={5} size={24} color2={"#ffd700"} />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus numquam assumenda
                    iste quibusdam? In neque at explicabo deserunt aut autem saepe dolorum iusto
                    earum repudiandae cumque, id expedita sapiente fugit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className={cx("section-heading")}>Our Popular Products</div>
          </div>

          <div className="row">
            <ProductCard data={petShopProducts} grid={1} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
