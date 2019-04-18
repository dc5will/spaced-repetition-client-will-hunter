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
		incorrectPhrase: 'Good try, but not quite right :('
	};

	componentDidMount() {
		LearningApiService.getHead().then(res => console.log(res));

		DashboardApiService.getLanguage()
			.then(data => {
				this.setState(
					{
						words: data.words
					},
					function () {
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
					function () {
						console.log(this.state.totalScore);
					}
				);
			})
			.catch(res => this.setState({ error: res.error }));

	}

	handleSubmitNewWord = ev => {
		ev.preventDefault();
		this.setState({ rightOrWrong: null });
		this.setState({ answer: false });
		this.setState({ error: null });
		this.setState({ currentWordIdx: this.state.currentWordIdx + 1 });
	};

	handleSubmit = ev => {
		ev.preventDefault();

		this.setState({ answer: true });
		this.setState({ currentWord: ev.target.learn_guess_input.value }, function () {
			console.log(this.state.currentWord);
		});
		LearningApiService.makeGuess(ev.target.learn_guess_input.value)
			.then(data => {
				this.setState(
					{
						totalScore: data.totalScore
					},
					function () {
						console.log(this.state.totalScore);
					}
				)
				DashboardApiService.getLanguage()
					.then(data => {
						this.setState(
							{
								words: data.words
							},
							function () {
								console.log(this.state.words);
							}
						);
						return data;
					})
					.catch(res => this.setState({ error: res.error }));
			})
	}

	handleAnswer() {
		if (this.state.currentWordIdx < this.state.words.length) {
			return (
				<li className="quizWordAnswer" key={this.state.words[this.state.currentWordIdx].id}>
					<h3>{this.state.words[this.state.currentWordIdx].translation}</h3>
					<br />
					<form className="quizResponse" onSubmit={this.handleSubmitNewWord}>
						<br />
						<br />
						{this.state.currentWordIdx + 1 < this.state.words.length ? (
							<button className="next" type="submit">
								{' '}
								Next Word: {this.state.words[this.state.currentWordIdx + 1].original}
							</button>
						) : (
								<button type="submit">Finish</button>
							)}
					</form>
				</li>
			);
		} else {
			return <h2>You're all out of words!</h2>;
		}
	}

	createWords() {
		if (this.state.currentWordIdx < this.state.words.length) {
			return (
				<li className="eachQuizWord" key={this.state.words[this.state.currentWordIdx].id}>
					<h2 className="userTranslation">{this.state.words[this.state.currentWordIdx].original}</h2>
				</li>
			);
		} else {
			return <h2>You're all out of words!</h2>;
		}
	}

	render() {
		// let rightOrWrong = null;
		// if (this.state.words) {
		// 	if (this.state.currentWordIdx < this.state.words.length) {
		// 		if (this.state.currentWord && this.state.words[this.state.currentWordIdx].translation) {
		// 			if (this.state.currentWord === this.state.words[this.state.currentWordIdx].translation) {
		// 				rightOrWrong = true
		// 			}
		// 			else if (this.state.currentWord !== this.state.words[this.state.currentWordIdx].translation) {
		// 				rightOrWrong = false
		// 			}
		// 		}
		// 	}
		// }
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
						You have answered this word correctly {this.state.words ? this.state.currentWordIdx < this.state.words.length ? this.state.words[this.state.currentWordIdx].correct_count : 222 : 222} times.
					</section>
					<p className="DisplayScore">
						Your total score is:{' '}
						{this.state.totalScore ? this.state.totalScore : 999}
					</p>
					<section className="thisIncorrectCount">
						You have answered this word incorrectly {this.state.words ? this.state.currentWordIdx < this.state.words.length ? this.state.words[this.state.currentWordIdx].incorrect_count : 333 : 333} times.
					</section>
				</section>
				{this.state.words ? (
					this.state.answer === false ? (
						<section>
							<ul className="eachQuizWordContainer">{this.createWords()}</ul>
						</section>
					) : (
							<ul className="eachQuizWordContainer">{this.handleAnswer()}</ul>
						)
				) : null}
				{/* <h3>{rightOrWrong === true ? this.state.correctPhrase : this.state.incorrectPhrase}</h3> */}
				<form className="quiz" onSubmit={this.handleSubmit}>
					<label htmlFor="learn_guess_input" className="quizAnswer">
						What's the translation for this word?
					</label>
					<input type="text" id="learn_guess_input" className="learn_guess_input" required />
					<br />
					<br />
					<button type="submit">Submit your answer</button>
				</form>
				<Link to={'/'}>Back to Dashboard</Link>
			</div>
		);
	}
}

export default LearningRoute;
