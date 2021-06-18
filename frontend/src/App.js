import React, { Component } from 'react';

import Nav from './components/Nav';
import LoginForm from './components/LoginForm';

class App extends Component{
  constructor(){
    super();
    this.state = {
      logged_in: localStorage.getItem('token') ? true : false,
      display_form: localStorage.getItem('token') ? "" : "login"
    };
  }

  handleDisplayForm = (form) => {
    this.setState({ display_form: form });
  };

  render(){
    let form;
    switch(this.state.display_form){
      case 'login':
        form = (
          <LoginForm/>
        );
        break;

      case 'signup':
        form = "";
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
        />
        {form}
      </div>
    );
  }
}

export default App;