import React from 'react';

const QuizResults = ({ score, answers, questions, correctAnswers, setShowResults }) => {
  return (
    <div className="quiz-results">
      <h2>Quiz Complete!</h2>
      <p>Your score: {score * 100}%</p>
      <p>
        You got {answers.filter((answer) => correctAnswers[answer.questionId] === answer.selectedAnswer).length} out of {questions.length} correct
      </p>
      <button onClick={() => setShowResults(true)} className="quiz-submit-button">
        See Results
      </button>
    </div>
  );
};

export default QuizResults;