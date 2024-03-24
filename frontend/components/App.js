import React, { Component } from 'react';
import '../styles/styles.css';

class TodoList extends Component {
  render() {
    const { todos, toggleComplete } = this.props;
    return (
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} />
        ))}
      </ul>
    );
  }
}

class Todo extends Component {
  render() {
    const { todo, toggleComplete } = this.props;
    return (
      <li style={{ fontWeight: 'bold' }}
        onClick={() => toggleComplete(todo.id)}>
        {todo.task}
        {todo.completed && <span style={{ marginLeft: '5px' }}>✔</span>}
      </li>
    );
  }
}

class Form extends Component {
  state = {
    inputValue: ''
  };

  handleChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addTodo(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <br />
        <input
          type="text"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Type Todo"
        />
        <button type="submit">Submit</button><br /><br />
      </form>
    );
  }
}

class App extends Component {
  state = {
    todos: [],
    showCompleted: true
  };

  addTodo = task => {
    const newTodo = {
      id: Date.now(),
      task: task,
      completed: false
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo]
    }));
  };

  toggleComplete = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  toggleShowCompleted = () => {
    this.setState(prevState => ({
      showCompleted: !prevState.showCompleted
    }));
  };

  render() {
    const { todos, showCompleted } = this.state;
    const filteredTodos = showCompleted ? todos : todos.filter(todo => !todo.completed);

    return (
      <div>
        <h1 style={{ fontWeight: 'bold' }}>Todo:</h1><br />
        <TodoList todos={filteredTodos} toggleComplete={this.toggleComplete} />
        <Form addTodo={this.addTodo} />
        <button onClick={this.toggleShowCompleted}>
          {showCompleted ? 'Hide Completed' : 'Show Completed'}
        </button>
      </div>
    );
  }
}

export default App;