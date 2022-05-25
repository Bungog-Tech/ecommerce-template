import React, { useState,useEffect} from "react";
import CatalougueCard from "./CatalogueCard";
import { Container, Row } from "react-bootstrap";


export default function ProductCatalogue(){
    const [allProducts,setAllProducts] =useState([]);
    const [hotProduct , sethotProduct] = useState([]);
    

    const fetchData = () => {
        fetch("https://lit-wave-63074.herokuapp.com/products/")
          .then((result) => result.json())
          .then((data) => {
            setAllProducts(data);
        })
          
      };
      
      useEffect(()=>{
        const productArr = allProducts.map(product =>{
            if(product.isActive === true){
                return(
                    <CatalougueCard productData={product} key={product._id}/>
                )
            }else return null;
        })
        sethotProduct(productArr);
        fetchData();
    },[allProducts])
      
    return(
    <Container >
    <Row>
     {hotProduct}
    </Row>
    </Container>)
}