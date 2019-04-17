import React, { Component } from "react";
import UserContext from "../../contexts/UserContext";
import DashboardApiService from "../../services/dashboard-api-service";
import { Link } from "react-router-dom";
import "./DashboardRoute.css";

class DashboardRoute extends Component {
  state = {
    error: null,
    language: null,
    words: [],
    totalScore: null
  };

  static contextType = UserContext;

  calculateTotal() {
    DashboardApiService.getLanguage().then(data =>
      this.setState({ totalScore: data.language.total_score })
    );
  }

  componentDidMount() {
    DashboardApiService.getLanguage()
      .then(data => {
        this.setState({ language: data.language.name, words: data.words });
      })
      .then(this.calculateTotal())
      .catch(res => this.setState({ error: res.error }));
  }

  createWords() {
    return this.state.words.map(word => {
      return (
        <li className="eachWord" key={word.id}>
          <h4>{word.original}</h4>
          <p className="correctCount">correct answer count: {word.correct_count}</p>
          <p className="incorrectCount">incorrect answer count: {word.incorrect_count}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <section>
        <h2>Learn {this.state.language}</h2>
        <h2>Total correct answers: {this.state.totalScore}</h2>
        <h3>Words to practice</h3>
        <ul className="eachWordContainer">{this.createWords()}</ul>
        <Link to="/learn">
          <button className="begin-button">Start practicing</button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;
