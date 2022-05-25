import React, { useEffect, useState } from "react";

import { Container, Table } from "react-bootstrap";
import PopOverButton from "../Components/PopoverButton";
import AddProduct from "../Components/AddProduct";

export default function ProductAdminView(props) {
  const { productData, fetchData } = props;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsArr = productData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
          </td>
          <td><PopOverButton productData = {product._id} fetchData={fetchData} isActive={product.isActive}/></td>
        </tr>
      );
    });
    setProducts(productsArr);
  }, [productData]);

  return (
    <Container>
      <div className="text-center-my-4">
        <h1>Admin Dashboard</h1>
        <AddProduct fetchData={fetchData} />
      </div>

      <Table id="ProductDataTable">
        <thead striped="true" bordered="true" hover="True" responsive ="true">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availabilty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{products}</tbody>
      </Table>
    </Container>
  );
}
