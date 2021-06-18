import React, { Component } from 'react';

import axios from 'axios';

class TodoApp extends Component{
    constructor(){
        super();
        this.state = {
            Data: [],
            show: false,
            modalValue: {
                title: "",
                description: "",
                completed: false
            },
            newValue: {
                user: "",
                title: "",
                description: "",
                completed: false,
            }
        };

        this.handleModal = this.handleModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    handleUpdate = (data) => {
        data.completed = data.completed ? false : true;
        axios.put('http://localhost:8000/api/todos/' + data.id + '/', data, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            this.refreshList();
        })
        .catch(err => console.log(err));
    };

    Modal = ({show, handleModal, children}) => {
        const showHideClassName = show ? "w3-modal w3-show" : "w3-modal";
        return(
            <div
                className={showHideClassName}
            >
                <div
                    className="w3-modal-content w3-container w3-round w3-animate-top"
                >
                    <button
                        className="w3-button w3-round w3-display-topright"
                        onClick={handleModal}
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        );
    };

    handleModal = (data) => {
        if(!this.state.show){
            this.setState({
                show: true,
                modalValue: {
                    title: data.title,
                    description: data.description,
                    completed: data.completed
                }
            });
        }else{
            this.setState({
                show: false,
                modalValue: {
                    title: "",
                    description: "",
                    completed: false
                }
            });
        }
    };

    handleDelete = (id) => {
        axios.delete('http://localhost:8000/api/todos/' + id + '/', {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(() => { this.refreshList(); })
        .catch(err => console.log(err));
    };

    handleChange(event){
        const data = this.state.newValue;
        data[event.target.name] =  event.target.value;
        this.setState({ newValue: data });
    }

    handleAdd = (data) => {
        if(data.title.length < 4)
            return alert('Title must be 4 characters');

        if(data.description.length < 10)
            return alert('Description must be 10 characters');

        data.user = this.props.user_id;
        axios.post('http://localhost:8000/api/todos/', data, {
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(() => {
            this.setState({
                newValue: {
                    user: "",
                    title: "",
                    description: "",
                    completed: false,
                }
            });
            this.refreshList();
        })
        .catch(err => console.log(err));
    };

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
                            onChange={() => this.handleUpdate(data)}
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
                    <td>
                        <button
                            type="button"
                            onClick={() => this.handleModal(data)}
                            className="w3-button w3-green w3-round"
                            style={{ width: "100%" }}
                        >
                            Details
                        </button>
                    </td>
                    <td>
                        <button
                            type="button"
                            onClick={() => this.handleDelete(data.id)}
                            className="w3-button w3-red w3-round"
                            style={{ width: "100%" }}
                        >
                            Delete
                        </button>
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
                        ) : datacomponent}

                        <tr>
                            <td
                                colSpan="4"
                            >
                                <input
                                    type="text"
                                    name="title"
                                    value={this.state.newValue.title}
                                    placeholder="Enter task description"
                                    onChange={this.handleChange}
                                    className="w3-input w3-border w3-round"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan="4"
                            >
                                <textarea
                                    name="description"
                                    value={this.state.newValue.description}
                                    placeholder="Enter task description"
                                    onChange={this.handleChange}
                                    className="w3-input w3-border w3-round w3-padding-24"
                                    style={{ resize: "none" }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td
                                colSpan="3"
                                style={{ textAlign: "right" }}
                            >
                                Click to add
                            </td>
                            <td>
                                <button
                                    type="button"
                                    onClick={() => this.handleAdd(this.state.newValue)}
                                    className="w3-button w3-blue w3-round"
                                    style={{ width: "100%" }}
                                >
                                    Add
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <this.Modal
                    show={this.state.show}
                    handleModal={this.handleModal}
                >
                    <h3
                        className="w3-center"
                    >
                        Details
                    </h3>
                    <input
                        type="text"
                        value={this.state.modalValue.title}
                        readOnly
                        className="w3-input w3-border w3-margin-bottom w3-round"
                    />
                    <textarea
                        value={this.state.modalValue.description}
                        readOnly
                        className="w3-input w3-border w3-margin-bottom w3-padding-24 w3-round"
                        style={{ resize: "none" }}
                    />
                    <p>
                        Completed : {this.state.modalValue.completed ? "Yes" : "No"}
                    </p>
                </this.Modal>
            </div>
        );
    }
}

export default TodoApp;