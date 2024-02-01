import classNames from "classnames/bind";
import styles from "./OurStore.module.scss";
import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import ReactStars from "react-stars";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import Container from "../../components/Container";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/product/productSlice";
import petShopProducts from "../../mock/productData";
const cx = classNames.bind(styles);

const OurStore: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [grid, setGrid] = useState(4);
  const getAllProducts = () => {
    dispatch(getProducts());
  };

  const productData = useSelector((state: RootState) => state.product.products);
  console.log(productData);
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store Page" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className={cx("filter-card", "mb-3")}>
              <h3 className={cx("filter-title")}>Shop by Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Dogs</li>
                  <li>Cats</li>
                  <li>Small Animals</li>
                  <li>Birds</li>
                  <li>Reptiles</li>
                </ul>
              </div>
            </div>
            <div className={cx("filter-card", "mb-3")}>
              <h3 className={cx("filter-title")}>Filter By</h3>
              <div>
                <h5 className={cx("sub-title")}>Availabity</h5>
                <div>
                  <div className={cx("form-check")}>
                    <input className={cx("form-check-input")} type="checkbox" value="" id="" />
                    <label className={cx("form-check-label")}> In stock (1) </label>
                  </div>
                  <div className={cx("form-check")}>
                    <input className={cx("form-check-input")} type="checkbox" value="" id="" />
                    <label className={cx("form-check-label")}> Out of stock (0)</label>
                  </div>
                </div>
                <h5 className={cx("sub-title")}>Price</h5>
                <div className={cx("d-flex align-items-center", "gap-10")}>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                  </div>
                  <div className="form-floating">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="To"
                    />
                  </div>
                </div>
                <h5 className={cx("sub-title")}>Colors</h5>
                <div>
                  <div className="d-flex flex-wrap">
                    <ul className={cx("colors", "ps-0")}>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className={cx("filter-card", "mb-3")}>
              <h3 className={cx("fiter-title")}>Product Tags</h3>
              <div>
                <div className={cx("product-tags", "d-flex flex-wrap align-items-center gap-10")}>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Dogs</span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">Cats</span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Accessories
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Beds and Furniture
                  </span>
                  <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                    Beds and Furniture
                  </span>
                </div>
              </div>
            </div>
            <div className={cx("filter-card", "mb-3")}>
              <h3 className={cx("fiter-title")}>Random Product</h3>
              <div>
                <div className={cx("random-products", "d-flex mb-3")}>
                  <div className="w-50">
                    <img src="images/product8.jpg" width={118} height={118} alt="product" />
                  </div>
                  <div className="w-50">
                    <h5> Cat so cute</h5>
                    <ReactStars count={5} size={24} color2={"#ffd700"} />
                    <b>$ 400</b>
                  </div>
                </div>
                <div className={cx("random-products", "d-flex")}>
                  <div className="w-50">
                    <img src="images/product7.jpg" className="img-fluid" alt="product" />
                  </div>
                  <div className="w-50">
                    <h5> Cat so cute</h5>
                    <ReactStars count={5} size={24} color2={"#ffd700"} />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className={cx("filter-sort-grid", "mb-4")}>
              <div className="d-flex justify-content-between align-items-center">
                <div className={cx("d-flex align-items-center", "gap-10")}>
                  <p className={cx("mb-0 d-block", "sort")}>Sort By:</p>
                  <select
                    defaultValue={"manual"}
                    name=""
                    id=""
                    className={cx("form-control form-select")}
                  >
                    <option value="manual">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">Alphabetically, Z-A</option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
                <div className={cx("d-flex align-items-center", "gap-10", "grid")}>
                  <p className="totalproducts mb-0">21 Products</p>
                  <div className={cx("d-flex align-items-center", "gap-10")}>
                    <img
                      src="images/gr4.svg"
                      className={cx("d-block img-fluid")}
                      alt="grid"
                      onClick={() => setGrid(3)}
                    />
                    <img
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(4)}
                    />
                    <img
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(6)}
                    />
                    <img
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                      onClick={() => setGrid(12)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className={cx("d-flex flex-wrap", "gap-10")}>
                {productData.length > 0 ? (
                  <ProductCard data={productData} grid={grid} />
                ) : (
                  <ProductCard data={petShopProducts} grid={grid} />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
