import React from 'react';
import { Modal } from 'react-bootstrap';
import './Modal.css';

const modal = (props) => {
    console.log(props);
    return (
        <Modal show={props.showModal} onHide={props.onClose} centered>
            <Modal.Header closeButton className={"modalTitle"}>{props.modalTitle}</Modal.Header>
            <Modal.Body className="modal__body">
                {props.children}
            </Modal.Body>
        </Modal>
    )
};

export default modal;