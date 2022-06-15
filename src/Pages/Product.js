import React, { useState,useContext,useEffect } from "react";
import UserContext from "../UserContext";
import ProductUserView from "./ProductUserView";
import ProductAdminView from "./ProductAdminView";
import { Container, Row } from "react-bootstrap";

export default function Product(){

const {user} = useContext(UserContext);
const [allProducts, setAllProducts] = useState([]);


    const fetchData = () => {
        fetch("https://lit-wave-63074.herokuapp.com/products/")
          .then((result) => result.json())
          .then((data) => {
            
              setAllProducts(data);
        });
          
      };
      useEffect(() => {
        fetchData();
        
      }, []);

      return (
        <>
          <Container>
            {user.isAdmin === true ? (
              <ProductAdminView productData={allProducts} fetchData={fetchData} />
            ) : (
              <Row><ProductUserView productData={allProducts} /></Row>
            )}
          </Container>
        </>
      );
}