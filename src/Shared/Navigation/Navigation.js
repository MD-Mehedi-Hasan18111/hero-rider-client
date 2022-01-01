import React from "react";
import "./Navigation.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import TopHeader from "../TopHeader/TopHeader";
import "./Navigation.css";
import useAuth from '../../hooks/useAuth';

const Navigation = () => {
  const { user, logOut, userProfileInfo } = useAuth();

  return (
    <div>
      <TopHeader />
      <Navbar className="navigation" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link
              to="/home"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
                fontSize: "22px",
              }}
            >
              Hero{" "}
              <span style={{ color: "#C0392B", fontStyle: "italic" }}>
                Rider
              </span>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavLink
                to="/home"
                style={{
                  textDecoration: "none",
                  marginRight: "15px",
                  color: "#000",
                  fontSize: "18px",
                }}
              >
                Home
              </NavLink>

              {user?.email ? <NavLink
                to="/userProfile"
                style={{
                  textDecoration: "none",
                  marginRight: "15px",
                  color: "#000",
                  fontSize: "18px",
                }}
              >
                Profile
              </NavLink> : ""}

              {user?.email && userProfileInfo?.role === 'learner' ? <NavLink
                to="/packages"
                style={{
                  textDecoration: "none",
                  marginRight: "15px",
                  color: "#000",
                  fontSize: "18px",
                }}
              >
                Packages
              </NavLink> : ""}

              {user?.email ? (
                <button onClick={logOut} className="signInBtn me-3">
                  Sign Out
                </button>
              ) : (
                <Link to="/signin">
                  <button className="signInBtn">Sign In</button>
                </Link>
              )}
              {user?.email && <small className="mt-1 fw-bold">{user?.displayName}</small>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
