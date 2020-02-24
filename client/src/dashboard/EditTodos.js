import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter } from "react-router-dom";

export default class EditToDo extends Component {
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
    axios.get('/api/todos/' + this.props.match.params.id)
      .then(response => { console.log(response)
        this.setState({
          task: response.data.task
        })
      })
      .catch(function (error) {
        console.log(error);
      })

      axios.get('/api/todos/')
      .then(response => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  // Get the input from the fields using the target value when entered into the form
  onChangeTask(e) {
    this.setState({
      task: e.target.value
    });
  }

  // When done editing the item and the user submits the return to the page, all items are set in state and the axios method will be used to post the updated item
  onSubmit(e) {
    e.preventDefault();
    const todo = {
      task: this.state.task
    };
    console.log(todo);
    axios.post('/api/todos/update/' + this.props.match.params.id, todo)
      .then(res => console.log(res.data));
    window.location = '/todos';
  }

  render() {
    return (
      <div className="col s12 center-align">
        <h3>Create New Task</h3>
        <BrowserRouter>
          <a href="/todos" 
          style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px"
            }}
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >Cancel</a>
        </BrowserRouter>
        <br />
        <br />
        <div className="container center-align">
        <form onSubmit={this.onSubmit}>
         
        <div className="form-group">
            <label>Task</label>
            <input type="text"
              required
              className="form-control"
              value={this.state.task}
              onChange={this.onChangeTask}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Submit edit" className="btn btn-primary" />
          </div>
        </form>
      </div>
      </div>
    )
  }
}