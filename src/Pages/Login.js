import { Form, Button, Col, Row, Card } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isActive, setIsActive] = useState(true);

  const [isCartEmptyVal, setIsCartEmpty] = useState(true);

  useEffect(() => {
    //Validation to enable submit button
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  
  function authenticate(e) {
    
    e.preventDefault();
   

    fetch("https://lit-wave-63074.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.accessToken !== undefined) {
          localStorage.setItem("accessToken", data.accessToken);
          setUser({ accessToken: data.accessToken });

          Swal.fire({
            title: "Yay!",
            icon: "success",
            text: "Successfully Logged in",
          });

          //Getting the user's credentials
          fetch("https://lit-wave-63074.herokuapp.com/users/getUserDetails", {
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
            },
          }).then((res) => res.json()).then((result) => {
              console.log(result);
              if (result.isAdmin === true) {
                setUser({
                  email: result.email,
                  isAdmin: result.isAdmin,
                });
                localStorage.setItem("email", result.email);
                localStorage.setItem("isAdmin", result.isAdmin);

                //redirect the admin to /courses
                navigate("/product");
              } else {
                console.log(result.cart.length)
                if(result.cart.length !== 0){
                  setIsCartEmpty(false);
                }else{
                  setIsCartEmpty(true);
                }
                
                setUser({
                  isAdmin:result.isAdmin,
                  isCartEmpty:isCartEmptyVal})
                  localStorage.setItem("isCartEmpty",isCartEmptyVal)
                //if not an admin, redirect to homepage
                navigate("/");
              }
            });
        } else {
          Swal.fire({
            title: "Ooops!",
            icon: "error",
            text: "Something Went Wrong. Check your Credentials.",
          });
        }

        setEmail("");
        setPassword("");
      });
  }
  return (
    <>
      {(user.accessToken !== null) ?
      <Navigate to="/" />
      :
      <Row className="middle-content-container">
        <h1 className="text-center m-5">Login</h1>
        <Col md={8} lg={4} sm={8}>
          <Card className="p-4">
            <Form onSubmit={(e) => authenticate(e)}>
              <Form.Group>
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              {isActive ? (
                <Button variant="primary" type="submit" className="mt-3">
                
                  Login
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  type="submit"
                  disabled
                  className="mt-3"
                >
                 Login
                </Button>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
}
    </>
  );
}
