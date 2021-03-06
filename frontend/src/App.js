import React, { Component } from 'react';

import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import TodoApp from './components/TodoApp';

class App extends Component{
  constructor(){
    super();
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      display_form: localStorage.getItem('token') ? "" : "login",
      username: "",
      user_id: ""
    };
  }

  componentDidMount(){
    if(this.state.logged_in){
      fetch('http://localhost:8000/users/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        if(!json.username){
          localStorage.removeItem('token');
          this.setState({
            logged_in: false,
            display_form: "login",
            username: "",
            user_id: ""
          });
          return;
        }

        this.setState({
          username: json.username,
          user_id: json.id,
        });
      });
    }
  }

  handleDisplayForm = (form) => {
    this.setState({ display_form: form });
  };

  handleLogin = (cred) => {
    fetch('http://localhost:8000/auth-token/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cred)
    })
    .then(res => res.json())
    .then(json => {
      if(!json.token)
        return alert("Wrong Credentials");

      localStorage.setItem('token', json.token);
      this.setState({
        logged_in: true,
        display_form: "",
        username: json.user.username,
        user_id: json.user.id
      });
    });
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({
      logged_in: false,
      display_form: "login",
      username: "",
      user_id: ""
    })
  };

  handleSignUp = (cred) => {
    fetch('http://localhost:8000/users/user_list/', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cred)
    })
    .then(res => res.json())
    .then(json => {
      if(!json.token){
        return alert("Username already taken");
      }

      localStorage.setItem('token', json.token);
      this.setState({
        logged_in: true,
        display_form: "",
        username: json.username,
        user_id: json.id
      });
    });
  };

  render(){
    let form;
    switch(this.state.display_form){
      case 'login':
        form = (
          <LoginForm
            handleLogin={this.handleLogin}
          />
        );
        break;

      case 'signup':
        form = (
          <SignUpForm
            handleSignUp={this.handleSignUp}
          />
        );
        break;

      default:
        form = null;
        break;
    }

    return(
      <div>
        <Nav
          logged_in={this.state.logged_in}
          handleDisplayForm={this.handleDisplayForm}
          handleLogout={this.handleLogout}
        />
        {this.state.logged_in ? (
          <TodoApp
            username={this.state.username}
            user_id={this.state.user_id}
          />
        ) : form}
      </div>
    );
  }
}

export default App;