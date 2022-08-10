import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <form id='form' onSubmit={this.props.todoSubmit}>
        <input
          value={this.props.todoInput}
          type='text'
          placeholder='Type new todo'
          onChange={this.props.todoChange}
        ></input>
        <input type='submit'></input>
        <button onClick={this.props.toggleDisComp}>
          {this.props.displayComp ? 'Hide' : 'Show'}
          Completed
        </button>
      </form>
    )
  }
}
