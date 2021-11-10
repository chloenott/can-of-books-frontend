import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

export default class UpdateFormModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const bookObj = {
            id: this.props.book._id,
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            email: event.target.email.value
        }
        this.props.closeUpdateModal();
        this.props.putBooks(bookObj);
    }

    render() {
        return (
            <>
                <Modal show={this.props.updateModal} onHide={() => this.props.closeUpdateModal()}>
                    <Modal.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="title">
                                <Form.Label name="Title">Title</Form.Label>
                                <Form.Control type="title" defaultValue={this.props.book.title} placeholder={this.props.book.title}/>
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label name="Description">Description</Form.Label>
                                <Form.Control type="description" defaultValue={this.props.book.description} placeholder={this.props.book.description}/>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label name="Email">Email</Form.Label>
                                <Form.Control type="email" defaultValue={this.props.book.email} placeholder={this.props.book.email}/>
                            </Form.Group>
                            <Form.Group controlId="status">
                                <Form.Label name="Status">Status</Form.Label>
                                <Form.Control type="status" defaultValue={this.props.book.status} placeholder={this.props.book.status}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Update Book
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}