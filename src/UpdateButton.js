import React from 'react';
import { Button } from 'react-bootstrap'

export default class UpdateButton extends React.Component {
  render() {
    return (
      <>
        <Button onClick={() => this.props.showUpdateModal()}>Update Book</Button>
      </>
    )
  }
}