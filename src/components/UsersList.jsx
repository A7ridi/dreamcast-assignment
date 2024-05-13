import React from "react";
import { Button, Table } from "react-bootstrap";

const UsersList = ({
  users,
  setShowEditModal,
  setFormData,
  setEditUserId,
  handleDeleteUser,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>City, Zip Code</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <tr key={user.id}>
            <td>{user?.id ?? "N/A"}</td>
            <td>{user?.name ?? "N/A"}</td>
            <td>{user?.email ?? "N/A"}</td>
            <td>{user?.phone ?? "N/A"}</td>
            <td>{`${user?.city ?? user?.address?.city ?? "N/A"}, ${
              user?.zipcode ?? user?.address?.zipcode ?? "N/A"
            }`}</td>
            <td>
              <Button
                variant="btn btn-outline-primary me-2"
                onClick={() => {
                  setShowEditModal(true);
                  setFormData(user);
                  setEditUserId(user.id);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDeleteUser(user.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UsersList;
