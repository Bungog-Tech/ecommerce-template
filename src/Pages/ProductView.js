import React,{useEffect,useContext,useState} from "react";
import { Container,Card,Button } from "react-bootstrap";
import UserContext from '../UserContext';
import { useParams,useNavigate,Link } from "react-router-dom";
import Swal from "sweetalert2";


export default function ProductView() {

	const navigate = useNavigate();

	//useParams() contains any values we are tryilng to pass in the URL stored
	//useParams is how we receive the productId passed via the URL
	const { productId } = useParams();

	useEffect(() => {

		fetch(`https://lit-wave-63074.herokuapp.com/products/product/${productId}`)
		.then(res => res.json())
		.then(data => {
			setName(data.name)
			setDescription(data.description)
			setPrice(data.price)
		})

	} ,[])

	const { user } = useContext(UserContext);

	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')



	//addtoCart function
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


	return (
		<Container>
			<Card>
				<Card.Header>
					<h4>{name}</h4>
				</Card.Header>

				<Card.Body>
					<Card.Text>{description}</Card.Text>
					<h6>Price: Php {price}</h6>
				</Card.Body>

				<Card.Footer>

					{
                        user.accessToken !== null ?
                        <div className="d-grid gap-2">
                            <Button variant="primary" className="col-2" onClick={() => addtoCart(productId)}>
                                Add to Cart
                            </Button>
                        </div>
                        :
                        <Link className="btn btn-warning d-grid gap-2 col-2" to="/login">
                            Login to add to Cart
                        </Link>
                    }
					
				</Card.Footer>
			</Card>
		</Container>

		)
}


