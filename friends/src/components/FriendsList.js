import React from 'react';
import PropTypes from 'prop-types';

const FriendsList = props => {

  return (
    <div className="friendsList">
      <h1>Awesome friends list:</h1>
      {props.friendsList.map(friend => {
        return (
          <div key={friend.id}>
            <br></br>
            <span>Name: <b>{friend.name} </b></span>
            <br></br>
            <span>Age: <b>{friend.age} </b></span>
            <br></br>
            <span>Email: <b>{friend.email} </b></span>
            <br></br>
            <button onClick={_ => props.deleteFriendHandler(friend.id)}>Delete me :(</button>
          </div>
        );
      })}
    </div>
  );
};

FriendsList.propTypes = {
  friendsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteFriendHandler: PropTypes.func.isRequired
};

export default FriendsList;