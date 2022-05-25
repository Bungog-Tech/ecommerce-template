

import React,{useContext} from "react";
import { Card,Button } from "react-bootstrap";
import UserContext from '../UserContext';
import {useNavigate,Link } from "react-router-dom";
import Swal from "sweetalert2";


export default function ProductCard({productData}){
  const navigate = useNavigate();

    const {user} = useContext(UserContext)
  const {name,price,description,_id} = productData;
 
  
  const addtoCart = (productId) => {

		fetch(`https://lit-wave-63074.herokuapp.com/products/addCart/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
		})
		.then(res => res.json())
		.then(data => {
      if(data === true) {
				Swal.fire({
					title: 'Successfully Added to Cart',
					icon: 'success'
				})

				navigate('/product')
			}
            else {
				Swal.fire({
					title:`${data.message}`,
					icon: 'error'

				})
			}
		})
	}

  

    return(
        <>
        <Card className="mt-2">
        <Card.Body>
          <Card.Title>{name}</Card.Title>

          <Card.Subtitle>Description:</Card.Subtitle>
          <Card.Text>{description}</Card.Text>
          <Card.Subtitle>Price:</Card.Subtitle>
          <Card.Text>Php {price} </Card.Text>
          
         
          {
                        user.accessToken !== null ?
                        <div className="d-grid gap-2">
                            <Button variant="primary" className="col-2" onClick={() => addtoCart(_id)}>
                                Add to Cart
                            </Button>
                        </div>
                        :
                        <Link className="btn btn-warning d-grid gap-2 col-2" to="/login">
                            Login to add to Cart
                        </Link>
                    }
         
        </Card.Body>
      </Card>
        </>
    )
}