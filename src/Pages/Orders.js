import React ,{useState,useContext,useEffect}from "react";
import {  Table ,Popover,ButtonToolbar,OverlayTrigger, Button} from "react-bootstrap";
import UserContext from "../UserContext";

export default function Order() {
  const [allOrder ,setAllOrder ] = useState([]);
  
  const {user} =useContext(UserContext);

  const  fetchData = () => {fetch("https://lit-wave-63074.herokuapp.com/orders/currentOrder", {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  }).then(result => result.json()).then(data =>{
      setAllOrder(data)
  })}



  



  

  let orderArr ;
  useEffect(() => {
      if(allOrder !== null && allOrder !== [] && allOrder !== false){

             orderArr = allOrder.map((order) => {
        return (
         <tr>
             <td>{order.totalAmount}</td>
             <td>{order.date}</td>
         </tr>
        );
          
    });
      }else{
         orderArr =<>
          <tr><td>You have no Orders</td></tr>
          
         </>
    
      }
    
    
      setAllOrder(orderArr)
    fetchData();
    
  }, [allOrder]);

  const popoverLeft = (
    <Popover id="popover-positioned-left" title="Popover left">
        <Table>
            <tr>
                <th>Total Amount</th>
                <th>Order Date</th>
            </tr>
            {allOrder}
        </Table>
    
    </Popover>
  );
  return (
    <>
      <ButtonToolbar>
        <OverlayTrigger
          trigger="click"
          rootCloseEvent="mousedown"
          placement="bottom"
          overlay={popoverLeft}
        >
          <Button variant="dark" >
            MY ORDERS
          </Button>
        </OverlayTrigger>
      </ButtonToolbar>
    </>
  );
}
