import React, { useState,useEffect, useContext } from "react";
import { Table, Container, Button } from "react-bootstrap";

import UserContext from "../UserContext";
import CartTableRowComp from "../Components/CartTableRowComp";

export default function Cart() {
  const  {user} = useContext(UserContext)
  const [allProductsInCart, setAllProductsInCart] = useState([]);
  const [productInCart, setProductInCart] = useState([]);
  const [isEmpty ,setIsEmpty] = useState(true)
  

  const fetchData = () => {
    fetch("https://lit-wave-63074.herokuapp.com/products/cart", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((result) => result.json())
      .then((data) => {
        setAllProductsInCart(data);
      });
  };
  
  let productArr ;
  useEffect(() => {
      if(allProductsInCart !== null && allProductsInCart !== [] && allProductsInCart !== false){

             productArr = allProductsInCart.map((product) => {
              setIsEmpty(false)
        return (
          <CartTableRowComp key={product._id} product={product} fetchData={fetchData}/>
        );
          
    });
      }else{
         productArr =<>
          <h1>You have no Items in your cart</h1>
          
         </>
         setIsEmpty(true);
      }
    
  
    setProductInCart(productArr);
    fetchData();
  }, [allProductsInCart]);
  return (
    <Container>
      <h1>Your Shopping Cart</h1>
      <Table id="ProductDataTable">
        <thead striped bordered hover responsive>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{productInCart}</tbody>
        {(isEmpty)?
        <tfoot></tfoot>
       
      :
       <tfoot><Button variant="primary" className="mt-5">Checkout</Button></tfoot>
      }
        
      </Table>
    </Container>
  );
}
