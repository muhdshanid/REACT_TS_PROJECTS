import React, { useState } from 'react'
import Question from './components/Question'
import { Difficulty, QuestionState, fetchQuestions } from './API'

const TOTAL_QUESTIONS = 10

export type AnswerObj = {
  question: string
  answer: string
  correct: boolean
  correctAnswer: string
}
function App() {

  const bgImage = "https://images.unsplash.com/photo-1507295386538-ddd5e86cd597?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2VhJTIwYmVhY2glMjBkcm9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  const [loading, setLoading] = useState<boolean>(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObj[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }
  console.log(questions);
  
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      //user answer
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if(correct){
        setScore(prev => prev + 1)
      }
      const ansObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, ansObj])
    }
  }
  const nextQuestion = () => {

    const nextQuestion = number + 1
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(nextQuestion)
    }
  }
  return (
  <div style={{height: "100vh", width: "80%", marginLeft: "auto",marginRight: "auto"
  , display: "flex", alignItems: "center", justifyContent: "center",
  gap: "100px"}}>
    <h1>REACT QUIZ</h1>
   { gameOver || userAnswers.length === TOTAL_QUESTIONS ? <button className="start" onClick={startTrivia}>
      Start
    </button> 
    : null}
   { !gameOver && <p className="score">Score: {score}</p>}
   { loading && <p>Loading ...</p>}
    { !loading && !gameOver &&  <Question Qnumber={number + 1} totalQuestions={TOTAL_QUESTIONS}
    question={questions[number].question}
    answers={questions[number].answers}
    userAnswer={userAnswers ? userAnswers[number] : undefined}
    callback={checkAnswer}/> }
   {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 &&
    <button className="next" onClick={nextQuestion}>
      Next Question
    </button>}
  </div>
  )
}

export default App
