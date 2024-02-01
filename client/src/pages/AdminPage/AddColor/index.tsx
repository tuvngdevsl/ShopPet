import { Input } from "antd";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createColor, getColor, resetState, updateColor } from "../../../features/color/colorSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Meta from "../../../components/Meta";

interface ColorProps {}
const ColorFormSchema = Yup.object().shape({
  title: Yup.string().required("Color name is Required!")
});

const AddColor: React.FC<ColorProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const getColorId = location.pathname.split("/")[3];

  const { isError, isLoading, isSuccess, createdColor, colorTitle, updatedColor } = useSelector(
    (state: RootState) => state.color
  );

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId, dispatch]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Created color successfully!");
    }

    if (isSuccess && updatedColor) {
      toast.success("Updated color successfully!");
      navigate("/admin/list-color");
    }

    if (isError) {
      toast.error("Something went wrong");
    }
  }, [isError, isLoading, isSuccess, updatedColor, createdColor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorTitle || ""
    },
    validationSchema: ColorFormSchema,
    onSubmit: async values => {
      try {
        if (getColorId !== undefined) {
          const data = { id: getColorId, colorData: values };
          await dispatch(updateColor(data));
        } else {
          await dispatch(createColor(values));
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
      <Meta title={getColorId !== undefined ? "Edit Color" : "Add Color"} />
      <div>
        <h3>{getColorId !== undefined ? "Edit" : "Add"} Color</h3>
        <div>
          <form action="" onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
            <div className="mt-4">
              <Input
                name="color"
                type="color"
                placeholder="Enter Color"
                className="form-floating py-3"
                value={formik.values.title}
                onChange={formik.handleChange("title")}
                onBlur={formik.handleBlur("title")}
              />
            </div>
            <div className="error">{formik.touched.title && formik.errors.title}</div>
            <button className="btn btn-success border-0 rounded-3 my-5 py-3" type="submit">
              {getColorId !== undefined ? "Update" : "Add"} Color
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddColor;
