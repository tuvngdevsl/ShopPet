import React from "react";
import classNames from "classnames/bind";
import styles from "./BlogCard.module.scss";
import { Link } from "react-router-dom";
import { Blog } from "../../types/blog.type";

const cx = classNames.bind(styles);
interface BlogCardProps {
  data: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ data }) => {
  console.log(data);
  return (
    <div className={cx("blog-card")}>
      <div className="card-image">
        <img
          src={data?.images[0].url ? data?.images[0].url : "images/blog1.png"}
          alt="blog"
          className="w-100"
          height={220}
        />
      </div>
      <div className={cx("blog-content")}>
        <p className={cx("date")}>{new Date(data?.createdAt).toLocaleString()}</p>
        <h5 className="title"> {data?.title.substring(0, 30) + "..."}</h5>
        <p
          className="desc"
          dangerouslySetInnerHTML={{ __html: data?.description.substring(0, 30) + "..." }}
        ></p>
        <Link to={`/blog/${data?._id}`} className="button">
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
