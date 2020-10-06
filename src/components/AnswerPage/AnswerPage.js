import React, { Component } from 'react'
import QuestionContext from '../../contexts/QuestionContext';
import './AnswerPage.css';

class AnswerPage extends Component {
  static contextType = QuestionContext;

  buttonRef = React.createRef();

  nextWord = (e) => {
    e.preventDefault();
    this.context.goToNextWord(
      this.context.nextWord, //word
      '', //nextWord
      null, //answer
      null, //isCorrect
      '' //guess
    );
  }
  
  componentDidMount() {
    this.buttonRef.current.focus(); 
  }
  
  
  render() {
    console.log('context =', this.context)
    console.log('word =', this.context.word)
    console.log('answer =', this.context.answer)
    return(
      <section className="answer-container container fade-in">
        <div className="answer-border">
          <div className="DisplayScore">
            <p>Your total score is: {this.context.totalScore}</p>
          </div>
          <h2 className="answer-correct" aria-live="polite">
            {this.context.isCorrect ? "You were correct! :D" : "Good try, but not quite right :("}
          </h2>
          <div className="DisplayFeedback">
            <p >The correct translation for <span className='current-word'>{this.context.word}</span> was <span className='correct-answer'>{this.context.answer}</span> and you chose <span className='users-answer'>{this.context.guess}!</span></p>
          </div>
          <button ref={this.buttonRef} className="green-button learning-route-button" onClick={this.nextWord}>Try another word!</button>
        </div>
      </section>
    );
  }
}

export default AnswerPage