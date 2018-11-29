import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: null,
        password: null,
        loggedIn: false,
    };
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }



  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signUp() {
    axios.post('/signup', {
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  submitLogin() {
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      alert('you\'re in!')
      this.props.setLogin()
      })
      .catch((err) => {
        //add some not logged in action
        alert('nope');
    })
  }

  render() {
    return (
      <div>
        <span>Email:</span>
        <input name="email" onChange={this.handleChange}></input>
        <span>Password:</span>
        <input name="password" type="password" onChange={this.handleChange}></input>
        <button onClick={this.submitLogin}>Login</button>
        <button onClick={this.signUp}>SignUp</button>
      </div>
    )
  }
}


export default Login;
