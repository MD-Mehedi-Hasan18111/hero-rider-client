import React, { useEffect, useState } from "react";
import { Container, Tab, Table, Tabs } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import Navigation from "../../Shared/Navigation/Navigation";
import AdminProfile from "../AdminProfile/AdminProfile";
import Dashboard from "../Dashboard/Dashboard";
import "./UserProfile.css";

const UserProfile = () => {
  const { user, userProfileInfo } = useAuth();

  return (
    <div>
      <Navigation />
      <div>
        {userProfileInfo?.role === "rider" && (
          <Container>
            <div className="profile-header">
              <img
                src={`data:image/png;base64,${userProfileInfo.profileImage}`}
                alt=""
              />
              <h4>{userProfileInfo.name}</h4>
              <p>
                <strong>Role: </strong>
                {userProfileInfo.role}
              </p>
            </div>
            <hr />
            <div className="user-details">
              <Table size="sm">
                <tr>
                  <td>
                    <h6>Name</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.name}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Email</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.email}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Age</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.age}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Address</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.address}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Phone</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.phone}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Ride Location</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.area}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Vehicle Type</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.vehicleType}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Vehicle Modal</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.vehicleModal}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Driving Licence</h6>
                  </td>
                  <td>
                    <img
                      style={{ height: "150px" }}
                      src={`data:image/png;base64,${userProfileInfo.licenceImage}`}
                      alt=""
                    />
                  </td>
                </tr>
              </Table>
            </div>
          </Container>
        )}

        {userProfileInfo?.role === "learner" && (
          <Container>
            <div className="profile-header">
              <img
                src={`data:image/png;base64,${userProfileInfo.profileImage}`}
                alt=""
              />
              <h4>{userProfileInfo.name}</h4>
              <p>
                <strong>Role: </strong>
                {userProfileInfo.role}
              </p>
            </div>
            <hr />
            <div className="user-details">
              <Table size="sm">
                <tr>
                  <td>
                    <h6>Name</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.name}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Email</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.email}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Age</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.age}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Address</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.address}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Phone</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.phone}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h6>Vehicle Type</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.vehicleType}</p>
                  </td>
                </tr>
                {userProfileInfo?.payment && <tr>
                  <td>
                    <h6>Package</h6>
                  </td>
                  <td>
                    <p>{userProfileInfo.payment?.packageName}</p>
                  </td>
                </tr>}
                <tr>
                  <td>
                    <h6>NID Card</h6>
                  </td>
                  <td>
                    <img
                      style={{ height: "150px" }}
                      src={`data:image/png;base64,${userProfileInfo.nidImage}`}
                      alt=""
                    />
                  </td>
                </tr>
              </Table>
            </div>
          </Container>
        )}
        {userProfileInfo?.role === "admin" && (
          <Container>
            <div className="profile-header">
              <img
                src={`data:image/png;base64,${userProfileInfo.profileImage}`}
                alt=""
              />
              <h4>{userProfileInfo.name}</h4>
              <p>
                <strong>Role: </strong>
                {userProfileInfo.role}
              </p>
            </div>
            <Tabs>
              <Tab eventKey="profile" title="Profile">
                <AdminProfile />
              </Tab>
              <Tab eventKey="dashboard" title="Dashboard">
                <Dashboard />
              </Tab>
            </Tabs>
          </Container>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
