import React from "react";
import { Col ,Card } from "react-bootstrap";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

export default function CatalougueCard({ productData }) {
  const {_id, name, price, description } = productData;
  return (
    <Col lg={3} md={6} sm={6}>
        <Card className="m-2 card-min-height h-100"  >
        <Card.Header><b>{name}</b></Card.Header>
          <Card.Body>
            <Card.Subtitle>Description:</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Subtitle>Price:</Card.Subtitle>
            <Card.Text>Php {price} </Card.Text>
            <Link className="btn btn-primary" to={`/product/${_id}`}>View Product</Link>
          </Card.Body>
        </Card>
    </Col>
  );
}
CatalougueCard.propTypes = {
	//shape() method it is used to check if a prop object conforms to a specific 'shape'
	productData: PropTypes.shape({
		//Define the properties and their expected types
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
