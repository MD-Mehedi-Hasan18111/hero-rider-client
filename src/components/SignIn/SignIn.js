import React, {useState} from "react";
import './SignIn.css';
import { Alert, Container, Spinner } from "react-bootstrap";
import Navigation from "../../Shared/Navigation/Navigation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SignIn = () => {

  const [userInfo, setUserInfo] = useState({});
  const { signInUser, isLoading, authError } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newUser = { ...userInfo };
    newUser[field] = value;
    setUserInfo(newUser);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser(userInfo.email, userInfo.password, navigate, location);
  };

  return (
    <div>
      <Navigation />
      <Container className="mt-5">
        <h2 className="fw-bold text-center">
          Sign In{" "}
          <span style={{ color: "#c0392b", fontStyle: "italic" }}>User</span>
        </h2>
        <div className="form-area">
        {authError && <Alert variant="danger">{authError}</Alert>}
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="email"
              onBlur={handleBlur}
              name="email"
              placeholder="Email"
              required
            />
            <br />
            <input
              className="form-control"
              type="password"
              onBlur={handleBlur}
              name="password"
              placeholder="Password"
              required
            />
            <br />
            <div className="text-center">
              {isLoading ? <Spinner animation="border" /> : <button type="submit" className="registerBtn">
                Sign In
              </button>}
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignIn;
