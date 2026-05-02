import ProgressBar from "./ProgressBar";
import Answers from "./Answers";
import QUESTIONS from "../questions.js";
import { useState } from "react";

export default function Questions({ onSkip, index, onAnswer }) {
  const [answer, setAnswer] = useState({
    correntAnswer: "",
    isCorrect: null,
  });

  let answerState = "";

  if (answer.correntAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.correntAnswer) {
    answerState = "answered";
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      correntAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        correntAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      setTimeout(() => {
        onAnswer(answer);
      }, 2000);
    }, 1000);
  }

  return (
    <div id="question">
      <ProgressBar timeout={10000} onTimeout={onSkip} />
      <h2> {QUESTIONS[index].text}</h2>
      <Answers
        answerState={answerState}
        answers={QUESTIONS[index].answers}
        onAnswer={handleSelectAnswer}
        selectAnswer={answer.correntAnswer}
      />
    </div>
  );
}
