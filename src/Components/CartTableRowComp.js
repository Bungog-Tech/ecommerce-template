import React ,{useState}from "react";
import NumericInput from "react-numeric-input";
import {Button} from "react-bootstrap"
import Swal from "sweetalert2";

export default function CartTableRowComp({product ,fetchData}) {
    const [quantityVal, setQuantityVal] = useState(1);
    
    const pullToggle = (productId) => {
		fetch(`https://lit-wave-63074.herokuapp.com/products/pullCart/${productId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		}).then(res => res.json())
		.then(data => {
			
			if(data === true) {
				Swal.fire({
					title: 'Success',
					icon: 'success',
					text: 'Product successfully removed'
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
  return (<>
  
            

            <tr key={product._id}>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
              <NumericInput
                className="form-control"
                value={quantityVal}
                min={1}
                max={1000}
                step={1}
                precision={0}
                size={5}
                mobile
                onChange={(value) => setQuantityVal(value)}
              />
            </td>
            <td>{product.price * quantityVal}</td>

            <td>
             <Button variant="danger" onClick={() => pullToggle(product._id)}>remove</Button>
            </td>
          </tr>
  
  </>);
}
