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
		answer: false
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
						console.log(this.state.total_score);
					}
				);
			})
			.catch(res => this.setState({ error: res.error }));
	}

	handleSubmitNewWord = ev => {
		ev.preventDefault();
		// const { userTranslation } = ev.target;

		this.setState({ answer: false });
		this.setState({ error: null });
		this.setState({ currentWordIdx: this.state.currentWordIdx + 1 });

		// LearningApiService.makeGuess({
		//   userTranslation: userTranslation.value
		// })
		//   .then(res => {
		//     userTranslation.value = "";
		//   })
		//   .catch(res => {
		//     this.setState({ error: res.error });
		//   });
	};

	handleSubmit = ev => {
		ev.preventDefault();
		this.setState({ answer: true });
		console.log(ev.target.learn_guess_input.value);
		this.setState({ currentWord: ev.target.learn_guess_input.value });
	};

	handleAnswer() {
		if (this.state.currentWordIdx < this.state.words.length) {
			return (
				<li className="quizWordAnswer" key={this.state.words[this.state.currentWordIdx].id}>
					<h3>{this.state.words[this.state.currentWordIdx].translation}</h3>
					<br />
					<form className="quizResponse" onSubmit={this.handleSubmitNewWord}>
						{this.state.currentWord !== this.state.words[this.state.currentWordIdx].translation ? (
							<p className="response">Sorry, that was incorrect! Why don't you try again?</p>
						) : (
								<p className="response">Wow, you're right!</p>
							)}
						<br />
						<br />
						{this.state.currentWordIdx + 1 < this.state.words.length ? (
							<button classNmae="next" type="submit">
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
		console.log(this.state.currentWord);
		return (
			<div>
				<h2 className="totalCorrectAnswers">Translate the word:</h2>
				<span className="testnextword">
					Testnextword{this.state.words ? (
						this.state.currentWordIdx + 1 < this.state.words.length ? (
							<span> {this.state.words[this.state.currentWordIdx + 1].original}</span>
						) : null
					) : null}
				</span>
				<section className="correct_incorrect_count">
					<section className="thisCorrectCount">
						You have answered this word correctly {this.state.words ? this.state.words[this.state.currentWordIdx].incorrect_count : 222} times.
					</section>
					<p className="correctCount">
						Your total score is:{' '}
						{this.state.words ? this.state.words[this.state.currentWordIdx].correct_count : 999}
					</p>
					<section className="thisIncorrectCount">
						You have answered this word incorrectly {this.state.words ? this.state.words[this.state.currentWordIdx].incorrect_count : 333} times.
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
				<form className="quiz" onSubmit={this.handleSubmit}>
					<label for="learn_guess_input" className="quizAnswer">
						What's the translation for this word?
					</label>
					<input type="text" id="learn_guess_input" className="learn-guess-input" required />
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
