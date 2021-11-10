import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

export default class BookFormModal extends React.Component {
    render() {
        return (
            <>
                <Modal show={this.props.formModal} onHide={() => this.props.closeModal()}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label name="Title"></Form.Label>
                            <Form.Control type="title" placeholder="Title"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label name="Description"></Form.Label>
                            <Form.Control type="description" placeholder="Description"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={() => this.props.closeModal()}>
                            Add Book
                        </Button>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}