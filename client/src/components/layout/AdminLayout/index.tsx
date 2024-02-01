import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined
} from "@ant-design/icons";
import { IoIosNotifications } from "react-icons/io";
import { Layout, Menu, Button, theme } from "antd";
import { ImBlog } from "react-icons/im";
import { AiOutlineBgColors, AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { SiBrandfolder } from "react-icons/si";
import { FaBloggerB, FaClipboardList } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { BiCategoryAlt } from "react-icons/bi";
import styles from "./Adminlayout.module.scss";
import classNames from "classnames/bind";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiCouponLine } from "react-icons/ri";

const cx = classNames.bind(styles);

const { Header, Sider, Content } = Layout;

type Props = {
  children: React.ReactNode;
};

const AdminLayout = (props: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={cx("logo")}>
          <h2 className="text-white text-center py-4 mb-0">
            <span className={cx("sm-logo")}>NB</span>
            <span className={cx("lg-logo")}>Northwest Brother</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={({ key }: { key: React.Key }) => {
            if (key === "signout") {
              navigate("/");
            } else {
              navigate(String(key));
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard"
            },
            {
              key: "customers",
              icon: <UserOutlined className="fs-4" />,
              label: "Customers"
            },
            {
              key: "catalog",
              icon: <UploadOutlined className="fs-4" />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Add Product"
                },
                {
                  key: "list-product",
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: "Product List"
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Add Brand"
                },
                {
                  key: "list-brand",
                  icon: <SiBrandfolder className="fs-4" />,
                  label: "Brand List"
                },
                {
                  key: "category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Add Category"
                },
                {
                  key: "list-category",
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: "Category List"
                },
                {
                  key: "color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Add Color"
                },
                {
                  key: "list-color",
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: "Color List"
                }
              ]
            },
            {
              key: "marketing",
              icon: <RiCouponLine className="fs-4" />,
              label: "Marketing",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Coupon"
                },
                {
                  key: "list-coupon",
                  icon: <RiCouponLine className="fs-4" />,
                  label: "Coupon List"
                }
              ]
            },
            {
              key: "blogs",
              icon: <FaBloggerB className="fs-4" />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog className="fs-4" />,
                  label: "Add Blog"
                },
                {
                  key: "list-blog",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog List"
                },
                {
                  key: "blog-category",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Add Blog Category"
                },
                {
                  key: "blog-category-list",
                  icon: <FaBloggerB className="fs-4" />,
                  label: "Blog Category List"
                }
              ]
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders"
            },
            {
              key: "enquiries",
              icon: <FaClipboardList className="fs-4" />,
              label: "Enquiries"
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64
            }}
          />
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <img
                  width={32}
                  height={32}
                  className="rounded-5"
                  src="https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/408540360_1038450527401146_8650066920448674489_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeFAgRGmfBkMSXTfib9nTA5cO5FAs1K4P687kUCzUrg_r4wmfaKZrXfnrf39O0gIc4Es-LxrNqgf7KIh90SXKvE3&_nc_ohc=ITPizW70XoMAX9KZDpB&_nc_ht=scontent.fhan14-1.fna&oh=00_AfBsIK5-ST_tBE0-_FMw5s4ztlzsPbM4Vigdv-_-NYJ2HA&oe=65B48C6D"
                  alt="avatar"
                />
              </div>
              <button
                className="dropdown"
                type="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Vu Tu</h5>
                <p className="mb-0">tuvngdevsl@gmail.com</p>
              </button>
            </div>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <Link
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="#"
                >
                  Logout
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="#"
                >
                  Change Password
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item py-1 mb-1"
                  style={{ height: "auto", lineHeight: "20px" }}
                  to="#"
                >
                  View Profile
                </Link>
              </li>
            </div>
          </div>
        </Header>
        <div className={cx("admin")}>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            {props.children}
            <ToastContainer
              position="top-right"
              autoClose={250}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="light"
            />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
