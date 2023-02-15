import "./MyAccount.css";
import { Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${process.env.REACT_APP_API_URL}:8080/member/account`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, []);

  //show passwordForm logic
  const resetPassword = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios
      .put(`${process.env.REACT_APP_API_URL}:8080/member/account`)
      .then(() => {
        alert("The password reset link has sent Pleas Check your Email!");
        navigate("/");
      })
      .catch((r) => {
        alert(r.response.data.message);
      });
  };

  //account delete logic
  const deleteAccount = () => {
    if (
      window.confirm("your account will be permanently deleted are you sure?")
    ) {
      axios.defaults.withCredentials = true;
      axios
        .delete(`${process.env.REACT_APP_API_URL}:8080/member/account`)
        .then(() => {
          alert("your account is permanently deleted");
          navigate("/");
        })
        .catch((r) => {
          if (r.response.request.status === 401) {
            alert("Unauthorized user attempt");
            navigate("/");
          } else {
            alert(r.response.data.message);
          }
        });
    }
  };

  return (
    <div className="myAccountInfoDiv">
      <Form id="submitForm">
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
          onClick={resetPassword}
        >
          Change Password
        </Button>

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
