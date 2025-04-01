

import {Routes,Route} from 'react-router-dom';

import './csspages/App.css';


//   pages / components
import Home from "./pages/Home.jsx";
import QuizHome from './pages/QuizHome';
import LeaderboardPage from './pages/LeaderboardPage';
import About from './pages/About';
import TakeQuiz from './pages/TakeQuiz.jsx';

import NavBar from './components/NavBar';
import Footer from './components/Footer';


function App() {
  return (

    <div className="app-container">
      <NavBar className="navbar" />
      <div class="background-container">
        <div className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/QuizHome" element={<QuizHome />} />
          <Route path='/TakeQuiz' element={<TakeQuiz />}/>
          <Route path="/Leaderboards" element={<LeaderboardPage />} />
          <Route path="/About" element={<About />} />
        </Routes>
        </div>
      </div>

      <Footer/>
    </div>
  );
}








export default App
