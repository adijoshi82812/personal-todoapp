import React, { Component } from 'react';

class LoginForm extends Component{
    constructor(){
        super();
        this.state = {
            credentials: {
                username: "",
                password: ""
            }
        };
    }

    render(){
        return(
            <div
                className="w3-card-4 w3-round display-box"
            >
                <h2
                    className="w3-center"
                >
                    Login
                </h2>
                <form>
                    <input
                        type="text"
                        name="username"
                        value={this.state.credentials.username}
                        placeholder="Enter your username"
                        className="w3-input w3-border w3-margin-bottom"
                    />
                    <input
                        type="password"
                        name="password"
                        value={this.state.credentials.password}
                        placeholder="Enter your password"
                        className="w3-input w3-border w3-margin-bottom"
                    />
                    <button
                        type="button"
                        className="w3-button w3-green w3-round"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginForm;