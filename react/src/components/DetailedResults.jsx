import React from 'react';

const DetailedResults = ({ score, answers, questions, correctAnswers }) => {
  return (
    <div className="quiz-detailed-results">
      <h2>Detailed Results</h2>
      <p>Your score: {score}</p>
      {questions.map((q) => {
        const index = questions.findIndex(l => l == q)
        const userAnswer = answers[index].selectedAnswer;
        const isCorrect = correctAnswers[index] === userAnswer;
        return (
          <div key={q.id} className="question-container">
            <h3>{q.question}</h3>
            <p>Category: {q.category}</p>
            <p>Your answer: {userAnswer || "No answer provided"}</p>
            <p>Correct answer: {correctAnswers[index]}</p>
            <p>{isCorrect ? "✓ Correct" : "✗ Incorrect"}</p>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default DetailedResults;