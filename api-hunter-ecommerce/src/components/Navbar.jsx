import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Button from "react-bootstrap/Button"
import { useState } from 'react';
import Orders from './Orders';

function BasicExample({cartItems,onShow}) {

  const [showOrder,setShowOrder] = useState(false);

  return (
    <Navbar expand="lg" style={{backgroundColor:"brown"}}>
      <Container>
        <Navbar.Brand href="#home"className='fw-bold ' style={{color:"rgb(226, 200, 200)", fontSize:"25px"}}>KB_SHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           <div className="d-flex gap-4" >
             <Button onClick={onShow} ><i className="fa-solid fa-cart-shopping" ></i>Cart<Badge bg="secondary">{cartItems}</Badge></Button>
            <Button onClick={()=>setShowOrder(true)} >Your Orders</Button>
            {showOrder&&<Orders show={showOrder} hide={()=>setShowOrder(false)}  />}
           </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;