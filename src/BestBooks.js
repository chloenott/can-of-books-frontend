import React from 'react';
import axios from 'axios';
import { Button, Carousel, Container } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import UpdateFormModal from './UpdateFormModal';
import DeleteButton from './DeleteButton';
import UpdateButton from './UpdateButton';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formModal: false,
      updateModal: false,
      book: null
    }
  }

  deleteBook = async (bookObj) => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book/${bookObj._id}?email=${bookObj.email}`;
    try {
        const response = await axios.delete(apiURL);
        if (response.status === 204) {
          this.getBooks()
        } else {
          alert(response.status);
        }
    } catch (error) {
        alert(error.toString());
    }
  }

  postBooks = async (bookObj) => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book`;
    try {
        const response = await axios.post(apiURL, bookObj);
        if (response.status === 201) {
          //this.setState({ books: [...this.state.books, response.data] });
          this.getBooks()
        } else {
          alert(response.status);
        }
    } catch (error) {
        alert(error.toString());
    }
  }

  putBooks = async (bookObj) => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book/${bookObj.id}`;
    try {
        const response = await axios.put(apiURL, bookObj);
        if (response.status === 200) {
          this.getBooks();
        } else {
          alert(response.status);
        }
    } catch (error) {
        alert(error.toString());
    }
  }

  getBooks = async () => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book`;
    if (this.props.user) {
      apiURL += `?email=${this.props.user}`
    }
    try {
      const response = await axios.get(apiURL);
      if (response.status === 200) {
        this.setState({ books: response.data });
      } else {
        alert(response.status);
      }
    } catch (error) {
      alert(error.toString());
    }
  }

  showModal = () => {
    this.setState({ formModal: true })
  }

  closeModal = () => {
    this.setState({ formModal: false })
  }

  showUpdateModal = (book) => {
    this.setState({ updateModal: true, book: book })
  }

  closeUpdateModal = () => {
    this.setState({ updateModal: false })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    return (
      <Container style={{width: '960px', margin: 'auto'}}>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.showModal()}>
          Add Book
        </Button>

        <BookFormModal user={this.props.user} postBooks={this.postBooks} formModal={this.state.formModal} closeModal={this.closeModal}/>
        <UpdateFormModal putBooks={this.putBooks} book={this.state.book} updateModal={this.state.updateModal} closeUpdateModal={this.closeUpdateModal}/>

        {this.state.books.length ? (
          <Carousel>
            {this.state.books.filter(book => book.email === this.props.user ).map( (book, idx) => (
              <Carousel.Item key={book._id}>
                <img className="w-100" src="/books.jpg" alt="background"/>
                <Carousel.Caption>
                  <h5>{book.title}</h5>
                  <p>{book.description}</p>
                  <DeleteButton book={book} deleteBook={this.deleteBook} />
                  <UpdateButton book={book} showUpdateModal={this.showUpdateModal}/>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

        ) : (
          <h3>No Books Found :(</h3>
        )}
      </Container>
    )
  }
}

export default BestBooks;
