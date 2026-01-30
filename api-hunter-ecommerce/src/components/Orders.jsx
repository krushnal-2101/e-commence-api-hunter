import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useHttp from "../hooks/http";
import Error from "./Error";
import Loading from "./Loading";

const Orders = ({ show, hide }) => {
  const [orders, setOrders] = useState([]);

  console.log("orders data", orders);

  const { sendRequest, loading, error } = useHttp();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await sendRequest({
          url: "http://localhost:5000/orders",
          method: "GET",
        });

        const data = res;

        console.log("fetch order data", data);

        if (data.length <= 0) {
          throw new Error("no order data found");
        } else {
          setOrders(data || []);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchOrderData();
  }, [sendRequest]);


  const handleOrderStatus = async (id, status) => {
    try {
      const res = await sendRequest({
        url: `http://localhost:5000/orders/${id}`,
        method: "PATCH",
        body: { status },
      });

      alert("order status updated successfully");

      setOrders((prevOrder) =>
        prevOrder.map((prod) =>
          prod.id === id ? { ...prod, status: status } : prod
        )
      );
    } catch (error) {
      console.log(error.message);
    }

    alert("order status updated successfully");
  };

  const handleDelete = async (id) => {
    try {
      const res = await sendRequest({
        url: `http://localhost:5000/orders/${id}`,
        method: "DELETE",
      });

      setOrders((prevOrder) => prevOrder.filter((ord) => ord.id !== id));
      hide();
    } catch (error) {
      console.log(error.message);
    }

    alert("order deleted successfully");
  };

  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Your Orders
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orders.length <= 0 ? (
          <p>No order data found</p>
        ) : (
          <Table bordered striped hover responsive>
            <thead>
              <tr>
                <th>Order id</th>
                <th>Product</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Create At</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td>{ord.id}</td>
                  <td>
                    <ul>
                      {ord.products.map((prod) => (
                        <li key={prod.id}>
                          {prod.name} X {prod.quantity}
                          <br />
                          <small>{prod.price}</small>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{ord.totalAmount}</td>
                  <td>{ord.status}</td>
                  <td>{new Date(ord.CreateAt).toLocaleString()}</td>
                  <td>
                    {
                      <Button
                        className="btn btn-success"
                        onClick={() => handleOrderStatus(ord.id, "Completed")}
                        disabled={ord.status === "Completed"}
                      >
                        complete
                      </Button>
                    }
                  </td>
                  <td>
                    {
                      <Button
                        className="btn btn-danger"
                        onClick={() => handleDelete(ord.id)}
                      >
                        Delete
                      </Button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Orders;