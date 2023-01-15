import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./Component/RegisterForm/RegisterForm";
import LoginForm from "./Component/LoginForm/LoginForm";
import NavBar from "./Component/NavBar/NavBar";
import PostForm from "./Component/PostForm/PostForm";
import PostList from "./Component/PostList/PostList";
import SinglePost from "./Component/SinglePost/SinglePost";
import EditPost from "./Component/EditPost/EditPost";
import SearchList from "./Component/SearchList/SearchList";
import Account from "./Component/Account/Account";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <Router>
      <div className="App">
        <NavBar login={login} setLogin={setLogin} />

        <div className="main">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/:pageNumber" element={<PostList />} />
            <Route path="/user/register" element={<RegisterForm />} />
            <Route path="/user/account/*" element={<Account />} />
            <Route
              path="/user/login"
              element={<LoginForm setLogin={setLogin} />}
            />
            <Route path="/user/:writer/:pageNumber" element={<SearchList />} />
            <Route path="/member/post" element={<PostForm />} />
            <Route path="/member/post/:postId" element={<PostForm />} />
            <Route path="/board/post/:postId" element={<SinglePost />} />
            <Route path="/board/edit/:postId" element={<EditPost />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
