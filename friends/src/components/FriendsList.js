import React from 'react';

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
  

export default FriendsList;























// componentDidMount() {
//     axios
//       .get('http://localhost:5000/api/movies')
//       .then(response => {
//         this.setState(() => ({ movies: response.data }));
//       })
//       .catch(error => {
//         console.error('Server Error', error);
//       });
//   }

// fetch('https://dog.ceo/api/breed/husky/images')
//       .then(res => res.json())
//       .then(dogs => this.setState({ doggos: dogs.message }))
//       .catch(err => console.log(er));


//       {this.state.friendsList.map(friend => {
//         return (
//           <div key={friend.id}>
//             <br></br>
//             <span>Name: <b>{friend.name} </b></span>
//             <br></br>
//             <span>Age: <b>{friend.age} </b></span>
//             <br></br>
//             <span>Email: <b>{friend.email} </b></span>
//             <br></br>
//           </div>
//         );
//       })}