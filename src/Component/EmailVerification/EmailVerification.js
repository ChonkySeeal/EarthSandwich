import "./EmailVerification.css";
import { Link } from "react-router-dom";
function EmailVerification() {
  return (
    <div className="emailVerificationDiv">
      <h3>Please Verify Your Email</h3>
      <p>Please check your email inbox</p>
      <Link to={"/user/login"}>Go to LoginPage</Link>
    </div>
  );
}

export default EmailVerification;
