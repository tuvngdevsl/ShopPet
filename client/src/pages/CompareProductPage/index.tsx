import React from "react";
import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import styles from "./CompareProduct.module.scss";
import classNames from "classnames/bind";
import Color from "../../components/Color";
import Container from "../../components/Container";

const cx = classNames.bind(styles);

const CompareProductPage: React.FC = () => {
  return (
    <>
      <Meta title={"Compare Products"} />
      <BreadCrumb title={"Compare Products"} />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className={cx("compare-product-card", "position-relative")}>
              <img
                src="images/cross.svg"
                alt="cross"
                className={cx("position-absolute img-fluid", "cross")}
              />
              <div className="product-card-image">
                <img src="images/product1.jpg" alt="product" className="img-fluid" />
              </div>
              <div className={cx("compare-product-detail")}>
                <h5 className={cx("title")}>Cat</h5>
                <h6 className={cx("price")}>$100</h6>
                <div>
                  <div className={cx("product-detail")}>
                    <h5>Brand</h5>
                    <p>Monge</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Type</h5>
                    <p>Dogs</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Availablity</h5>
                    <p>In stock </p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Color:</h5>
                    <Color />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className={cx("compare-product-card", "position-relative")}>
              <img
                src="images/cross.svg"
                alt="cross"
                className={cx("position-absolute img-fluid", "cross")}
              />
              <div className="product-card-image">
                <img src="images/product1.jpg" alt="product" className="img-fluid" />
              </div>
              <div className={cx("compare-product-detail")}>
                <h5 className={cx("title")}>Dogs</h5>
                <h6 className={cx("price")}>$100</h6>
                <div>
                  <div className={cx("product-detail")}>
                    <h5>Brand</h5>
                    <p>Monge</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Type</h5>
                    <p>Dogs</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Availablity</h5>
                    <p>In stock </p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Color:</h5>
                    <Color />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className={cx("compare-product-card", "position-relative")}>
              <img
                src="images/cross.svg"
                alt="cross"
                className={cx("position-absolute img-fluid", "cross")}
              />
              <div className="product-card-image">
                <img src="images/product1.jpg" alt="product" className="img-fluid" />
              </div>
              <div className={cx("compare-product-detail")}>
                <h5 className={cx("title")}>Dogs</h5>
                <h6 className={cx("price")}>$100</h6>
                <div>
                  <div className={cx("product-detail")}>
                    <h5>Brand</h5>
                    <p>Monge</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Type</h5>
                    <p>Dogs</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Availablity</h5>
                    <p>In stock </p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Color:</h5>
                    <Color />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className={cx("compare-product-card", "position-relative")}>
              <img
                src="images/cross.svg"
                alt="cross"
                className={cx("position-absolute img-fluid", "cross")}
              />
              <div className="product-card-image">
                <img src="images/product1.jpg" alt="product" className="img-fluid" />
              </div>
              <div className={cx("compare-product-detail")}>
                <h5 className={cx("title")}>Dogs</h5>
                <h6 className={cx("price")}>$100</h6>
                <div>
                  <div className={cx("product-detail")}>
                    <h5>Brand</h5>
                    <p>Monge</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Type</h5>
                    <p>Dogs</p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Availablity</h5>
                    <p>In stock </p>
                  </div>
                  <div className={cx("product-detail")}>
                    <h5>Color:</h5>
                    <Color />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CompareProductPage;
