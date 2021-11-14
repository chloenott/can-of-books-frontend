import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './Profile';
import Login from './Login';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              {/* Done: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {this.props.auth0.isAuthenticated ? <BestBooks user={this.state.user}/> : <Login />}
            </Route>
            {/* Done: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">
            {this.props.auth0.isAuthenticated && <Profile user={this.state.user}/>}
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </>
    )
  }
}

export default withAuth0(App);
