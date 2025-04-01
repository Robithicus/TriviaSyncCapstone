import React from 'react';

const QuizQuestion = ({
  currentQuestion,
  currentQuestionIndex,
  questionsLength,
  answers,
  handleAnswerChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <h3 className="quiz-title">General Knowledge Quiz</h3>
      <div>
        <p className="quiz-category">Category: {currentQuestion.category}</p>
        <p className="quiz-question">
          Question {currentQuestionIndex + 1} of {questionsLength}
        </p>
        <p className="quiz-question">{currentQuestion.question}</p>
        <div className="quiz-options">
          {currentQuestion.options.map((option, index) => (
            <label key={index} className="quiz-option">
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                value={option}
                checked={answers[currentQuestionIndex]?.selectedAnswer === option}
                onChange={(e) => handleAnswerChange(e.target.value)}
                required
              />
              {option}
            </label>
          ))}
        </div>
        <button type="submit" className="quiz-submit-button">
          {currentQuestionIndex === questionsLength - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default QuizQuestion;