import { Component } from "react";

class Profile extends Component {

  render() {
    /* Done: render information about logged in user */
    /* STRETCH TODO: if no logged in user then redirect home */
    return <p>User: {this.props.user}</p>
  }
};

export default Profile;
