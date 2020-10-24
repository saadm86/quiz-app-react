import React, { useState } from 'react';
import { fetchQuizQuestions } from './services/API';
// Components
import QuestionCard from './components/QuestionCard';
import {QuizType} from './components/QuizType'
// types
import { QuestionsState } from './services/API';
// Styles
import { GlobalStyle, Wrapper } from './App.styles'

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

function refreshPage() {
  window.location.reload(false);
}

const App: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const amountCallBack = (amount: number) => {
    setAmount(+amount);
  };

  const difficultyCallBack = (difficulty: string) => {
    setDifficulty(difficulty);
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      amount,
      difficulty
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save the answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQ = number + 1;
    if (nextQ === amount) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
          {gameOver ? <QuizType
          amountCallBack={amountCallBack}
          difficultyCallBack={difficultyCallBack}
        /> : null}
          
        {gameOver || userAnswers.length === amount ? (
          <div className="playbutton">
            <button className='start' onClick={startTrivia}>
              Start
            </button>
            <button className='start' onClick={refreshPage}>
              Reset
            </button>
          </div>
        ) : null}
        {!gameOver ? <p className='score'>Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={amount}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== amount - 1 ? (
          <button className='next' onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;

