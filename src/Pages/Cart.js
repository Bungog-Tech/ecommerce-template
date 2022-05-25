import React, { useState,useEffect, useContext } from "react";
import { Table,Button, Container } from "react-bootstrap";
import NumericInput from "react-numeric-input";
import UserContext from "../UserContext";

export default function Cart() {
  const  {user} = useContext(UserContext)
  const [allProductsInCart, setAllProductsInCart] = useState([]);
  const [productInCart, setProductInCart] = useState([]);
  const [quantityVal, setQuantityVal] =useState(1);

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

  useEffect(() => {
    
    const productArr = allProductsInCart.map((product) => {
      
        return (
          <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <NumericInput
                className="form-control"
                value={quantityVal}
                min={0}
                max={1000}
                step={1}
                precision={0}
                size={5}
                mobile
                onChange={(value) => setQuantityVal(value)}
              />
            </td>
            <td>{product.price * quantityVal}</td>

            <td>
             <Button variant="danger">remove</Button>
            </td>
          </tr>
        );
     
    });
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
      </Table>
    </Container>
  );
}
