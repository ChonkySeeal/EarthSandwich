import "./NavBar.css";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import axios from "axios";

function NavBar({ login, setLogin }) {
  const navigate = useNavigate();
  //logout logic
  const handleLogout = (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    axios
      .get("http://localhost:8080/member/logout")
      .then((r) => {
        alert("logout success");
        setLogin(false);
        navigate("/");
      })
      .catch((r) => {
        alert("Unauthorized user attempt");
      });
  };

  let conditionalNav;

  conditionalNav =
    login || document.cookie.substring(12) ? (
      <Nav>
        <Nav.Link className="btn btn-primary navbarbtn" href="/member/post">
          Make EarthSandwich
        </Nav.Link>
        <NavDropdown
          title={`Hello u/${document.cookie.substring(12)}`}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="/user/account">Account</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    ) : (
      <Nav>
        <Nav.Link href="/user/register">Sign up</Nav.Link>
        <Nav.Link href="/user/login">Sign in</Nav.Link>
      </Nav>
    );

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container fluid className="px-5">
        <Navbar.Brand className="navbarBrand" href="/">
          EarthSandwich
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="justify-content-end">
          <Nav className="me-auto navbarLinks">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          {conditionalNav}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
