import React from "react";
import { useSelector } from "react-redux";
import { Nav, NavDropdown, Navbar, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLogoutUserMutation } from "../services/appApi";
import logo from "../images/logo.webp"
function Navigation() {
  const { user } = useSelector((state) => state.user);
  const [logoutUser, {isLoading}] = useLogoutUserMutation();
  function handleLogout(){
    logoutUser().then(({error})=>{
      if(!error){
        console.log("Log Out ");
      }
    })
  }
  return (

    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand><img src = {logo} style ={{width :50}}/></Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link className="btn btn-primary text-white">Login</Nav.Link>
            </LinkContainer>

            {user && (
              <NavDropdown title={user.email} id="basic-nav-dropdown">
                <LinkContainer to ="/new-article">
                  <NavDropdown.Item >
                    New Article
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to ="articles/me">
                  <NavDropdown.Item >
                    My Articles
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                  </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
