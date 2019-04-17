import React, { Component } from "react";
import DashboardApiService from "../../services/dashboard-api-service";
import LearningApiService from "../../services/learning-api-service";
import { Link } from "react-router-dom";
import "./LearningRoute.css";

class LearningRoute extends Component {
  state = {
    error: null,
    words: null,
    totalScore: null,
    currentWord: 0
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

  handleSubmit = ev => {
    ev.preventDefault();
    const { userTranslation } = ev.target;

    this.setState({ error: null });
    this.setState({ currentWord: this.state.currentWord + 1 });

    LearningApiService.makeGuess({
      userTranslation: userTranslation.value
    })
      .then(res => {
        userTranslation.value = "";
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  createWords() {
    if (this.state.currentWord < this.state.words.length) {
      return (
        <li
          className="eachQuizWord"
          key={this.state.words[this.state.currentWord].id}
        >
          <h4>{this.state.words[this.state.currentWord].original}</h4>
          <section className="correct_incorrect_count">
            <p className="correctCount">
              correct answer count:{" "}
              {this.state.words[this.state.currentWord].correct_count}
            </p>
            <p className="incorrectCount">
              incorrect answer count:{" "}
              {this.state.words[this.state.currentWord].incorrect_count}
            </p>
          </section>
          <br />
          <br />
          <form className="quiz" onSubmit={this.handleSubmit}>
            <h2 className="quizAnswer" htmlFor="userTranslation">
              Translate the word:{" "}
            </h2>
            <input
              type="text"
              id="userTranslation"
              className="userTranslationInput"
            />
            <br />
            <br />
            <button type="submit">See answer</button>
          </form>
        </li>
      );
    } else {
      return <h2>You're all out of words!</h2>;
    }
  }

  render() {
    return (
      <div>
        <h1 className="totalCorrectAnswers">
          Total correct answers: {this.state.totalScore}
        </h1>
        {this.state.words !== null ? (
          <ul className="eachQuizWordContainer">{this.createWords()}</ul>
        ) : null}
        <Link to={"/"}>Back to Dashboard</Link>
      </div>
    );
  }
}

export default LearningRoute;
