import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ 
  show, 
  handleClose, 
  handleConfirm, 
  title = 'Confirm Action', 
  message = 'Are you sure you want to proceed?',
  confirmButtonText = 'Confirm',
  confirmButtonVariant = 'danger'
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant={confirmButtonVariant} onClick={handleConfirm}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal; 