import React from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";



export default function DeleteProduct({fetchData,product}){
    const deleteToggle = (productId) => {
		fetch(`https://lit-wave-63074.herokuapp.com/products/product/${productId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		}).then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully DELETED'
				})
				fetchData();
			}else {
				Swal.fire({
					title: `${data.message}`,
					icon: 'Error',
					text: 'Please Try again'
				})
				fetchData();
			}


		})
	}

    return (<Button variant="outline-danger" className="over-buttons" onClick={() => deleteToggle(product)}><i className="far fa-trash-alt"></i> Delete</Button>)

}