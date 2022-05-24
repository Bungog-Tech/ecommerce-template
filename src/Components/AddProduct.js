import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddProduct({fetchData}) {

	//Add state for the forms of Product
	const [name, setName] = useState('');
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')

	//States for our modals to open/close
	const [showAdd, setShowAdd] = useState(false);

	//Functions to handle opening and closing of our AddProduct Modal
	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false)



	//Function for fetching the create Product in the backend
	const addProduct = (e) => {
		e.preventDefault();

		fetch('https://lit-wave-63074.herokuapp.com/products/create-product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${ localStorage.getItem('accessToken') }`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			if(data){
				//Show a success message
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'Product successfully added.'
				})

				//Close our modal
				closeAdd();
				//Render the updated data using the fetchData prop
				fetchData();
			}else {
				Swal.fire({
					title: "Something went wrong",
					icon: 'error',
					text: 'Something went wrong. Please Try again'
				})
				closeAdd();
				fetchData();
			}

			//Clear out the input fields
			setName("")
			setDescription("")
			setPrice("")


		})
	}


	return(
		<>
			<Button variant="primary" onClick={openAdd}>Add New Product</Button>

		{/*Add Modal Forms*/}
			<Modal show={showAdd} onHide={closeAdd}>
				<Form onSubmit={e => addProduct(e)}>
					<Modal.Header closeButton>
						<Modal.Title>Add Product</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<Form.Group>
							<Form.Label>Name</Form.Label>
							<Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Description</Form.Label>
							<Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} required/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Price</Form.Label>
							<Form.Control type="number" value={price} onChange={e => setPrice(e.target.value)} required/>
						</Form.Group>
					</Modal.Body>

					<Modal.Footer>
						<Button variant="secondary" onClick={closeAdd}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
				
			</Modal>

		</>

		)
}

