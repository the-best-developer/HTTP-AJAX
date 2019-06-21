import React from 'react';
import PropTypes from 'prop-types';

const FriendForm = props => {
    return (
        <div className="friendForm">
            <h1>Add a friend!</h1>
            <br></br>
            <form onSubmit={props.submitFriendHandler} >
                Name: <input type="text" onChange={(e) => props.textChangeHandler(e,"newFriend")} value={props.newFriend} />
                Age: <input type="text" onChange={(e) => props.textChangeHandler(e,"newFriendAge")} value={props.newFriendAge} />
                Email: <input type="text" onChange={(e) => props.textChangeHandler(e,"newFriendEmail")} value={props.newFriendEmail} />
                <button type="submit">Submit</button>
                <button onClick={props.editFriendHandler}>Edit</button>
            </form>
            <br></br>
        </div>
    );
};

FriendForm.propTypes = {
    textChangeHandler: PropTypes.func.isRequired,
    submitFriendHandler: PropTypes.func.isRequired,
    newFriend: PropTypes.string.isRequired,
    newFriendAge: PropTypes.string.isRequired,
    newFriendEmail: PropTypes.string.isRequired
};  

export default FriendForm;