import React,{useState} from "react";
import { Form, Button ,Modal } from "react-bootstrap";
import Swal from "sweetalert2";

export default function EditProduct({fetchData,product}){

	//state for productId for the fetch URL
	const [productId, setproductId] = useState('');

	//Forms state
	//Add state for the forms of product
	const [name, setName] = useState('');
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')

	//state for editproduct Modals to open/close
	const [showEdit, setShowEdit] = useState(false)

	//function for opening the modal
	const openEdit = (productId) => {
		//to still get the actual data from the form
		fetch(`https://lit-wave-63074.herokuapp.com/products/product/${ productId }`)
		.then(res => res.json())
		.then(data => {
			//populate all the input values with product info that we fetched
			setproductId(data._id);
			setName(data.name);
			setDescription(data.description);
			setPrice(data.price)
		})

		//Then, open the modal
		setShowEdit(true)
	}

	const closeEdit = () => {
		setShowEdit(false);
		setName('')
		setDescription('')
		setPrice(0)
	}

	//function to update the product
	const editproduct = (e, productId) => {
		e.preventDefault();

		fetch(`https://lit-wave-63074.herokuapp.com/products/product/${ productId }`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {
			

			if(data === true) {
				Swal.fire({
					title: 'Success!',
					icon: 'success',
					text: 'product Successfully Updated'
				})
				closeEdit();
				fetchData();
			} else {
				Swal.fire({
					title: 'Error!',
					icon: 'error',
					text: 'Please try again'
				})
				closeEdit();
				fetchData();
			}
		})
	}






	return(
		<>  
             <Button variant="outline-primary" className="over-buttons" onClick={() => openEdit(product)}><i className="far fa-edit"></i> Edit</Button>
			
		{/*Edit Modal Forms*/}
			<Modal show={showEdit} onHide={closeEdit} data-backdrop="static">
				<Form onSubmit={e => editproduct(e, productId)}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Product</Modal.Title>
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
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="success" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
				
			</Modal>
		</>
		)
}

