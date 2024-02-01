import { useEffect } from "react";
import Input from "../../../components/Input";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../../../features/upload/uploadSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/store";
import { toast } from "react-toastify";
import { createBlog, getABlog, resetState, updateABlog } from "../../../features/blog/blogSlice";
import { getBlogCategories } from "../../../features/bCategory/bCategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../../../components/Meta";

const BlogFormSchema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  category: Yup.string().required("Category is Required")
});

const AddBlog: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split("/")[3];
  const imageState = useSelector((state: RootState) => state.upload.images);
  const bCategoryState = useSelector((state: RootState) => state.bCategory.bCategories);

  const {
    isSuccess,
    isError,
    isLoading,
    createdBlog,
    blogCategory,
    blogDescription,
    blogTitle,
    updatedBlog,
    blogImages
  } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId, dispatch]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Add Blog Successfully");
    }

    if (isSuccess && updatedBlog) {
      toast.success("Updated blog successfully!");
      navigate("/admin/list-blog");
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isLoading, isSuccess, updatedBlog, createdBlog, navigate]);

  const img: any = [];
  imageState.forEach((i: any) => {
    img.push({
      public_id: i.public_id,
      url: i.url
    });
  });

  console.log(img);
  useEffect(() => {
    formik.values.images = img;
  }, []);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogTitle || "",
      description: blogDescription || "",
      category: blogCategory || "",
      images: blogImages || ""
    },
    validationSchema: BlogFormSchema,
    onSubmit: async values => {
      try {
        if (getBlogId !== undefined) {
          const data = { id: getBlogId, blogData: values };
          await dispatch(updateABlog(data));
          dispatch(resetState());
        } else {
          dispatch(createBlog(values));
          dispatch(resetState());
          formik.resetForm();
        }
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      } catch (error) {
        toast.error("An error occurred");
      }
    }
  });

  return (
    <>
      <Meta title={getBlogId !== undefined ? "Edit Blog" : "Add Blog"} />
      <div>
        <h3 className="mb-4">{getBlogId !== undefined ? "Edit Blog" : "Add Blog"}</h3>
        <div className="">
          <form className="d-flex gap-3 flex-column" onSubmit={formik.handleSubmit}>
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
            <div className="mt-4">
              <Input
                name=""
                type="text"
                placeholder="Enter Blog title"
                classname="form-floating py-3"
                value={formik.values.title}
                onchange={formik.handleChange("title")}
                onblur={formik.handleBlur("title")}
              />
            </div>
            <div className="error">{formik.touched.title && formik.errors.title}</div>
            <select
              name=""
              id=""
              className="form-control py-3"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            >
              <option value="">Select Blog Category</option>
              {bCategoryState.map((category, i) => {
                return (
                  <option key={i} value={category.title}>
                    {category.title}
                  </option>
                );
              })}
            </select>
            <div className="error">{formik.touched.category && formik.errors.category}</div>
            <ReactQuill
              theme="snow"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
            <div className="error">{formik.touched.description && formik.errors.description}</div>
            <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
              {getBlogId !== undefined ? "Edit Blog" : "Add Blog"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
