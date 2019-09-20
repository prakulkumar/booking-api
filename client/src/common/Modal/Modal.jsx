import React from "react";
import { Modal } from "react-bootstrap";

const CustomModal = props => {
  const { openModal, onCloseModal, size } = props;
  return (
    <Modal show={openModal} onHide={onCloseModal} centered size={size}>
      <Modal.Header closeButton className="modal-header">
        HelloWorld
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default CustomModal;
