import React, { useState,useEffect } from "react";
import { Col } from "react-bootstrap";
import ProductCard from "../Components/ProductCard";

export default function ProductUserView ({productData}){

    const [products , setProduct] = useState([])
    useEffect(()=>{
        const productArr = productData.map(product =>{
            if(product.isActive === true){
                return(
                        <Col lg={4} md={6} sm={12}>
                            <ProductCard productData={product} key={product._id}/>
                        </Col>
                )
            }else return null;
        })
        setProduct(productArr);
    },[productData])
    return(
    <>
    {products}
    </>

    )
}