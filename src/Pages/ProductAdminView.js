import React, { useEffect, useState } from "react";
import {MDBDataTableV5 } from "mdbreact";

export default function ProductAdminView({productData}){
    const [products , setProduct] =useState([]);

    useEffect(()=>{
        const productArr = productData.map(product =>{
            return(
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>{product.isActive ? "Available" : "Unavailable"}</td>
                </tr>
            )
        })
        setProduct(productArr)
    })
    return(
        <>  
        <MDBDataTableV5 hover 
        entriesOptions={[5, 20, 25]}
        entries={5}
        pagesAmount={4}
        pagingTop
        searchTop
        searchBottom={false}
        barReverse
        >
            <thead>
                 <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Availabilty</th>
                        <th>Action</th>
                    </tr>
            </thead>
            <tbody>
                {products}
            </tbody>
            
        </MDBDataTableV5>
        </>
    )
}