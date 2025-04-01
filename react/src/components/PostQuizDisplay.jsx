import MiniLeaderboard from './components/MiniLeaderboard';

const QuizEndPage = ({ quizCategory }) => (
  <div>
    <h1>Quiz Complete!</h1>
    <MiniLeaderboard  />
  </div>
);

// Usage after a science quiz
<QuizEndPage quizCategory="science" />