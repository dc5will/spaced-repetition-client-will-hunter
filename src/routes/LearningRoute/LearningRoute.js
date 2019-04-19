import React, { Component } from 'react';
import DashboardApiService from '../../services/dashboard-api-service';
import LearningApiService from '../../services/learning-api-service';
import { Link } from 'react-router-dom';
import './LearningRoute.css';

class LearningRoute extends Component {
	state = {
		error: null,
		words: null,
		totalScore: null,
		currentWord: null,
		currentWordIdx: 0,
		answer: false,
		correctPhrase: 'You were correct! :D',
		incorrectPhrase: 'Good try, but not quite right :(',
		createWords: false,
		newOrCurrent: null
	};

	componentDidMount() {
		DashboardApiService.getLanguage()
			.then(data => {
				this.setState(
					{
						words: data.words
					},
					function () {
						// console.log(this.state.words);
					}
				);
				return data;
			})
			.then(data => {
				this.setState(
					{
						totalScore: data.language.total_score
					},
					function () {
						// console.log(this.state.totalScore);
					}
				);
			})
			.catch(res => this.setState({ error: res.error }))
	}

	handleSubmitNewWord = ev => {
		ev.preventDefault();
		this.setState({ createWords: true });
		this.setState({ rightOrWrong: null });
		this.setState({ answer: false });
		this.setState({ error: null });
		this.setState({ currentWordIdx: this.state.currentWordIdx + 1 });
		document.getElementById("correctPhrase").style.visibility = "hidden";
		document.getElementById("incorrectPhrase").style.visibility = "hidden";
		document.getElementById("correctResponse").style.visibility = "hidden";
		document.getElementById("incorrectResponse").style.visibility = "hidden";
		document.getElementById("quizWordAnswer").style.visibility = "hidden";
		document.getElementById("quizForm").style.visibility = "visible"
	};

	handleSubmit = ev => {
		ev.preventDefault();
		if (this.state.newOrCurrent === 'current') {
			return this.handleSubmitCurrentWord(ev);
		}
		else if (this.state.newOrCurrent === 'new') {
			return this.handleSubmitNewWord(ev);
		}
	}

	handleSubmitCurrentWord = ev => {
		ev.preventDefault();

		this.setState({ answer: true });
		this.setState({ createWords: false });
		this.setState({ currentWord: ev.target.learn_guess_input.value }, function () {
			// console.log(this.state.currentWord);
		});
		LearningApiService.makeGuess(ev.target.learn_guess_input.value)
			.then(data => {
				this.setState(
					{
						totalScore: data.totalScore
					},
					function () {
						// console.log(this.state.totalScore);
					}
				)
				DashboardApiService.getLanguage()
					.then(data => {
						this.setState(
							{
								words: data.words
							},
							function () {
								// console.log(this.state.words);
							}
						);
					})
					.catch(res => this.setState({ error: res.error }))
					.then(document.getElementById("quizForm").reset())
					.then(document.getElementById("quizForm").style.visibility = "hidden");
				if (this.state.currentWordIdx < this.state.words.length) {
					document.getElementById("correctPhrase").style.visibility = "visible"
					document.getElementById("incorrectPhrase").style.visibility = "visible"
					document.getElementById("correctResponse").style.visibility = "visible"
					document.getElementById("incorrectResponse").style.visibility = "visible"
					document.getElementById("quizWordAnswer").style.visibility = "visible"
				}
			})
	}

	handleAnswer() {
		if (this.state.currentWordIdx < this.state.words.length) {
			return (
				<li className="quizWordTitle" key={this.state.words[this.state.currentWordIdx].id}>
					<h3>{this.state.words[this.state.currentWordIdx].translation}</h3>
					<br />

				</li>
			);
		} else {
			return <h2>You're all out of words!</h2>;
		}
	}

	createWords() {
		if (this.state.currentWordIdx < this.state.words.length) {
			return (
				<li className="eachQuizTitle" key={this.state.words[this.state.currentWordIdx].id}>
					<h2 className="userTranslation">{this.state.words[this.state.currentWordIdx].original}</h2>
				</li>
			);
		}
	}

	render() {
		let rightOrWrong = null;
		if (this.state.words) {
			if (this.state.currentWordIdx < this.state.words.length) {
				if (this.state.currentWord && this.state.words[this.state.currentWordIdx].translation) {
					if (this.state.createWords === false) {
						if (this.state.currentWord === this.state.words[this.state.currentWordIdx].translation) {
							rightOrWrong = true
						}
						else if (this.state.currentWord !== this.state.words[this.state.currentWordIdx].translation) {
							rightOrWrong = false
						}
					}
					else {
						rightOrWrong = null
					}
				}
			}
		}

		return (
			<div>
				<h2 className="totalCorrectAnswers">Translate the word:</h2>
				<span className="Testnextword">
					Testnextword{this.state.words ? (
						this.state.currentWordIdx + 1 < this.state.words.length ? (
							<span> {this.state.words[this.state.currentWordIdx + 1].original}</span>
						) : null
					) : null}
				</span>
				<span className="test-next-word-from-generic-guess">
					test-next-word-from-generic-guess
				</span>
				<section className="correct_incorrect_count">
					<section className="thisCorrectCount">
						You have answered this word correctly {this.state.words ? this.state.currentWordIdx < this.state.words.length ? this.state.words[this.state.currentWordIdx].correct_count : 0 : 222} times.
					</section>
					<p className="DisplayScore">
						Your total score is:{' '}
						{this.state.totalScore ? this.state.totalScore : 999}
					</p>
					<section className="thisIncorrectCount">
						You have answered this word incorrectly {this.state.words ? this.state.currentWordIdx < this.state.words.length ? this.state.words[this.state.currentWordIdx].incorrect_count : 0 : 333} times.
					</section>
				</section>
				{this.state.words ? (
					this.state.answer === false ? (
						<section>
							<ul className="titleContainer">{this.createWords()}</ul>
						</section>
					) : (
							<section>
								<ul className="titleContainer">{this.handleAnswer()}</ul>
							</section>
						)
				) : null}
				<form className="quiz" id="quizForm" onSubmit={this.handleSubmit}>
					<label htmlFor="learn_guess_input" className="quizAnswer">
						What's the translation for this word?
					</label>
					<input type="text" id="learn_guess_input" className="learn_guess_input" required />
					<br />
					<br />
					<button className="submitAnswer" onClick={() => this.setState({ newOrCurrent: 'current' })} type="submit">Submit your answer</button>
					<div className="quizWordAnswer" id="quizWordAnswer">
						<h3 className="correctPhrase" id="correctPhrase">{rightOrWrong !== null ? rightOrWrong === true ? this.state.correctPhrase : null : this.state.correctPhrase}</h3>
						<h3 className="incorrectPhrase" id="incorrectPhrase">{rightOrWrong !== null ? rightOrWrong === false ? this.state.incorrectPhrase : null : this.state.incorrectPhrase}</h3>
						<p className="correctResponse" id="correctResponse">{rightOrWrong !== null ? rightOrWrong === true ? `The correct translation for ${this.state.words[this.state.currentWordIdx].original} was ${this.state.words[this.state.currentWordIdx].translation} and you chose ${this.state.currentWord}!` : null : 'The correct translation for Testnextword was test-answer-from-correct-guess and you chose test-guess-correct!'}</p>
						<p className="incorrectResponse" id="incorrectResponse">{rightOrWrong !== null ? rightOrWrong === false ? `The correct translation for ${this.state.words[this.state.currentWordIdx].original} was ${this.state.words[this.state.currentWordIdx].translation} and you chose ${this.state.currentWord}!` : null : 'The correct translation for Testnextword was test-answer-from-incorrect-guess and you chose test-guess-incorrect!'}</p>
						<button formNoValidate="formnovalidate" onClick={() => this.setState({ newOrCurrent: 'new' })} className="next" type="submit">
							{this.state.words ?
								this.state.currentWordIdx + 1 < this.state.words.length ? `Try another word!` : `Try another word!` : `Try another word!`}
						</button>
						<p>Next Word: {this.state.words ? (
							this.state.currentWordIdx + 1 < this.state.words.length ? (
								<p>{this.state.words[this.state.currentWordIdx + 1].original}</p>
							) : null
						) : null}</p>
					</div>
				</form>
				<Link to={'/'}>Back to Dashboard</Link>
			</div>
		);
	}
}

export default LearningRoute;
