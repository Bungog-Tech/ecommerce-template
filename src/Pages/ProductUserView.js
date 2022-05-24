import React, { useState,useEffect } from "react";
import ProductCard from "../Components/ProductCard";

export default function ProductUserView ({productData}){

    const [products , setProduct] = useState([])
    useEffect(()=>{
        const productArr = productData.map(product =>{
            if(product.isActive === true){
                return(
                    <ProductCard productData={product} key={product._id}/>
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