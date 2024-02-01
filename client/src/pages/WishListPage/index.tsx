import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import classNames from "classnames/bind";
import styles from "./Wishlist.module.scss";
import Container from "../../components/Container";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { addToWishList } from "../../features/product/productSlice";

const cx = classNames.bind(styles);

const WishlistPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const getProducts = () => {
    dispatch(getUserProductWishlist());
  };

  const removeFromWishlist = (id: string) => {
    dispatch(addToWishList(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const wishlistState = useSelector((state: any) => state.auth.wistlist?.wishlist);

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishlistState && wishlistState.length === 0 && (
            <div className="text-center fs-3"> No Data</div>
          )}
          {wishlistState &&
            wishlistState.map((wishlist: any, index: any) => (
              <div className="col-3" key={index}>
                <div className={cx("wishlist-card", "position-relative")}>
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    className={cx("position-absolute img-fluid", "cross")}
                    onClick={() => removeFromWishlist(wishlist?._id)}
                  />
                  <div className="wishlist-card-image bg-white">
                    <img
                      src={wishlist.images[0].url}
                      alt="product"
                      className="img-fluid d-block mx-auto"
                      width={160}
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className={cx("title")}>{wishlist.title}</h5>
                    <h6 className={cx("price")}>$ {wishlist.price}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default WishlistPage;
