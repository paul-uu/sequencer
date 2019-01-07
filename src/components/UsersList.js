import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

class UsersList extends Component {

  render() {
    return (
      <div className='users-list'>
        <h3 className='users-list__header'>Users</h3>
        <ul>
        {
          this.props.currentUsers.length > 0 && this.props.currentUsers.map(user => 
            <li className='user' key={user}>{user}</li>
          )
        }
        </ul>
      </div>
    )
  }
};

const mapStateToProps = state => {

  const currentUsers = state.firestore.data.currentUsers 
    ? state.firestore.data.currentUsers.currentUsers.users
    : [];
  return { currentUsers }
}

export default compose(
  firestoreConnect( [{ collection: 'currentUsers' }] ),
  connect(mapStateToProps)
)(UsersList);