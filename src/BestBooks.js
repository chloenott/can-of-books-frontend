import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
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
    if (this.props.auth0.isAuthenticated) {
      try { 
        const res = await this.props.auth0.getIdTokenClaims();
        
        const jwt = res.__raw;
        
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'delete',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book/${bookObj._id}`,
          data: bookObj
        }
        const response = await axios(config);
        if (response.status === 204) {
          this.getBooks();
        } else {
          alert(response.status);
        }
      }
      catch (error) {
        alert(error.toString());
      }
    }
  }
  

  postBooks = async (bookObj) => {
    if (this.props.auth0.isAuthenticated) {
      try { 
        const res = await this.props.auth0.getIdTokenClaims();
        
        const jwt = res.__raw;
        
        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'post',
          baseURL: process.env.REACT_APP_SERVER_URL,
          url: `/book`,
          data: bookObj
        }
        const response = await axios(config);
        if (response.status === 201) {
          this.getBooks();
        } else {
          alert(response.status);
        }
      }
      catch (error) {
        alert(error.toString());
      }
    }
  }
  
  putBooks = async (bookObj) => {
    if (this.props.auth0.isAuthenticated) {
      try { 
          const res = await this.props.auth0.getIdTokenClaims();

          const jwt = res.__raw;

          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'put',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: `/book/${bookObj.id}`,
            data: bookObj
          }
          const response = await axios(config);
          if (response.status === 200) {
            this.getBooks();
          } else {
            alert(response.status);
          }
      }
      catch (error) {
        alert(error.toString());
      }
  }
  }

  getBooks = async () => {
    // let apiURL = `${process.env.REACT_APP_SERVER_URL}/book`;
    if (this.props.auth0.isAuthenticated) {
      try { 
          const res = await this.props.auth0.getIdTokenClaims();

          const jwt = res.__raw;

          const config = {
            headers: { "Authorization": `Bearer ${jwt}` },
            method: 'get',
            baseURL: process.env.REACT_APP_SERVER_URL,
            url: `/book`
          }
          const response = await axios(config);
          if (response.status === 200) {
            this.setState({ books: response.data });
          } else {
            alert(response.status);
          }
      }
      catch (error) {
        alert(error.toString());
      }
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
    console.log('this.state.books');
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
            {this.state.books.filter(book => book.email === this.props.auth0.user.email).map( (book) => (
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

export default withAuth0(BestBooks);
