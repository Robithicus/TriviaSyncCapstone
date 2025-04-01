import React from 'react';
import '../css/QuizCardHorizontal.css';

function QuizCard({ title, description, image, onClick }) {
  return (
    <div className="quiz-card" onClick={onClick}>
      <img src={image} alt={title} className="quiz-card-image" />
      <div className="quiz-card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default QuizCard;