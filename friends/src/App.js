import React from 'react';
import axios from 'axios';
import FriendsList from './components/FriendsList';
import FriendForm from './components/FriendForm'
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      friendsList: [],
      newFriend: "",
      newFriendAge: "",
      newFriendEmail: ""
    };

    this.textChangeHandler = this.textChangeHandler.bind(this);
    this.submitFriendHandler = this.submitFriendHandler.bind(this);
    this.updateFriendsState = this.updateFriendsState.bind(this);
    this.editFriendHandler = this.editFriendHandler.bind(this);
    this.deleteFriendHandler = this.deleteFriendHandler.bind(this);
  };

  // Update this.state.friendsList with friends list pulled from our server
  updateFriendsState() {
    axios
    .get('http://localhost:5000/friends')
    .then(res => {
      this.setState(() => ({friendsList: res.data}));
    })
    .catch(error => {
      console.error("err: " + error);
    });
  }

  // Once mounted, pull friends list
  componentDidMount() {
    this.updateFriendsState();
  };

  // Handle updating our state with the corresponding key. (name, age, email)
  textChangeHandler (event, target) {
    this.setState({[target]: event.target.value});
  }

  // Our POST handler to add our new friend to the friends list
  submitFriendHandler (event) {

    event.preventDefault();

    axios
    .post(' http://localhost:5000/friends', (
      {
        name: this.state.newFriend,
        age: (parseInt(this.state.newFriendAge, 10) ? parseInt(this.state.newFriendAge, 10) : 0), //Hack to validate int type
        email: this.state.newFriendEmail,
      }
    ))
    .then(_ => {
      // Update our friends list state again to show our results
      this.updateFriendsState();
    })
    .catch(err => {
      console.log(err);
    });
  };

  editFriendHandler (event) {
    
    let thisFriend = null;
    event.preventDefault();

    //TODO: This should probably check for dupes
    this.state.friendsList.forEach(f => {
      //Find the matching friend in the friends list using the email state
      if(f.email === this.state.newFriendEmail) {
        thisFriend = f;
      }
    })

    // If none are found, stop here
    if(!(thisFriend)) {
      return;
    }
  
    // Select our friend using the id in our thisFriend variable, update using the newFriendAge and newFriend state variables
    axios
    .put(`http://localhost:5000/friends/${thisFriend.id}`, (
      {
        name: this.state.newFriend,
        age: (parseInt(this.state.newFriendAge, 10) ? parseInt(this.state.newFriendAge, 10) : 0), //Hack to int type for POST
      }
    ))
    .then(res=> {
      this.updateFriendsState();
    })
    .catch(err => {
      console.log(err);
    });
  };

  // Delete selected ID
  deleteFriendHandler(id) {
    axios     
    .delete(`http://localhost:5000/friends/${id}`)
    .then(res => {
      this.updateFriendsState();
    })
    .catch(err => {
      console.log(err)
    });
  }

  render() {
    return (
      <div className="App">
        {/* Friends list */}
        <FriendsList
         friendsList={this.state.friendsList}
         deleteFriendHandler={this.deleteFriendHandler}
        />
        {/* Add/Edit friend form */}
        <FriendForm 
          newFriend={this.state.newFriend}
          newFriendAge={this.state.newFriendAge}
          newFriendEmail={this.state.newFriendEmail}
          textChangeHandler={this.textChangeHandler}
          submitFriendHandler={this.submitFriendHandler}
          editFriendHandler={this.editFriendHandler}
        />
      </div>
    );
  };
};

export default App;