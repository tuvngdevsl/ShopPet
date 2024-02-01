import classNames from "classnames/bind";
import styles from "./ProductCard.module.scss";
import ReactStars from "react-stars";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { addToWishList } from "../../features/product/productSlice";

const cx = classNames.bind(styles);
interface ProductProps {
  grid: number;
  data: any;
}

const ProductCard: React.FC<ProductProps> = ({ grid, data }) => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();

  const addToWish = (productId: any) => {
    dispatch(addToWishList(productId));
  };
  return (
    <>
      {data &&
        data?.map((item: any, index: number) => (
          <div
            key={index}
            className={`${location.pathname === "/product" ? `${cx(`gr-${grid}`)}` : "col-3"}`}
          >
            <Link
              to={`${
                location.pathname === "/"
                  ? "/product/:id"
                  : location.pathname === "/product/:id"
                    ? "/product/:id"
                    : ":id"
              }`}
              className={cx("product-card", "position-relative")}
            >
              <div className={cx("wishlist-icon", "position-absolute")}>
                <button className="border-0 bg-transparent">
                  <img
                    src="/images/wish.svg"
                    alt="wishlist"
                    onClick={() => addToWish(item?._id)}
                    style={{ zIndex: "1000" }}
                  />
                </button>
              </div>
              <div className={cx("product-image")}>
                <img
                  src={item?.images[0]?.url}
                  alt="product_image"
                  className="mx-auto"
                  width={187.5}
                  height={187.5}
                />
                <img
                  src={item?.images[1]?.url}
                  alt="product_image"
                  className="mx-auto"
                  width={187.5}
                  height={187.5}
                />
              </div>

              <div className={cx("product-detail")}>
                <h6 className={cx("brand")}>{item.brand}</h6>
                <h5 className={cx("product-title")}>{item?.title}</h5>
                <ReactStars count={5} size={24} color2={"#ffd700"} value={item?.ratings?.rating} />

                <p
                  className={cx("description", `${grid === 12 ? "d-block" : "d-none"}`)}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className={cx("product-prices")}>$ {item?.price}</p>
                <div className={cx("action-bar", "position-absolute")}>
                  <div className={cx("d-flex flex-column", "gap-15")}>
                    <button className="border-0 bg-transparent">
                      <img src="/images/prodcompare.svg" alt="compare" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src="/images/view.svg" alt="view" />
                    </button>
                    <button className="border-0 bg-transparent">
                      <img src="/images/add-cart.svg" alt="addcart" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default ProductCard;
