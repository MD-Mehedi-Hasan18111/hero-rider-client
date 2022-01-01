import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { Col, Row, Table } from "react-bootstrap";
import "./Dashboard.css";

const Dashboard = () => {
  const [allUser, setAllUser] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const size = 11;

  useEffect(() => {
    fetch(`https://hidden-citadel-26432.herokuapp.com/users?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setAllUser(data.users);
        setSearchUsers(data.users);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  const handleSearchUser = (event) => {
    const searchText = event.target.value;
    const getMatchedUsers = allUser.filter((user) =>
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchUsers(getMatchedUsers);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setSearchUsers(allUser);
    }

    if (e.target.value === "18-22") {
      const ageByUser = allUser.filter(
        (user) => user.age >= 18 && user.age <= 22
      );
      setSearchUsers(ageByUser);
    }

    if (e.target.value === "23-25") {
      const ageByUser = allUser.filter(
        (user) => user.age >= 23 && user.age <= 25
      );
      setSearchUsers(ageByUser);
    }

    if (e.target.value === "26-30") {
      const ageByUser = allUser.filter(
        (user) => user.age >= 26 && user.age <= 30
      );
      setSearchUsers(ageByUser);
    }

    if (e.target.value === "31-40") {
      const ageByUser = allUser.filter(
        (user) => user.age >= 31 && user.age <= 40
      );
      setSearchUsers(ageByUser);
    }
  };

  const users = searchUsers.filter((p) => p.role !== "admin");

  return (
    <div className="my-3">
      <Row className="my-3 d-flex align-items-center">
        <Col xs={12} md={6} lg={9} className="mb-3">
          <label
            htmlFor="age"
            style={{ marginRight: "5px", marginBottom: "4px" }}
          >
            Filtered by Age:{" "}
          </label>
          <select
            type="range"
            name="age"
            id="age"
            style={{ padding: "3px" }}
            onChange={handleChange}
          >
            <option value="">All users</option>
            <option value="18-22">18-22</option>
            <option value="23-25">22-25</option>
            <option value="26-30">26-30</option>
            <option value="31-40">30-40</option>
          </select>
        </Col>
        <Col xs={12} md={6} lg={3}>
          <input
            className="form-control"
            onChange={handleSearchUser}
            type="text"
            placeholder="Search user by email"
          />
        </Col>
      </Row>
      <Table striped bordered hover size="sm" responsive="sm">
        <thead className="users-head">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Vehicle</th>
            <th>Licence</th>
            <th>NID</th>
            <th>Package</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody className="users-list">
          {users?.map((data) => (
            <tr>
              <td>
                <p>{data?.name}</p>
              </td>
              <td>
                <p>{data?.age}</p>
              </td>
              <td>
                <p>{data?.email}</p>
              </td>
              <td>
                <p>{data?.phone}</p>
              </td>
              <td>
                <p>{data?.address}</p>
              </td>
              <td>
                <p>{data?.vehicleType}</p>
              </td>
              <td>
                {data?.licenceImage ? (
                  <img
                    style={{ height: "80px" }}
                    src={`data:image/png;base64,${data?.licenceImage}`}
                    alt=""
                  />
                ) : (
                  "N/A"
                )}
              </td>
              <td>
                <img
                  style={{ height: "80px" }}
                  src={`data:image/png;base64,${data?.nidImage}`}
                  alt=""
                />
              </td>
              <td>{data?.payment ? <p>{data.payment?.packageName}</p> : <p>N/A</p>}</td>
              <td>
                <p>{data?.role}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? "selected" : ""}
            key={number}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
