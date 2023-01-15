import "./MyAccount.css";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:8080/member/account`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    const formData = new FormData(document.querySelector("#submitForm"));
    axios
      .put("http://localhost:8080/member/account", formData)
      .then((r) => {
        alert("password successfully changed");
      })
      .catch((r) => {
        alert(r.response.data.message);
      });
  };

  //show passwordForm logic
  function showForm() {
    setShowPasswordForm(!showPasswordForm);
  }

  //account delete logic
  const deleteAccount = () => {
    if (
      window.confirm("your account will be permanently deleted are you sure?")
    ) {
      axios.defaults.withCredentials = true;
      axios
        .delete(`http://localhost:8080/member/account`)
        .then(() => {
          alert("your account is permanently deleted");
          navigate("/");
        })
        .catch((r) => {
          if (r.response.request.status === 401) {
            alert("Unauthorized user attempt");
            navigate("/");
          } else {
            console.log(r);
          }
        });
    }
  };

  return (
    <div className="myAccountInfoDiv">
      <Form id="submitForm" onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={userInfo.email || ""}
            readOnly
            disabled
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={userInfo.username || ""}
            readOnly
            disabled
          />
        </Form.Group>
        <Button
          className="mb-3 showPasswordFormBtn"
          variant="dark"
          onClick={showForm}
        >
          Change Password
        </Button>
        {showPasswordForm && (
          <div>
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
          </div>
        )}
        <div className="mt-5 d-flex justify-content-end">
          <Button variant="danger" onClick={deleteAccount}>
            &#128128;Delete Account&#128128;
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default MyAccount;
