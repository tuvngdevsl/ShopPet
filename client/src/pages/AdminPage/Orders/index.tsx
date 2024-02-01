import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { AppDispatch } from "../../../app/store";
import { getOrders } from "../../../features/order/orderSlice";

interface OrderProps {}

const Orders: React.FC<OrderProps> = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state: any) => state.order.orders);

  const data = orderState.map((order: any, index: any) => ({
    key: index + 1,
    name: order.orderby.fullname,
    product: <Link to={`/admin/orders/${order.orderby._id}`}> View Orders </Link>,
    amount: order.paymentIntent.amount,
    date: new Date(order.createdAt).toLocaleString(),
    action: (
      <>
        <Link className="fs-2 text-danger" to="/">
          <BiEdit />
        </Link>
        <Link className="ms-3 fs-2 text-danger" to="/">
          <AiFillDelete />
        </Link>
      </>
    )
  }));

  const columns = [
    { title: "No", dataIndex: "key" },
    { title: "Name", dataIndex: "name" },
    { title: "Product", dataIndex: "product" },
    { title: "Amount", dataIndex: "amount" },
    { title: "Date", dataIndex: "date" },
    { title: "Action", dataIndex: "action" }
  ];

  return (
    <div>
      <h3 className="mb-4">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Orders;
