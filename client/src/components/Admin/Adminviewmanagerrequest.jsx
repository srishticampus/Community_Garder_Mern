import React, { useEffect, useState } from 'react';
import axios from '../../BaseAPI/axiosInstance'; // adjust this path
import { Button, Table, Badge, Spinner } from 'react-bootstrap';
import AdminNav from './AdminNav';

function Adminviewmanagerrequest({url}) {
  const [managers, setmanagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchmanagers = async () => {
    try {
      const res = await axios.get('/manager/viewall');
      const activeManagers = res.data.filter((manager) => manager.activestatus == false);
      setmanagers(activeManagers);
    } catch (error) {
      console.error('Failed to fetch managers:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleActivation = async (id, currentStatus) => {
    try {
      setUpdatingId(id);
      const route = currentStatus
        ? `/manager/deactivate/${id}`
        : `/manager/activate/${id}`;
      await axios.put(route);
      fetchmanagers();
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchmanagers();
  }, []);

  return (
    <div className="p-4">
    <AdminNav/>
      <h3 className="text-success mb-4">Manage manager Requests</h3>

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
              <th>Year of experience</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {managers.map((org, index) => (
              <tr key={org._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`${url}/${org.profilePic?.filename}`}
                    alt="Org"
                    width="60"
                    height="60"
                    className="rounded"
                  />
                </td>
                <td>{org.fullName}</td>
                <td>{org.emailId}</td>
                <td>{org.yearofexperience}</td>
                <td>{org.mobileNo}</td>
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

export default Adminviewmanagerrequest;
