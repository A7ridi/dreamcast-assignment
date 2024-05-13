import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, editUser, fetchUsers } from "../redux/userSlice";
import UserModal from "./UserModal";

const UserTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editUserId, setEditUserId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFormData = (formData) => {
    if (!formData.name || !formData.email) {
      return "Please provide both name and email";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return "Please provide a valid email address";
    }

    return "";
  };

  const handleAddUser = () => {
    const validationMessage = validateFormData(formData);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    dispatch(addUser({ ...formData, id: users?.length + 1 }));
    setShowAddModal(false);
    setFormData({});
    setError("");
  };

  const handleEditUser = () => {
    const validationMessage = validateFormData(formData);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    dispatch(editUser({ ...formData, id: editUserId }));
    setShowEditModal(false);
    setFormData({});
    setEditUserId(null);
    setError("");
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <>
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
                </Button>{" "}
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

      <UserModal
        formData={formData}
        showEditModal={showAddModal}
        setShowEditModal={setShowAddModal}
        handleInputChange={handleInputChange}
        handleEditUser={handleAddUser}
        text="Add user"
        setFormData={setFormData}
        error={error}
        setError={setError}
      />

      <UserModal
        formData={formData}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        handleInputChange={handleInputChange}
        handleEditUser={handleEditUser}
        text="Edit user"
        setFormData={setFormData}
        error={error}
        setError={setError}
      />

      <Button variant="success" onClick={() => setShowAddModal(true)}>
        Add User
      </Button>
    </>
  );
};

export default UserTable;
