import Profile from './profile.js';
import Login from './login.js';
import axios from 'axios';
import { timingSafeEqual } from 'crypto';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    }
    this.setLogin = this.setLogin.bind(this);
  }
  
  componentDidMount() {
    axios.get('/login')
      .then(response => {
        if (response.data.user !== null) {
          this.setLogin()
        }
      })
  }

  setLogin(){
    this.setState({loggedIn: !this.state.loggedIn,
    })
  }

  render(){
    return (
      this.state.loggedIn ? <Profile renderDrawer={this.props.renderDrawer}></Profile> : <Login setLogin={this.setLogin}></Login>
    )
  }

}

export default User
