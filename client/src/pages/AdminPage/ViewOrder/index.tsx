import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch } from "../../../app/store";
import { getOrderByUser } from "../../../features/order/orderSlice";

interface OrderProps {}

const columns = [
  { title: "No", dataIndex: "key" },
  { title: "Product Name", dataIndex: "name" },
  { title: "Brand", dataIndex: "brand" },
  { title: "Count", dataIndex: "count" },
  { title: "Color", dataIndex: "color" },
  { title: "Amount", dataIndex: "amount" },
  { title: "Date", dataIndex: "date" }
];

const ViewOrder: React.FC<OrderProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname.split("/")[3];

  useEffect(() => {
    dispatch(getOrderByUser(userId));
  }, [dispatch, userId]);

  const orderState = useSelector((state: any) => state.order.orderByUser?.products);

  const data = orderState?.map((order: any, index: any) => ({
    key: index + 1,
    name: order.product.title,
    brand: order.product.brand,
    count: order.count,
    amount: order.product.price,
    color: order.product.color,
    date: new Date(order.product.createdAt).toDateString()
  }));

  return (
    <div>
      <h3 className="mb-4">View Order</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default ViewOrder;
