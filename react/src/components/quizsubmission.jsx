import React, { useState } from 'react';
import '../css/quizzesComponent.css';
import MiniLeaderboard from '../components/MiniLeaderboard';
import UsernameForm from './UsernameForm';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import DetailedResults from './DetailedResults';

const QuizSubmission = () => {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [username, setUsername] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  const questions = [
    {
      id: 1,
      category: "Geography",
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
    },
    {
      id: 2,
      category: "Astronomy",
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
    },
    {
      id: 3,
      category: "History",
      question: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
    },
    {
      id: 4,
      category: "Sports",
      question: "How many players are there in a soccer team?",
      options: ["9", "10", "11", "12"],
    },
    {
      id: 5,
      category: "Movies",
      question: "Who directed the movie 'Inception'?",
      options: ["Christopher Nolan", "Steven Spielberg", "James Cameron", "Quentin Tarantino"],
    },
  ];

  const correctAnswers = {
    1: "Paris",
    2: "Mars",
    3: "George Washington",
    4: "11",
    5: "Christopher Nolan",
  };

  const handleAnswerChange = (selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      questionId: questions[currentQuestionIndex].id,
      selectedAnswer: selectedOption,
    };
    setAnswers(updatedAnswers);
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    answers.forEach((answer) => {
      if (correctAnswers[answer.questionId] === answer.selectedAnswer) {
        correctCount++;
      }
    });
    const finalScore = correctCount / questions.length;
    setScore(finalScore);
    setIsComplete(true);
  };

  const handleSubmit = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      {!quizStarted ? (
        <UsernameForm
          username={username}
          setUsername={setUsername}
          setQuizStarted={setQuizStarted}
        />
      ) : !isComplete ? (
        <QuizQuestion
          currentQuestion={currentQuestion}
          currentQuestionIndex={currentQuestionIndex}
          questionsLength={questions.length}
          answers={answers}
          handleAnswerChange={handleAnswerChange}
          handleSubmit={handleSubmit}
        />
      ) : !showResults ? (
        <QuizResults
          score={score}
          answers={answers}
          questions={questions}
          correctAnswers={correctAnswers}
          setShowResults={setShowResults}
        />
      ) : (
        <DetailedResults
          score={score}
          answers={answers}
          questions={questions}
          correctAnswers={correctAnswers}
        />
      )}
    </div>
  );
};

export default QuizSubmission;