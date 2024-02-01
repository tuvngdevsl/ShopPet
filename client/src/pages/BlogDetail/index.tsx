import Meta from "../../components/Meta";
import BreadCrumb from "../../components/BreadCrumb";
import styles from "./Blog.module.scss";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "../../components/Container";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../../features/blog/blogSlice";
import { useEffect } from "react";

const cx = classNames.bind(styles);

const BlogDetail: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const blogId = location.pathname.split("/")[2];

  const getBlog = (id: string) => {
    dispatch(getABlog(id));
  };

  useEffect(() => {
    getBlog(blogId);
  });

  const blogState = useSelector((state: RootState) => state.blog);

  return (
    <>
      <Meta title={blogState.blogTitle} />
      <BreadCrumb title={blogState.blogTitle} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className={cx("single-blog-card")}>
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" />
                Go back to Blogs
              </Link>
              <h3 className="title">{blogState.blogTitle}</h3>
              <img src="/images/blog-1.jpg" className="img-fluid my-4" alt="blog" />
              <p dangerouslySetInnerHTML={{ __html: blogState.blogDescription }}></p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogDetail;
