import { Table } from "antd";
import { deleteProduct, getProducts, resetState } from "../../../features/product/productSlice";
import { AppDispatch, RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Meta from "../../../components/Meta";
import CustomModal from "../../../components/Modal";

interface ProductListProps {}

const ProductList: React.FC<ProductListProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, [dispatch]);

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const showModal = (id: string) => {
    setIsModalOpen(true);
    setProductId(id);
  };

  const handleDeleteProduct = async (id: string) => {
    await dispatch(deleteProduct(id));
    toast.success("Delete Blog successfully!");
    setIsModalOpen(false);
    dispatch(getProducts());
  };

  const productState = useSelector((state: RootState) => state.product.products);
  const columns = [
    {
      title: "No",
      dataIndex: "key"
    },
    {
      title: "Name",
      dataIndex: "title",
      sorter: (a: any, b: any) => a.title.length - b.title.length
    },
    {
      title: "Brand",
      dataIndex: "brand",
      sorter: (a: any, b: any) => a.brand.length - b.brand.length
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a: any, b: any) => a.category.length - b.category.length
    },
    {
      title: "Color",
      dataIndex: "color"
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a: any, b: any) => a.price - b.price
    },
    {
      title: "Action",
      dataIndex: "action"
    }
  ];

  const data = productState.map((product, index) => ({
    key: index + 1,
    title: product.title,
    brand: product.brand,
    category: product.category,
    color: product?.color,
    price: `${product.price}`,
    action: (
      <>
        <Link className="fs-2 text-danger" to={`/admin/product/${product._id}`}>
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-2 text-danger border-0 bg-transparent"
          onClick={() => {
            showModal(product._id);
          }}
        >
          <AiFillDelete />
        </button>
      </>
    )
  }));

  return (
    <>
      <Meta title={"List Product"} />
      <div>
        <h3 className="mb-4">Products</h3>
        <div>
          <Table columns={columns} dataSource={data} />
          <CustomModal
            title="Are you want to delete this Product!"
            open={isModalOpen}
            hideModal={() => hideModal()}
            performAction={() => {
              handleDeleteProduct(productId);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProductList;
