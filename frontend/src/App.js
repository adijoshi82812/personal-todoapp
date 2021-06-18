import React, { Component } from 'react';

import Nav from './components/Nav';

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
    return(
      <div>
        <Nav
          logged_in={this.state.logged_in}
          handleDisplayForm={this.handleDisplayForm}
        />
      </div>
    );
  }
}

export default App;