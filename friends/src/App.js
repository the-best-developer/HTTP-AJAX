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
    axios
    .post(' http://localhost:5000/friends', (
      {
        name: this.state.newFriend,
        age: (parseInt(this.state.newFriendAge, 10) ? parseInt(this.state.newFriendAge, 10) : 0), //Hack to validate int type
        email: this.state.newFriendEmail,
      }
    ))
    .then(_ => {
      this.updateFriendsState();
    })
    .catch(err => {
      console.log(err);
    });

    event.preventDefault();
  };

  editFriendHandler (event) {
    
    let thisFriend = null;
    event.preventDefault();

    //TODO: This should probably check for dupes
    this.state.friendsList.forEach(f => {
      if(f.email === this.state.newFriendEmail) {
        thisFriend = f;
      }
    })

    if(!(thisFriend)) {
      return;
    }
  
    axios
    .put(`http://localhost:5000/friends/${thisFriend.id}`, (
      {
        name: this.state.newFriend,
        age: (parseInt(this.state.newFriendAge, 10) ? parseInt(this.state.newFriendAge, 10) : 0), //Hack to int type for POST
      }
    ))
    .then(res=> {
      this.updateFriendsState();
      console.log(res)
    })
    .catch(err => {
      console.log(err);
    });
  };

  deleteFriendHandler(id) {
    axios     
    .delete(`http://localhost:5000/friends/${id}`)
    .then(res => {
      console.log(res)
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
        {/* Add friend form */}
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