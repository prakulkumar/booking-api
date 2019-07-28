import React from 'react';
import { Modal } from 'react-bootstrap';

const modal = (props) => {
    console.log(props);
    return (
        <Modal show={props.showModal} onHide={props.onClose} centered>
            <Modal.Header>Modal Title</Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    )
};

export default modal;