import React, { useEffect, useState } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Loading from "./Loading";
import Navbar from "./Navbar";
import CartModal from "./CartModal";
import useHttp from "../hooks/http";
import Error from "./Error";

const Product = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const { data:product, loading, error, sendRequest } = useHttp();



  useEffect(() => {
    const fetchProductData = async () => {
    
      sendRequest({
        url:"http://localhost:5000/products",
        method:"GET",
      });
    };

    fetchProductData();
  }, []);

  const handleCart = (prod) => {
    const similarProduct = cart.find((item) => {
      return item.id === prod.id;
    });

    if (similarProduct) {
      setCart((prevItems) =>
        prevItems.map((item) =>
          item.id === prod.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevItems) => [...prevItems, { ...prod, quantity: 1 }]);
    }

    alert("item added to cart");

    console.log("similarProduct", similarProduct);
  };

  console.log("cart Data", cart);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message ={error}/>;
  }

  return (
    <>
      <Navbar cartItems={cart.length} onShow={() => setShowCart(true)} />

      {showCart && (
        <CartModal
          onShow={showCart}
          onClose={() => setShowCart(false)}
          products={cart}
          clearCart={() => setCart([])}
        />
      )}
      <Container>
        <Row>
          {product.map((prod) => {
            return (
              <Col md={3} sm={6} key={prod.id} className="g-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={prod.image}
                    alt={prod.name}
                    style={{
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{prod.name}</Card.Title>

                    <Card.Text className="text-truncate">
                      {prod.description}
                    </Card.Text>

                    <Card.Title className="mt-2">₹{prod.price}</Card.Title>

                    <Button
                      variant="primary"
                      className="mt-auto align-self-start"
                      onClick={() => handleCart(prod)}
                    >
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Product;