import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  state = {
    todos: [],
    error: '',
    todoInput: '',
    displayComp: true,
  }

  todoChange = (e) => {
    const { value } = e.target
    this.setState({ ...this.state, todoInput: value })
  }

  todoError = (err) => {
    this.setState({ ...this.state, error: err.responee.data.message })
  }

  resetForm = () => {
    this.setState({ ...this.state, todoInput: '' })
  }

  newTodo = () => {
    axios
      .post(URL, { name: this.sstate.todoInput })
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.concat(res.data.data),
        })
        this.resetForm()
      })
      .catch(this.todoError)
  }

  todoSubmit = (e) => {
    e.preventDefault()
    this.newTodo()
  }

  fetchTodos = () => {
    axios
      .get(URL)
      .then((res) => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.todoError)
  }

  toggleComplete = (id) => () => {
    axios
      .patch(`${URL}/${id}`)
      .then((res) => {
        this.setState({
          ...this.state,
          todos: this.state.todos.map((td) => {
            if (td.id !== id) return td
            return res.data.data
          }),
        })
      })
      .catch(this.todoError)
  }

  toggleDisComp = () => {
    this.setState({ ...this.state, displayComp: !this.state.displayComp })
  }

  componentDidMount() {
    this.fetchTodos()
  }
  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <TodoList
          todos={this.state.todos}
          displayComp={this.state.displayComp}
          toggleComplete={this.toggleComplete}
        />
        <Form
          todoSubmit={this.todoSubmit}
          toggleDisComp={this.toggleDisComp}
          todoChange={this.todoChange}
          todoInput={this.state.todoInput}
          displayComp={this.state.displayComp}
        />
      </div>
    )
  }
}
