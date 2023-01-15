import "./Account.css";

import { useNavigate, Routes, Route, Link } from "react-router-dom";

import MyAccount from "./MyAccount/MyAccount";
import MyPosts from "./MyPosts/MyPosts";
import MyComments from "./MyComments/MyComments";

function Account() {
  const navigate = useNavigate();
  if (!document.cookie.substring(12)) navigate("/");
  return (
    <div className="accountDiv">
      <div className="accountNav d-flex justify-content-around">
        <Link to="/user/account/posts/0" variant="light">
          My Posts
        </Link>
        <Link to="/user/account/comments/0" variant="light">
          My Comments
        </Link>
        <Link to="/user/account" variant="light">
          My Account
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<MyAccount />} />
        <Route
          path="/posts/:pageNumber"
          element={<MyPosts writer={document.cookie.substring(12)} />}
        />
        <Route
          path="/comments/:pageNumber"
          element={<MyComments writer={document.cookie.substring(12)} />}
        />
      </Routes>
    </div>
  );
}

export default Account;
