/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

// Create the props that will be rendered for the table output
const ToDo = props => (
  <tr>
    <td>{props.todo.task}</td>
    <td>
      {/* Link to the edit and delete option */}
      <Link to={"/edit/" + props.todo._id}>✎</Link> | <a href="#" onClick={() => { props.deleteTodo(props.todo._id) }}>✘</a>
    </td>
  </tr>
)


class ToDosList extends Component {
  constructor(props) {
    super(props);
    // Bind the delete todo option to deletetodo
    this.deleteTodo = this.deleteTodo.bind(this)
    this.state = { 
      todos: [] }
  }

  // When mounted get the data from the database and set them to state
  componentDidMount() {
    axios.get('/api/todos/')
      .then(response => {
        console.log(response)
        this.setState({ todos: response.data })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Delete the todos by ID when deleting
  deleteTodo(id) {
    axios.delete('/api/todos/' + id)
      .then(response => {
        console.log(response.data)
      });
    this.setState({
      todos: this.state.todos.filter(el => el._id !== id)
    })
  }
  // Map the todos to the table
  todoList() {
    return this.state.todos.map(currenttodo => {
      return <ToDo todo={currenttodo} deleteTodo={this.deleteTodo} key={currenttodo._id} />;
    })
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    window.location = '/'
  };

  onToDoClick = () => {
    window.location = '/todos'
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div className="col s12 center-align">
        <br />
        <br />
        <h4>
          <b>Welcome back,</b> {user.name.split(" ")[0]}<b>! Please look what your tasks is!</b>
        </h4>
		<h5>Please do not remove your task unless you have permission, edit the task and insert '-done' after the task.</h5>
        <h6>Here is a link to the <a href="https://www.dropbox.com/home/Zanneleen%20Wallace-29689">dropbox</a>, upload all of your files as soon as your done</h6>
		<br />
          <button
            style={{
              width: "300px",
              borderRadius: "9px",
              letterSpacing: "1.5px",
              marginTop: "1rem",
              height:"50px"
            }}
            onClick={this.onLogoutClick}
            className="btn btn-large waves-effect waves-light hoverable red accent-3"
          >
          Logout
          </button>
        <br />
        <br />
        <BrowserRouter>
          <a href="/create"
            style={{
              width: "300px",
              borderRadius: "9px",
              letterSpacing: "1.5px",
              height:"50px"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >Add New Task</a>
        </BrowserRouter>
        <h3>Group tasks</h3>
        <div className="container valign-wrapper">
          <br />
          <br />
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Task</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.todoList()}
            </tbody>
          </table>
          <br />
        </div>
      </div>
    )
  }
}

ToDosList.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(ToDosList);