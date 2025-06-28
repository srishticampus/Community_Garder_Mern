import React, { useEffect, useState } from 'react';
import axios from '../../BaseAPI/axiosInstance'; // adjust this path
import { Button, Table, Badge, Spinner } from 'react-bootstrap';
import AdminNav from './AdminNav';

function Adminvieworgrequest({url}) {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get('/organization/viewall');
      const activeManagers = res.data.data.filter((manager) => manager.activestatus === false);
      setOrganizations(activeManagers);
    } catch (error) {
      console.error('Failed to fetch organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivation = async (id, currentStatus) => {
    try {
      setUpdatingId(id);
      const route = currentStatus
        ? `/organization/deactivate/${id}`
        : `/organization/activate/${id}`;
      await axios.put(route);
      fetchOrganizations();
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="p-4">
    <AdminNav/>
      <h3 className="text-success mb-4">Manage Organization Requests</h3>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Type</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org, index) => (
              <tr key={org._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${url}/${org?.photo?.filename}`}
                    alt="Org"
                    width="60"
                    height="60"
                    className="rounded"
                  />
                </td>
                <td>{org.organizationName}</td>
                <td>{org.emailId}</td>
                <td>{org.organizationtype}</td>
                <td>{org.phoneNo}</td>
                <td>
                  <Badge bg={org.activestatus ? 'success' : 'secondary'}>
                    {org.activestatus ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant={org.activestatus ? 'outline-danger' : 'outline-success'}
                    size="sm"
                    onClick={() => toggleActivation(org._id, org.activestatus)}
                    disabled={updatingId === org._id}
                  >
                    {updatingId === org._id ? (
                      <Spinner size="sm" animation="border" />
                    ) : org.activestatus ? (
                      'Deactivate'
                    ) : (
                      'Activate'
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Adminvieworgrequest;
