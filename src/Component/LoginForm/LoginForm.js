import "./LoginForm.css";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm({ setLogin }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const valueChanged = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .post(`${process.env.REACT_APP_API_URL}:8080/user/auth`, {
        email: inputs.email,
        password: inputs.password,
      })
      .then((r) => {
        if (r.status === 200) {
          setLogin(true);
          navigate("/");
        }
      })
      .catch((r) => {
        if (r.response.data.message == null)
          alert("something went wrong contact admin");
        else alert(r.response.data.message);
      });
  };

  return (
    <Form className="loginform" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          onChange={valueChanged}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          onChange={valueChanged}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

export default LoginForm;
