import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";

export default class CreateToDo extends Component {

  constructor(props) {
    super(props);
    // Bind each function
    this.onChangeTask = this.onChangeTask.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // State set to each input item required
    this.state = {
      task: '',
      todos: []
    }
  }
  // When mounted get the data from the database and set them to state
  componentDidMount() {
    axios.get('/api/todos/')
      .then(response => {
        console.table(response.data);
        if (response.data.length > 0) {
          this.setState({
            todos: response.data.map(todos => todos.task)
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Get the input from the fields using the target value when entered into the form
  onChangeTask(e) {
    this.setState({
      task: e.target.value
    });
  }
  
  // When the users submits the new data, fetch is used to connect to the database, method is post and sends the data to the database. Once sent, render the home
  // screen and display the items including the newly added item
 
  onSubmit(e) {
    e.preventDefault();
    axios.post('/api/todos/add/', {
      task: this.state.task
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    // Reload the window to the home screen
    window.location = '/todos';
  }


  render() {
    return (
      <div className="col s12 center-align">
        <h3>Create New Task</h3>
        <BrowserRouter>
          <a href="/todos" 
          style={{
              width: "300px",
              borderRadius: "9px",
              letterSpacing: "1.5px",
              height:"50px"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >Cancel</a>
        </BrowserRouter>
        <br />
        <br />
        <div className="container center-align">
        <form onSubmit={this.onSubmit}>

          <div className="form-group">
            <label>Task: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.task}
              onChange={this.onChangeTask}
            />
          </div>
          

          <div className="form-group">
            <input type="submit" value="Create new to do item" className="btn btn-primary" />
          </div>
        </form>
        </div>
      </div>
    )
  }
}