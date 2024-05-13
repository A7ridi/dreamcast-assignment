import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";

const UserModal = ({
  formData,
  showEditModal,
  setShowEditModal,
  handleInputChange,
  handleEditUser,
  text,
  setFormData,
  error,
  setError,
}) => {
  const closeModal = () => {
    setShowEditModal(false);
    setFormData({});
    setError("");
  };
  return (
    <Modal show={showEditModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormControl
              required
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormControl
              required
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Phone</FormLabel>
            <FormControl
              required
              type="text"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>City</FormLabel>
            <FormControl
              required
              type="text"
              name="city"
              value={formData?.city || formData?.address?.city || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Zip code</FormLabel>
            <FormControl
              required
              type="text"
              name="zipcode"
              value={formData?.zipcode || formData?.address?.zipcode || ""}
              onChange={handleInputChange}
            />
          </FormGroup>
        </Form>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="btn btn-outline-danger" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
