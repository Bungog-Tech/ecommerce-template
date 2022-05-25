import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function UnarchiveProduct({productId, isActive, fetchData}) {

	const archiveToggle = (productId) => {
		fetch(`https://lit-wave-63074.herokuapp.com/products/${productId}/archive`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})

		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully disabled'
				})
				fetchData();
			}else {
				Swal.fire({
					title: 'Something Went Wrong',
					icon: 'Error',
					text: 'Please Try again'
				})
				fetchData();
			}


		})
	}
    const restoreToggle = (productId) => {
		fetch(`https://lit-wave-63074.herokuapp.com/products/${productId}/restore`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})

		.then(res => res.json())
		.then(data => {
			console.log(data)
			if(data === true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully restored'
				})
				fetchData();
			}else {
				Swal.fire({
					title: 'Something Went Wrong',
					icon: 'Error',
					text: 'Please Try again'
				})
				fetchData();
			}


		})
	}
 

	return(
		<>
			{isActive ?
           
				<Button variant="outline-warning"  className="over-buttons" onClick={() => archiveToggle(productId)}><i className="fas fa-archive"></i>Archive</Button>

				:

				<Button variant="outline-success" className="over-buttons" onClick={() => restoreToggle(productId)}><i className="fas fa-redo"></i> Restore</Button>

			}
		</>

		)
}
