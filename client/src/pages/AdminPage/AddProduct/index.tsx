import React, { useEffect, useState } from "react";
import Input from "../../../components/Input";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../features/brand/brandSlice";
import { getCategories } from "../../../features/category/categorySlice";
import { getColors } from "../../../features/color/colorSlice";
import { AppDispatch, RootState } from "../../../app/store";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../../../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateAProduct
} from "../../../features/product/productSlice";
import { Select } from "antd";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../../../components/Meta";
interface ProductProps {}

const AddProduct: React.FC<ProductProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [colorS, setColorS] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state: RootState) => state.brand.brands);
  const categoryState = useSelector((state: RootState) => state.category.categories);
  const colorState = useSelector((state: RootState) => state.color.colors);
  const imageState = useSelector((state: RootState) => state.upload.images);
  const {
    isSuccess,
    isError,
    isLoading,
    createdProduct,
    updatedProduct,
    productTitle,
    productBrand,
    productCategory,
    productColor,
    productDescription,
    productTags,
    productImages,
    productPrice,
    productQuantity
  } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getAProduct(getProductId));
      img.push(productImages);
      colorOpt.push(productColor);
    } else {
      dispatch(resetState());
    }
  }, [getProductId, dispatch]);

  useEffect(() => {
    // Set the default selected colors for the Select component
    setColorS(productColor);
  }, [productColor]);

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Add Successfully");
    }

    if (isSuccess && updatedProduct) {
      toast.success("Updated product successfully!");
      // navigate("/admin/list-product");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isLoading, isSuccess, createdProduct, updatedProduct, navigate]);

  const colorOpt: any = [];
  colorState.forEach((color: any) => {
    colorOpt.push({
      value: color._id,
      label: color.title
    });
  });

  const img: any = [];
  imageState.forEach((i: any) => {
    img.push({
      public_id: i.public_id,
      url: i.url
    });
  });

  useEffect(() => {
    formik.values.color = colorS ? colorS : " ";
    formik.values.images = img;
  }, [productColor, productImages]);

  const ProductFormSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().required("Description is Required"),
    price: Yup.number().required("Price is Required"),
    brand: Yup.string().required("Brand is Required"),
    category: Yup.string().required("Category is Required"),
    tags: Yup.string().required("Tag is Required"),
    color: Yup.array().min(1, "Choose at least one color").required("Color is Required"),
    quantity: Yup.number().required("Quantity is Required")
  });

  console.log(productTags);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: productTitle || "",
      description: productDescription || "",
      price: productPrice || "",
      brand: productBrand || "",
      category: productCategory || "",
      tags: productTags || "",
      color: productColor || "",
      images: productImages || "",
      quantity: productQuantity || ""
    },

    validationSchema: ProductFormSchema,
    onSubmit: async values => {
      try {
        if (getProductId !== undefined) {
          const data = { id: getProductId, productData: values };
          await dispatch(updateAProduct(data));
          dispatch(resetState());
        } else {
          await dispatch(createProducts(values));
          formik.resetForm();
          dispatch(resetState());
        }
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  });

  const handleColor = (e: any) => {
    setColorS(e);
  };
  return (
    <>
      <Meta title={getProductId !== undefined ? "Edit Product" : "Add Product"} />
      <div>
        <h3 className="mb-4">{getProductId !== undefined ? "Edit Product" : "Add Product"}</h3>
        <div>
          <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
            <Input
              name=""
              type="text"
              placeholder="Enter Product Title"
              classname="form-floating py-3"
              value={formik.values.title}
              onchange={formik.handleChange("title")}
              onblur={formik.handleBlur("title")}
            />
            <div className="error">{formik.touched.title && formik.errors.title}</div>
            <div className="">
              <ReactQuill
                theme="snow"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              />
            </div>
            <div className="error">{formik.touched.description && formik.errors.description}</div>
            <Input
              name=""
              type="text"
              placeholder="Enter Product Price"
              classname="form-floating py-3"
              value={formik.values.price}
              onchange={formik.handleChange("price")}
              onblur={formik.handleBlur("price")}
            />
            <div className="error">{formik.touched.price && formik.errors.price}</div>

            <select
              name="brand"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
              id=""
              className="form-control py-3"
            >
              <option value="">Select Brand</option>
              {brandState.map((brand: any, index: any) => {
                return (
                  <option key={index} value={brand.title}>
                    {brand.title}
                  </option>
                );
              })}
            </select>

            <div className="error">{formik.touched.brand && formik.errors.brand}</div>
            <select
              name="category"
              id=""
              className="form-control py-3"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            >
              <option value="">Select Category</option>
              {categoryState.map((category: any, index: any) => {
                return (
                  <option key={index} value={category.title}>
                    {category.title}
                  </option>
                );
              })}
            </select>
            <div className="error">{formik.touched.category && formik.errors.category}</div>

            <select
              name="tags"
              id=""
              className="form-control py-3"
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
              value={formik.values.tags}
            >
              <option value="" disabled>
                Select Tags
              </option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">{formik.touched.tags && formik.errors.tags}</div>

            <Select
              mode="multiple"
              allowClear
              className="w-100"
              placeholder="Select colors"
              defaultValue={colorS}
              value={colorS}
              onChange={(i: any) => handleColor(i)}
              options={colorOpt}
            />
            <div className="error">
              {formik.touched.color && typeof formik.errors.color === "string"
                ? formik.errors.color
                : null}
            </div>

            <Input
              name="quantity"
              type="number"
              placeholder="Enter Product Quantity"
              classname="form-floating py-3"
              value={formik.values.quantity}
              onchange={formik.handleChange("quantity")}
              onblur={formik.handleBlur("quantity")}
            />
            <div className="error">{formik.touched.quantity && formik.errors.quantity}</div>
            <div className="bg-white border-1 p-5 text-center">
              <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="show-images  d-flex flex-wrap gap-3">
              {imageState?.map((image: any, index: any) => {
                return (
                  <div className="position-relative" key={index}>
                    <button
                      type="button"
                      onClick={() => dispatch(delImg(image.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={image.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
              {getProductId !== undefined ? "Update Product" : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
