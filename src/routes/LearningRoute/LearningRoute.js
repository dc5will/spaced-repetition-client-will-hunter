import React, { Component } from "react";
import DashboardApiService from "../../services/dashboard-api-service";
import LearningApiService from "../../services/learning-api-service";
import { Link } from "react-router-dom";

class LearningRoute extends Component {
  state = {
    error: null,
    words: [],
    totalScore: null
  };

  // 1) displays the current score and h2 with next word
  // 2) displays a form for submitting the next guess
  // 3) displays the correct and incorrect count for this word
  // GET request from /api/language/head returns expected response:
  // {
  //   "nextWord": "memorize",
  //   "wordCorrectCount": 0,
  //   "wordIncorrectCount": 0,
  //   "totalScore": 0
  // }

  componentDidMount() {
    LearningApiService.getHead().then(res => console.log(res));

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
