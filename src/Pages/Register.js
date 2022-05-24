import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import swal from "sweetalert2";
import { Navigate,useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (
      (email !== "" &&
      password !== "" &&
      password2 !== "")
     &&( password2 === password)
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password, password2]);

  function registerUser(e) {
    e.preventDefault();
    setEmail("");
    setPassword("");
    setPassword2("");


    fetch("https://lit-wave-63074.herokuapp.com/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          swal.fire({
            title: "well Done ",
            icon: "success",
            text: "You have sucessfully registered",
          });
          navigate('/login')
        } else {
          swal.fire({
            title: "failed ",
            icon: "error",
            text: `${data.message}`,
          });
        }
      });
  }

  return user.accessToken !== null ? (
    <Navigate to="/login" />
  ) : (
    <Row className="middle-content-container">
      <h1 className="text-center m-5">Register</h1>
      <Col md={8} lg={4} sm={8}>
      <Card className="p-4">
          <Form onSubmit={(e) => registerUser(e)}>
           

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>

            {isActive ? (
              <Button variant="primary" type="submit" className="mt-1">
                Submit
              </Button>
            ) : (
              <Button
                variant="secondary"
                type="submit"
                className="mt-1"
                disabled
              >
                Submit
              </Button>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
