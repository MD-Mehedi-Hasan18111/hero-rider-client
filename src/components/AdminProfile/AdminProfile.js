import React from "react";
import { Container, Tab, Table, Tabs } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

const AdminProfile = () => {
  const { user, userProfileInfo } = useAuth();

  return (
    <div>
      <Container>
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
    </div>
  );
};

export default AdminProfile;
