import React, { useState,useEffect, useContext } from "react";
import { Table, Container, Button } from "react-bootstrap";

import UserContext from "../UserContext";
import CartTableRowComp from "../Components/CartTableRowComp";

export default function Cart() {
  const  {user} = useContext(UserContext)
  const [allProductsInCart, setAllProductsInCart] = useState([]);
  const [productInCart, setProductInCart] = useState([]);
  const [isEmpty ,setIsEmpty] = useState(true)
  const [totalAmount] = useState(1)
 

  // const getDataFromDataTable = ()=>{
    // let table = document.getElementById('CartDataTable');
    // for (let r = 1, n = table.rows.length; r < n; r++) {
    //   console.log(table.rows[r].cells[3].innerHtml)
    //   // amount = totalAmount +   
    //     // for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
    //     //     console.log( `ROW : ${r} COL: ${c}  DATA:${table.rows[r].cells[c].innerHTML}`);
    //     // }
    //     // setTotalAmount(amount)
    // }
  
  // }

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
    // getDataFromDataTable();
  }, [allProductsInCart]);
  return (
    <Container>
      <h1>Your Shopping Cart</h1>
      <Table id="CartDataTable">
        <thead striped ="true" bordered="true" hover="true" responsive="true">
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
       <tfoot className="tfooter"><tr><td colSpan={3}><Button variant="primary" className="my-2">Checkout</Button></td><td colSpan={2}><b>Total Amount : {totalAmount}</b></td></tr></tfoot> 
      }
        
      </Table>
    </Container>
  );
}
