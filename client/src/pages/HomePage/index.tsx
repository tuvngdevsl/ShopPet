import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../../components/BlogCard";
import SpecialProduct from "../../components/SpecialProduct";
import Container from "../../components/Container";
import services from "../../utils/Data";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBlogs } from "../../features/blog/blogSlice";
import { getProducts } from "../../features/product/productSlice";
import { Product } from "../../types/product.type";
import ReactStars from "react-stars";
import { addToWishList } from "../../features/product/productSlice";
import ProductCard from "../../components/ProductCard";
import petShopProduct from "../../mock/productData";
import blogData from "../../mock/blogData";

const cx = classNames.bind(styles);

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const getAllBlog = () => {
    dispatch(getBlogs());
  };

  const getAllProducts = () => {
    dispatch(getProducts());
  };

  useEffect(() => {
    getAllBlog();
    getAllProducts();
  }, []);

  const addToWish = (productId: any) => {
    dispatch(addToWishList(productId));
  };

  const blogState = useSelector((state: RootState) => state.blog.blogs);
  const productState = useSelector((state: RootState) => state.product.products);

  return (
    <>
      <Container class1={cx("home-wrapper-1", "py-5 w-100")}>
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                src="images/catdogbanner1.jpg"
                alt="Banner"
                className={cx("rounded-5")}
                width={550}
                height={352}
              />
              <div className={cx("main-banner-content", "position-absolute")}>
                <h4>Welcome to PetShop</h4>
                <h5>WarmPaws</h5>
                <p>From $10 or %50/mo.</p>
                <Link className={cx("button")} to="">
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div
              className={cx(
                "d-flex flex-wrap justify-content-between align-items-center",
                "gap-10"
              )}
            >
              <div className={cx("small-banner", "position-relative")}>
                <img
                  src="https://i.pinimg.com/564x/fd/ce/2d/fdce2dfb303ace8776b80a992b401cc2.jpg"
                  alt="Banner"
                  className={cx("rounded-3", "img-banner")}
                  width={272}
                  height={170}
                />
                <div className={cx("position-absolute", "small-banner-content")}>
                  <h4>Best Sale</h4>
                  <h5>Groom Master</h5>
                  <p>
                    From $29.99 or <br /> %24.82/mo.
                  </p>
                </div>
              </div>
              <div className={cx("small-banner", "position-relative")}>
                <img
                  src="https://i.pinimg.com/564x/11/b7/cc/11b7cc8e6584a7da4233cb9ffeab3891.jpg"
                  alt="Banner"
                  className={cx("rounded-4", "img-banner")}
                  width={272}
                  height={170}
                />
                <div className={cx("position-absolute", "small-banner-content")}>
                  <h4>New Arrival</h4>
                  <h5>Pawsome Pet Supplies</h5>
                  <p>
                    From $25.99 or <br /> %10.12/mo.
                  </p>
                </div>
              </div>
              <div className={cx("small-banner", "position-relative")}>
                <img
                  src="https://i.pinimg.com/564x/b7/96/32/b796323ec29842e2b030d0e1fc3ec373.jpg"
                  alt="Banner"
                  className={cx("rounded-3", "img-banner")}
                  width={272}
                  height={170}
                />
                <div className={cx("position-absolute", "small-banner-content")}>
                  <h4>15% Off</h4>
                  <h5>WarmPaws</h5>
                  <p>
                    From $28.99 or <br /> %14.33/mo.
                  </p>
                </div>
              </div>

              <div className={cx("small-banner", "position-relative")}>
                <img
                  src="https://i.pinimg.com/564x/c5/77/76/c57776df94f90596a557ca76b8d6e236.jpg"
                  alt="Banner"
                  className={cx("rounded-3", "img-banner")}
                  width={272}
                  height={170}
                />
                <div className={cx("position-absolute", "small-banner-content")}>
                  <h4>Free Engraving</h4>
                  <h5>ActivePaws</h5>
                  <p>
                    From $49.99 or <br /> %22.82/mo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={cx("home-wrapper-2", "py-5")}>
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((service, i) => {
                return (
                  <div key={i} className={cx("d-flex align-items-center", "gap-15")}>
                    <img src={service.image} alt="services" />
                    <div>
                      <h5>{service.title}</h5>
                      <p className="mb-0 fs-5">{service.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div
              className={cx(
                "categories",
                "d-flex justify-content-between flex-wrap align-items-center"
              )}
            >
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Dogs</h6>
                  <p className="fs-4"> 10 items</p>
                </div>
                <img
                  src="images/dog5.jpg"
                  width={110}
                  className={cx("shadow", "img-fluid")}
                  alt="animal"
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Cats</h6>
                  <p className="fs-4">10 items</p>
                </div>
                <img
                  src="images/cat1.jpg"
                  alt="animal"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Dog</h6>
                  <p className="fs-4">10 items</p>
                </div>
                <img
                  src="images/dog2.jpg"
                  alt="animal"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Cat Foot</h6>
                  <p className="fs-4">10 items</p>
                </div>
                <img
                  src="images/cat2.jpg"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                  alt="animal"
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Dog Foot</h6>
                  <p className="fs-4"> 10 items</p>
                </div>
                <img
                  src="images/dog3.jpg"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                  alt="animal"
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Cats</h6>
                  <p className="fs-4">10 items</p>
                </div>
                <img
                  src="images/cat4.jpg"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                  alt="animal"
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Dogs</h6>
                  <p className="fs-4">10 items</p>
                </div>
                <img
                  src="images/dog4.jpg"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                  alt="animal"
                />
              </div>
              <div className={cx("d-flex align-items-center", "gap")}>
                <div>
                  <h6 className="fs-4">Groom Master</h6>
                  <p className="fs-4">10 items</p>
                </div>
                <img
                  src="images/cat5.jpg"
                  className={cx("shadow", "img-fluid")}
                  width={110}
                  alt="animal"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className={cx("section-heading")}>Featured Collection</div>
          </div>
          <div className="row">
            {productState.length > 0 ? (
              productState.map((product: Product, index: any) => {
                if (product.tags === "featured") {
                  return (
                    <div key={index} className="col-3">
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
                              src="images/wish.svg"
                              alt="wishlist"
                              onClick={() => addToWish(product?._id)}
                              style={{ zIndex: "1000" }}
                            />
                          </button>
                        </div>
                        <div className={cx("product-image")}>
                          <img
                            src={
                              product?.images[0]?.url ? product?.images[0]?.url : "images/product"
                            }
                            className="img-fluid mx-auto"
                            alt="product_image"
                          />
                          <img
                            src="images/product.jpg"
                            className="img-fluid mx-auto"
                            alt="product_image"
                          />
                        </div>

                        <div className={cx("product-detail")}>
                          <h6 className={cx("brand")}>{product.brand}</h6>
                          <h5 className={cx("product-title")}>{product?.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            color2={"#ffd700"}
                            value={product?.ratings}
                          />

                          <p className={cx("product-prices")}>$ {product?.price}</p>
                          <div className={cx("action-bar", "position-absolute")}>
                            <div className={cx("d-flex flex-column", "gap-15")}>
                              <button className="border-0 bg-transparent">
                                <img src="images/prodcompare.svg" alt="compare" />
                              </button>
                              <button className="border-0 bg-transparent">
                                <img src="images/view.svg" alt="view" />
                              </button>
                              <button className="border-0 bg-transparent">
                                <img src="images/add-cart.svg" alt="addcart" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })
            ) : (
              <ProductCard grid={1} data={petShopProduct} />
            )}
          </div>
        </div>
      </Container>

      <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className={cx("famous-card", "position-relative")}>
              <img src="images/DogSubbanner1.jpg" className="img-fluid" alt="famous" />
              <div className={cx("famous-content", "position-absolute")}>
                <h5 className="text-black">Warm Paws</h5>
                <h6 className="text-black">Self-Warming Dog Bed</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className={cx("famous-card", "position-relative")}>
              <img src="images/CatSubbanner2.jpg" alt="famous" className="img-fluid" />
              <div className={cx("famous-content-2", "position-absolute")}>
                <h5 className="text-white">Kitten Food</h5>
                <h6 className="text-white">Nekko Jelly Cat Pate 70g</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className={cx("famous-card", "position-relative")}>
              <img src="images/DogSubbanner3.jpg" alt="famous" className="img-fluid" />
              <div className={cx("famous-content-3", "position-absolute")}>
                <h5 className="text-white">Pawsome Pet Supplies</h5>
                <h6 className="text-white">Premium Dog Food</h6>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className={cx("famous-card", "position-relative")}>
              <img src="images/CatSubbaner4.jpg" alt="famous" className="img-fluid" />
              <div className={cx("famous-content-4", "position-absolute")}>
                <h5 className="text-black">Pet Accessories</h5>
                <h6 className="text-black">Shirt for kittens</h6>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className={cx("section-heading")}>Special Products</div>
          </div>
          <div className="row">
            {productState.length > 0 ? (
              productState.map((product: Product, index: any) => {
                if (product.tags === "special") {
                  return <SpecialProduct key={index} data={product} />;
                }
              })
            ) : (
              <ProductCard grid={1} data={petShopProduct} />
            )}
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className={cx("section-heading")}>Our Popular Products</div>
          </div>
          <div className="row">
            {productState.length > 0 ? (
              productState.map((product: Product, index: any) => {
                if (product.tags === "popular") {
                  return (
                    <div key={index} className="col-3">
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
                              src="images/wish.svg"
                              alt="wishlist"
                              onClick={() => addToWish(product?._id)}
                              style={{ zIndex: "1000" }}
                            />
                          </button>
                        </div>
                        <div className={cx("product-image")}>
                          <img
                            src={product?.images[0]?.url}
                            className="img-fluid mx-auto"
                            alt="product_image"
                          />
                          <img
                            src="images/product.jpg"
                            className="img-fluid mx-auto"
                            alt="product_image"
                          />
                        </div>

                        <div className={cx("product-detail")}>
                          <h6 className={cx("brand")}>{product.brand}</h6>
                          <h5 className={cx("product-title")}>{product?.title}</h5>
                          <ReactStars
                            count={5}
                            size={24}
                            color2={"#ffd700"}
                            value={product?.ratings}
                          />

                          <p className={cx("product-prices")}>$ {product?.price}</p>
                          <div className={cx("action-bar", "position-absolute")}>
                            <div className={cx("d-flex flex-column", "gap-15")}>
                              <button className="border-0 bg-transparent">
                                <img src="images/prodcompare.svg" alt="compare" />
                              </button>
                              <button className="border-0 bg-transparent">
                                <img src="images/view.svg" alt="view" />
                              </button>
                              <button className="border-0 bg-transparent">
                                <img src="images/add-cart.svg" alt="addcart" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                }
              })
            ) : (
              <ProductCard grid={1} data={petShopProduct} />
            )}
          </div>
        </div>
      </Container>

      <Container class1={cx("marque-wrapper")}>
        <div className="row">
          <div className="col-12">
            <div className="marque-inner-wrapper">
              <Marquee>
                <div className="mx-4 w-25">
                  <img src="images/brand1.webp" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand2.png" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand3.jpg" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand4.jpg" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand5.png" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand6.png" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand7.png" alt="brand" className={cx("brand-img")} />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand8.jpg" alt="brand" className={cx("brand-img")} />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className={cx("section-heading")}>Our Latest Blogs</div>
          </div>
          {blogState.length > 0
            ? blogState.map((blog, index) => {
                if (index < 4) {
                  return (
                    <div className="col-3" key={index}>
                      <BlogCard data={blog} />
                    </div>
                  );
                }
              })
            : blogData.map((blog: any, index: any) => (
                <div className="col-3" key={index}>
                  <BlogCard data={blog} />
                </div>
              ))}
        </div>
      </Container>
    </>
  );
};

export default HomePage;
