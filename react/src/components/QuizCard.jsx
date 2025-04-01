import React from 'react';
import { Link } from 'react-router-dom';
import '../css/QuizCard.css';

function QuizCard({ title, description, image, link, onClick }) {
  return (
    <Link
      to={link}
      className="quiz-card-wrapper"
      style={{ textDecoration: 'none' }}
      onClick={onClick} // Pass the onClick event to the Link
    >
      <div className="quiz-card">
        <img src={image} alt={title} className="quiz-card-image" />
        <div className="quiz-card-header">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}

export default QuizCard;