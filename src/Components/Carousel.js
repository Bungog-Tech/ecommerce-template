import React from "react";
import { Carousel } from "react-bootstrap";
import 'holderjs';


export default function Carousels() {
  return (
    <>
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Men's Fest&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>save 10% Cashback on Selected items</h3>
            
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Men's Fest&bg=282c34"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Free Shipping</h3>
         
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Summer Deals&bg=20232a"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Get a chance to win a trip to Boracay</h3>
          
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
