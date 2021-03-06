import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

export default class BookFormModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const bookObj = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            email: event.target.email.value
        }
        this.props.closeModal();
        this.props.postBooks(bookObj);
    }

    render() {
        return (
            <>
                <Modal show={this.props.formModal} onHide={() => this.props.closeModal()}>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label name="Title">Title</Form.Label>
                                <Form.Control type="title" placeholder="Title"/>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label name="Description">Description</Form.Label>
                                <Form.Control type="description" placeholder="Description"/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label name="Email">Email</Form.Label>
                                <Form.Control type="email" defaultValue={this.props.user} placeholder={this.props.user}/>
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label name="Status">Status</Form.Label>
                                <Form.Control type="status" placeholder="Status"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Add Book
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}