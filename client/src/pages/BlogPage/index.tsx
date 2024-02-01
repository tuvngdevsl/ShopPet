import BreadCrumb from "../../components/BreadCrumb";
import Meta from "../../components/Meta";
import classNames from "classnames/bind";
import styles from "./Blog.module.scss";
import BlogCard from "../../components/BlogCard";
import Container from "../../components/Container";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../../features/blog/blogSlice";
import { useEffect } from "react";
import { RootState } from "../../app/store";
import blogData from "../../mock/blogData";

const cx = classNames.bind(styles);

const BlogPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const getAllBlog = () => {
    dispatch(getBlogs());
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  const blogState = useSelector((state: RootState) => state.blog.blogs);

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className={cx("filter-card", "mb-3")}>
              <h3 className={cx("filter-title")}>Find by Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Pet Care Tips</li>
                  <li>Product Reviews</li>
                  <li>Training and Behavior</li>
                  <li>Health and Wellness</li>
                  <li>Breed Spotlights</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {blogState.length > 0
                ? blogState.map((blog, index) => {
                    return (
                      <div className="col-3" key={index}>
                        <BlogCard data={blog} />
                      </div>
                    );
                  })
                : blogData.map((blog: any, index: any) => (
                    <div className="col-3" key={index}>
                      <BlogCard data={blog} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogPage;
