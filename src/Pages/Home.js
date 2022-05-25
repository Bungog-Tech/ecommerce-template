import React from "react";
import Carousel from "../Components/Carousel";
import { Container } from "react-bootstrap";
import ProductCatalogue from "../Components/ProductsCatalogue";
import 'holderjs';


export default function Home(){
    return(
        <Container>
            <Carousel />
            <ProductCatalogue  />
        </Container>

    )
}
