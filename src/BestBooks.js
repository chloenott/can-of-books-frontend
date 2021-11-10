import React from 'react';
import axios from 'axios';
import { Button, Carousel } from 'react-bootstrap';
import BookFormModal from './BookFormModal';
import DeleteButton from './DeleteButton';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      formModal: false
    }
  }

  deleteBook = async (bookObj) => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book/${bookObj._id}?email=${bookObj.email}`;
    console.log(apiURL);
    try {
        const response = await axios.delete(apiURL);
        console.log(response.status);
        if (response.status === 204) {
          this.getBooks()
        } else {
          console.log(response)
        }
    } catch (error) {
        console.log(error);
    }
  }

  postBooks = async (bookObj) => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book`;
    console.log(apiURL);
    try {
        const response = await axios.post(apiURL, bookObj);
        this.setState({ books: [...this.state.books, response.data] });
    } catch (error) {
        console.log(error);
    }
  }

  /* Done: Make a GET request to your API to fetch books for the logged in user  */
  getBooks = async () => {
    let apiURL = `${process.env.REACT_APP_SERVER_URL}/book`;
    console.log(apiURL);
    if (this.props.user) {
      apiURL += `?email=${this.props.user}`
    }
    try {
      const response = await axios.get(apiURL);
      this.setState({ books: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  showModal = () => {
    this.setState({ formModal: true })
  }

  closeModal = () => {
    this.setState({ formModal: false })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    /* Done: render user's books in a Carousel */
    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        <Button onClick={() => this.showModal()}>
          Add Book
        </Button>

        <BookFormModal postBooks={this.postBooks} formModal={this.state.formModal} closeModal={this.closeModal}/>

        {this.state.books.length ? (
          <Carousel variant="dark">
            {this.state.books.filter(book => book.email === this.props.user ).map( (book, idx) => (
              <Carousel.Item key={book._id}>
                <img className="d-block w-100" src="https://via.placeholder.com/3x1/999999/999999" alt="background"/>
                <Carousel.Caption>
                  <h5>{book.title}</h5>
                  <p>{book.description}</p>
                  <DeleteButton book={book} deleteBook={this.deleteBook} />
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
