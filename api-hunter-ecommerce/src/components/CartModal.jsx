import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Image from "react-bootstrap/Image";
import axios from "axios";
import useHttp from "../hooks/http";
import Loading from "./Loading";
import Error from "./Error";

function CartModal({ onShow, onClose, products, clearCart }) {
  
  const { loading, error, sendRequest } = useHttp();

  const totalAmount = products.reduce((acc, curr) => {
    return (acc += curr.price * curr.quantity);
  }, 0);

  const handlePlaceOrder = async () => {

    const orderData = {
      products,
      totalAmount,
      status: "pending",
      CreateAt: new Date().toISOString(),
    };

    try {
     

      sendRequest({
        url:"http://localhost:5000/orders",
        method:"POST",
        body:orderData
      });

      alert("order placed successfully");
      onClose();
      clearCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div
      className="modal show d-flex flex-column justify-content-center align-items-center"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={onShow} onHide={onClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Your Cart Items</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {products.length <= 0 ? (
            <p className="text-center">Your Cart Is empty</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      {
                        <Image
                          rounded
                          src={item.image}
                          alt={item.name}
                          style={{ maxWidth: "100px", objectFit: "contain" }}
                        />
                      }
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        {products.length > 0 ? (
          <Modal.Footer className="d-flex justify-content-between w-100">
            <div>
              <h5>Total Amount = ₹{totalAmount}</h5>
            </div>
            <Button variant="primary" onClick={() => handlePlaceOrder()}>
              Place Order
            </Button>
          </Modal.Footer>
        ) : null}
      </Modal>
    </div>
  );
}

export default CartModal;