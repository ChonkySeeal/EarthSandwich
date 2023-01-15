import "./RegisterForm.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterForm() {
  const [inputs, setInputs] = useState({});

  const navigate = useNavigate();

  const valueChanged = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/user/register", {
        email: inputs.email,
        password: inputs.password,
        username: inputs.username,
      })
      .then((message) => {
        alert("registration complete!");
        navigate("/user/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Form className="registerform" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={valueChanged}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
          title="must follow proper email format"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={valueChanged}
          pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%&]).{8,16}"
          title="Password must contain at least one number, one uppercase, one lowercase, one special character (!@#$%&), and needs to be between 8-16 characters long"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder="Enter username"
          name="username"
          pattern="^[a-zA-Z]{1}[a-zA-Z0-9_]{4,11}$"
          title="username must start with letter and needs to be between 5-12 characters long"
          onChange={valueChanged}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default RegisterForm;
