import React, { Component } from "react";
import DashboardApiService from "../../services/dashboard-service";
import { Link } from "react-router-dom";

class LearningRoute extends Component {
  state = {
    error: null,
    words: [],
    totalScore: null
  };

  componentDidMount() {
    DashboardApiService.getLanguage()
      .then(data => {
        this.setState(
          {
            words: data.words
          },
          function() {
            console.log(this.state.words);
          }
        );
        return data;
      })
      .then(data => {
        this.setState(
          {
            totalScore: data.language.total_score
          },
          function() {
            console.log(this.state.total_score);
          }
        );
      })
      .catch(res => this.setState({ error: res.error }));
  }

  createWords() {
    return this.state.words.map(word => {
      return (
        <li className="eachWord" key={word.id}>
          <h4>{word.original}</h4>
          <p className="correctCount">
            correct answer count: {word.correct_count}
          </p>
          <p className="incorrectCount">
            incorrect answer count: {word.incorrect_count}
          </p>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Total correct answers: {this.state.totalScore}</h2>
        <ul className="eachWordContainer">{this.createWords()}</ul>
        <Link to={"/"}>Back to Dashboard</Link>
      </div>
    );
  }
}

export default LearningRoute;
