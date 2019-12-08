import React, { Component } from 'react';
class App extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      listTask: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  async componentDidMount() {
    await this.getListTask();
  }
  async getListTask() {
    try {
      const objPropertiesFetch = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('/api/tasks', objPropertiesFetch);
      const data = await response.json();
      if (Array.isArray(data)) this.setState({ listTask: data })
    } catch (error) {
      console.error("App.js/getListTask=>", error);
    }
  }
  async addTask(event) {
    event.preventDefault();
    const objMessage = { html: 'Task Saved Error' };
    try {
      const objPropertiesFetch = {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const response = await fetch('/api/tasks', objPropertiesFetch);
      const data = await response.json();
      if (data && data._id) {
        objMessage.html = 'Task Saved';
        const listTask = [...this.state.listTask];
        listTask.push(data);
        const newObjState = {
          title: '',
          description: '',
          listTask: listTask
        };
        this.setState(newObjState);
      }
    } catch (error) {
      console.error("App.js/addTask=>", error);
    }
    finally {
      M.toast(objMessage);
    }
  }
  async editTask(event) {
    event.preventDefault();
    const objMessage = { html: 'Task Edit Error' };
    try {
      const objPropertiesFetch = {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      const idTask = event.target.dataset.id;
      const response = await fetch(`/api/tasks/${idTask}`, objPropertiesFetch);
      const data = await response.json();
      if (data && data._id) {
        objMessage.html = 'Task Edited';
        const listTask = this.state.listTask.map((itemTask => {
          if (itemTask._id === idTask) return (Object.assign(data, { title: this.state.title, description: this.state.description }));
          else return itemTask;
        }).bind(this));
        const newObjState = {
          listTask: listTask
        };
        this.setState(newObjState);
      }
    } catch (error) {
      console.error("App.js/editTask=>", error);
    }
    finally {
      M.toast(objMessage);
    }
  }
  async deleteTask(event) {
    event.preventDefault();
    if (confirm("You want to delete a record")) {
      const objMessage = { html: 'Task Delete Error' };
      try {
        const objPropertiesFetch = {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
        const idTask = event.target.dataset.id;
        const response = await fetch(`/api/tasks/${idTask}`, objPropertiesFetch);
        const data = await response.json();
        if (data && data._id) {
          objMessage.html = 'Task deleted';
          const listTask = this.state.listTask.filter(itemTask => itemTask._id !== idTask);
          const newObjState = {
            listTask: listTask
          };
          this.setState(newObjState);
        }
      } catch (error) {
        console.error("App.js/deleteTask=>", error);
      }
      finally {
        M.toast(objMessage);
      }
    }
  }
  handleChange(event) {
    try {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
      event.preventDefault();
    } catch (error) {
      console.error("App.js/handleChange=>", error);
    }
  }
  GenerateTemplate() {
    return (
      <div>
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">MERN STACK</a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="title" type="text" placeholder="Task Title" onChange={this.handleChange} value={this.state.title}>
                        </input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" className="materialize-textarea" type="text" placeholder="Task Title"
                          onChange={this.handleChange} value={this.state.description}>
                        </textarea>
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">Send</button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.GenerateTemplateListTask()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
  GenerateTemplateListTask() {
    try {
      return (this.state.listTask.map(itemTask => {
        return (
          <tr key={itemTask._id}>
            <td>{itemTask.title}</td>
            <td>{itemTask.description}</td>
            <td>
              <button className="btn light-blue darken-4" onClick={this.editTask} data-id={itemTask._id}>
                <i className="material-icons" data-id={itemTask._id}>edit</i>
              </button>
              <button className="btn light-blue darken-4" style={{ margin: "4px" }} onClick={this.deleteTask} data-id={itemTask._id}>
                <i className="material-icons" data-id={itemTask._id}>delete</i>
              </button>
            </td>
          </tr>
        )
      }));
    } catch (error) {
      console.error("App.js/GenerateTemplateListTask=>", error);
    }
  }
  render() {
    return (this.GenerateTemplate())
  }
}
export default App