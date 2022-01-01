import axios from "axios";
import React from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../hooks/useAuth";
import Navigation from "../../Shared/Navigation/Navigation";
import "./RegisterLearner.css";

const RegisterLearner = () => {
  const { Register, user, userProfileInfo, isLoading, authError } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    data.role = "learner";
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("age", data.age);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("nidPic", data.nidPic[0]);
    formData.append("profilePic", data.profilePic[0]);
    formData.append("vehicleType", data.vehicleType);
    formData.append("role", data.role);

    if (data.password1 === data.password2) {
      Register(data.name, data.email, data.password1, navigate, location);
      axios.post("https://hidden-citadel-26432.herokuapp.com/addLearner", formData).then((res) => {
        if (res.data.insertedId) {
          swal("Registration Successfully!", "", "success");
          e.target.reset();
        }
      });
    } else {
      swal("Password didn't match", "", "warning");
    }
  };

  return (
    <div>
      <Navigation />
      <Container className="my-3">
        {userProfileInfo?.role === 'learner' ? (
          <div className="text-center">
            <h3>You are already Registered as a { userProfileInfo?.role}! Thanks.</h3>
          </div>
        ) : (
          <>
            <h2 className="fw-bold text-center">
              Register{" "}
              <span style={{ color: "#c0392b", fontStyle: "italic" }}>
                Driveing Learner
              </span>
              </h2>
              {authError && <Alert variant="danger">{authError}</Alert>}
            <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col lg={6} md={6} xs={12}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Full Name"
                    {...register("name")}
                    required
                  />
                  <br />
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    required
                  />
                  <br />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Age"
                    {...register("age")}
                    required
                  />
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    {...register("address")}
                    required
                  />
                  <br />
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Phone"
                    {...register("phone")}
                    required
                  />
                  <br />
                  <input
                    id="nid"
                    className="form-control imageType"
                    name="nidPic"
                    accept="image/*"
                    type="file"
                    {...register("nidPic")}
                    required
                  />
                  <label htmlFor="nid" className="image-label">
                    Select NID photo <i className="fas fa-camera"></i>
                  </label>
                  <br />
                </Col>
                <Col lg={6} md={6} xs={12}>
                  <input
                    id="profile"
                    className="form-control imageType"
                    name="profilePic"
                    accept="image/*"
                    {...register("profilePic")}
                    type="file"
                  />
                  <label htmlFor="profile" className="image-label">
                    Select profile photo <i className="fas fa-camera"></i>
                  </label>
                  <br />
                  <select
                    {...register("vehicleType")}
                    name="vehicleType"
                    className="w-100"
                    style={{
                      border: "1px solid #bdc3c7",
                      padding: "7px",
                      borderRadius: "5px",
                    }}
                  >
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Cycle">Cycle</option>
                  </select>
                  <br />
                  <br />
                  <input
                    {...register("password1")}
                    className="form-control"
                    type="password"
                    name="password1"
                    placeholder="Password"
                    required
                  />
                  <br />
                  <input
                    {...register("password2")}
                    className="form-control"
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    required
                  />
                  <br />
                  <div className="text-center">
                    {isLoading ? <Spinner animation="border" /> : <button type="submit" className="registerBtn">
                      Register
                    </button>}
                  </div>
                </Col>
              </Row>
            </form>
          </>
        )}
      </Container>
    </div>
  );
};

export default RegisterLearner;
