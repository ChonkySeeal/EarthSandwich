import "./PasswordReset.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function PasswordReset({ setLogin }) {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const formData = new FormData(document.querySelector("#submitForm"));
    axios
      .put(
        `${
          process.env.REACT_APP_API_URL
        }:8080/member/account/${searchParams.get("token")}`,
        formData
      )
      .then((r) => {
        alert("successfully changed password");
        axios
          .get(`${process.env.REACT_APP_API_URL}:8080/member/logout`)
          .then((r) => {
            setLogin(false);
            navigate("/");
          })
          .catch((r) => {
            alert("Unauthorized user attempt");
          });
      })
      .catch((e) => {
        alert(e.response.data.message);
        navigate("/");
      });
  };

  return (
    <div className="passwordResetDiv">
      <Form id="submitForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            name="oldpassword"
            type="password"
            placeholder="CurrentPassword"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            name="newpassword"
            type="password"
            placeholder="NewPassword"
            pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%&]).{8,16}"
            title="Password must contain at least one number, one uppercase, one lowercase, one special character (!@#$%&), and needs to be between 8-16 characters long"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default PasswordReset;
