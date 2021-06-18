import React, { Component } from 'react';

class Nav extends Component{
    render(){
        const logged_out_nav = (
            <nav
                className="w3-bar w3-blue w3-margin-bottom"
            >
                <button
                    type="button"
                    onClick={() => {this.props.handleDisplayForm('login')}}
                    className="w3-button w3-bar-item w3-hover-white"
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => {this.props.handleDisplayForm('signup')}}
                    className="w3-button w3-bar-item w3-hover-white"
                >
                    Sign Up
                </button>
            </nav>
        );

        const logged_in_nav = (
            <nav
                className="w3-bar w3-blue w3-margin-bottom"
            >
                <button
                    type="button"
                    className="w3-button w3-bar-item w3-hover-white w3-right"
                >
                    Logout
                </button>
            </nav>
        );

        return this.props.logged_in ? logged_in_nav : logged_out_nav;
    }
}

export default Nav;