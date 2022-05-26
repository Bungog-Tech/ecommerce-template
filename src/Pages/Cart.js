import React, { useState,useEffect, useContext } from "react";
import { Table, Container, Button } from "react-bootstrap";
import swal from "sweetalert2";
import UserContext from "../UserContext";
import CartTableRowComp from "../Components/CartTableRowComp";

export default function Cart() {
  const  {user} = useContext(UserContext)
  const [allProductsInCart, setAllProductsInCart] = useState([]);
  const [productInCart, setProductInCart] = useState([]);
  const [isEmpty ,setIsEmpty] = useState(true)
  const [totalAmount,setTotalAmount] = useState(1)
  
  let amount =0;

  const toggleOrderCreate =()=>{
    fetch("https://lit-wave-63074.herokuapp.com/orders/createOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${user.accessToken}` },
      body: JSON.stringify({
        totalAmount: totalAmount,
      
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          swal.fire({
            title: "well Done ",
            icon: "success",
            text: "You have sucessfully Created an Order",
          });
         
        } else {
          swal.fire({
            title: "failed ",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  
  }

  const getDataFromDataTable = ()=>{
    let table = document.getElementById('CartDataTable');
    for (let r = 1, n = table.rows.length-1; r < n; r++) {
      try{
        amount += Number(table.rows[r].cells[3].innerHTML)
     
      setTotalAmount(amount);
    }

      catch(e){
        console.log(e.message)
      }
      // amount = totalAmount +   
        // for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
        //     console.log( `ROW : ${r} COL: ${c}  DATA:${table.rows[r].cells[c].innerHTML}`);
        // }
        // setTotalAmount(amount)
    }
  
  }

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
    getDataFromDataTable();
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
       <tfoot className="tfooter"><tr><td colSpan={3}><Button variant="primary" className="my-2" onClick={()=>{toggleOrderCreate()}}>Checkout</Button></td><td colSpan={2}><b>Total Amount : {totalAmount}</b></td></tr></tfoot> 
      }
        
      </Table>
    </Container>
  );
}
