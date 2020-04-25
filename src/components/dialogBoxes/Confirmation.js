import Modal from 'react-bootstrap/Modal';
import React from 'react';

function Confirmation(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h4></h4> */}
        <p>{props.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          class="btn btn-lg green-button form-rounded object-hover"
          onClick={props.onHide}
        >
          Close
        </button>
        <button
          type="button"
          class="btn btn-lg red-button form-rounded object-hover"
          onClick={props.onDelete}
        >
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default Confirmation;
