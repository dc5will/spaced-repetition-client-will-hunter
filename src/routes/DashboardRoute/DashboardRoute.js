import React, { Component } from 'react'
import UserContext from '../../contexts/UserContext';
import DashboardApiService from '../../services/dashboard-service';
import { Link } from 'react-router-dom';

class DashboardRoute extends Component {
  state = {
    error: null,
    language: null,
    words: []
  }

  static contextType = UserContext;

  componentDidMount() {
    console.log(this.state.words)
    DashboardApiService.getLanguage().then(data => {
      console.log(data.language.name);
      this.setState({ language: data.language.name, words: data.words })
    }).catch(res => this.setState({ error: res.error }))
  }

  createWords() {
    return this.state.words.map(word => {
      return (
        <li key={word.id}>
          <h3>{word.original}</h3>
          <p>correct: {word.correct_count}</p>
          <p>incorrect: {word.incorrect_count}</p>
        </li>
      )
    })
  }

  render() {
    console.log(this.state.language);
    return (
      <section>
        <h2>Learn {this.state.language}</h2>
        <h3>Words List</h3>
        <ul>{this.createWords()}</ul>
        <Link to='/learn'>
          <button className='begin-button'>Begin</button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute
