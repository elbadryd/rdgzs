import Profile from './profile.js';
import Login from './login.js';
import axios from 'axios';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  
  componentDidMount() {
    axios.get('/login')
      .then(response => {
        if (response.data.user !== null) {
          this.setState({ loggedIn: true })
        }
      })
  }

  render(){
    return (
      this.state.loggedIn ? <Profile></Profile> : <Login></Login>
    )
  }

}

export default User
