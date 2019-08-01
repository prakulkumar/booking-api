import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modal = (props) => {
    return (
        <Modal show={props.showModal} onHide={props.onClose} centered size='lg'>
            <Modal.Header closeButton className={"modalTitle"}>{props.modalTitle}</Modal.Header>
            <Modal.Body className="modal__body">
                {props.children}
            </Modal.Body>
        </Modal>
    )
};

export default modal;