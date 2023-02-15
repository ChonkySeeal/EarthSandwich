import "./EmailConfirm.css";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
function EmailConfirm() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}:8080/user/confirm/${searchParams.get(
          "token"
        )}`
      )
      .catch((e) => {
        alert(e.response.data.message);
        navigate("/");
      });
  });

  return (
    <div className="emailConfirmDiv">
      <h3>Your Email is verified</h3>
      <p>Thanks you!</p>
      <Link to={"/user/login"}>Go to LoginPage</Link>
    </div>
  );
}

export default EmailConfirm;
