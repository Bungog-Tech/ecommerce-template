import React from "react";

import { Card , Button} from "react-bootstrap";

export default function ProductCard({productData}){

  const {name,price,description} = productData;
  

  

    return(
        <>
        <Card className="mt-2">
        <Card.Body>
          <Card.Title>{name}</Card.Title>

          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>Php {price} </Card.Text>
          
         
            <Button variant="primary" >
              Add to Cart
            </Button>
         
        </Card.Body>
      </Card>
        </>
    )
}