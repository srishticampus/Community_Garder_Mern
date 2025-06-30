import React, { useEffect, useState } from "react";
import axios from "../../BaseAPI/axiosInstance";
import AdminNav from "./AdminNav";
import { Link } from "react-router-dom";

function AdminViewOrganization({ url }) {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get("/organization/viewall");
      const activeManagers = response.data.data.filter((manager) => manager.activestatus === true);
      setOrganizations(activeManagers);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="container mt-4">
        <h2 className="mb-4">All Organizations</h2>
        <Link to="/admin/view/orgrequest" className="btn btn-success mb-5">
          View Request
        </Link>

        {organizations.length === 0 ? (
          <p>No organizations found.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Organization Name</th>
                <th>Type</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Photo</th>
              </tr>
            </thead>
            <tbody>
              {organizations.map((org, index) => (
                <tr key={org._id}>
                  <td>{index + 1}</td>
                  <td>{org.organizationName}</td>
                  <td>{org.organizationtype}</td>
                  <td>{org.emailId}</td>
                  <td>{org.phoneNo}</td>
                  <td>{org.address}</td>
                  <td>
                    <img
                      src={`${url}/${org.photo.filename}`}
                      alt="Org"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AdminViewOrganization;
