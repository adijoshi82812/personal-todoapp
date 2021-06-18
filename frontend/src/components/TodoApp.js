import React, { Component } from 'react';

import axios from 'axios';

class TodoApp extends Component{
    constructor(){
        super();
        this.state = {
            Data: []
        };
    }

    refreshList = () => {
        axios.get('http://localhost:8000/api/todos/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.setState({ Data: res.data });
        })
        .catch(err => console.log(err));
    };

    componentDidMount(){
        this.refreshList();
    }

    render(){
        const datacomponent = this.state.Data.map(data => {
            return(
                <tr
                    key={data.id}
                >
                    <td>
                        <input
                            type="checkbox"
                            id={data.id}
                            checked={data.completed}
                            className="w3-check"
                        />
                    </td>
                    <td>
                        <label
                            htmlFor={data.id}
                            title={data.description}
                            className={data.completed ? "mystrike" : ""}
                        >
                            {data.title}
                        </label>
                    </td>
                </tr>
            );
        });
        return(
            <div
                className="w3-card-4 w3-round display-box"
            >
                <h2
                    className="w3-center"
                >
                    Welcome {this.props.username}
                </h2>
                <h3
                    className="w3-center"
                >
                    Your List
                </h3>
                <table 
                    cellSpacing="10"
                    style={{ width: "100%" }}
                    className="w3-border w3-round"
                >
                    <tbody>
                        {!this.state.Data.length ? (
                            <tr>
                                <td
                                    colSpan="4"
                                >
                                    Nothing here add some task
                                </td>
                            </tr>
                        ) :  ""}
                        {datacomponent}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TodoApp;