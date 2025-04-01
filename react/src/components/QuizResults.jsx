import React from 'react';
import MiniLeaderboard from '../components/MiniLeaderboard';

const QuizResults = ({ score, answers, questions, correctAnswers, setShowResults }) => {
  console.log(answers)
  console.log(correctAnswers)
  return (
    <div className="quiz-results">
      <h2>Quiz Complete!</h2>
      <p>Your score: {score * 100}%</p>
      <p>
        You got {numberCorrect(answers, correctAnswers)} out of {questions.length} correct
      </p>
      <button onClick={() => setShowResults(true)} className="quiz-submit-button">
        See Results
      </button>
      <MiniLeaderboard/>

    </div>
  );
};

function numberCorrect(answer, correctAnswers) {
  let total = 0
  for (let i = 0; i < answer.length; i++) {
    if (answer[i].selectedAnswer == correctAnswers[i]) {
      total++
    }
  }
  return total
}

export default QuizResults;