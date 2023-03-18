import React, { useEffect, useState } from 'react';
import './App.css';
import Signup from './components/sign-up';
import Signin from './components/sign-in';
import QuizCard from './components/quiz-card';
import Result from './components/result';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAllQuestions } from './services';

function App() {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [finishedQuiz, setFinishedQuiz] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  const goToNext = () => {
    setCurrentQuestionIndex((prevState) => prevState + 1);
  }

  const submitAnswer = (value) => {
    setAnswers((prevState) => [...prevState, value]);
    goToNext();
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
  }

  const getAllQuestionList = async () => {
    let questionList = await getAllQuestions();
    let list = questionList && questionList.data.map((item) => ({
      title: item.Question_Text,
      options: [
        { "description": item.Option_A, },
        { "description": item.Option_B, },
        { "description": item.Option_C, },
        { "description": item.Option_D, }
      ],
      correctAnswer: item.Correct_Option
    }))
    setQuestions(list);
  }

  useEffect(() => {
    if (questions.length) {
      setFinishedQuiz(currentQuestionIndex === questions.length);
    }
  }, [currentQuestionIndex])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Signin
            getAllQuestionList={getAllQuestionList}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
          />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/quiz' element={finishedQuiz ? <Result
            restartQuiz={restartQuiz}
            answers={answers}
            questions={questions}
          /> :
            <QuizCard
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              submitAnswer={submitAnswer}
              setQuestions={setQuestions}
              getAllQuestionList={getAllQuestionList}
            />
          }
          />
        </Routes>
      </Router>



    </div>
  );
}

export default App;
