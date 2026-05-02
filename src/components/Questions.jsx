import ProgressBar from "./ProgressBar";
import Answers from "./Answers";
import QUESTIONS from "../questions.js";
import { useState } from "react";

export default function Questions({ onSkip, index, onAnswer }) {
  const [answer, setAnswer] = useState({
    correntAnswer: "",
    isCorrect: null,
  });

  let timer = 10000;

  if (answer.correntAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
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

  let answerState = "";

  if (answer.correntAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.correntAnswer) {
    answerState = "answered";
  }
  return (
    <div id="question">
      <ProgressBar
        key={timer}
        timeout={timer}
        onTimeout={answer.correntAnswer === "" ? onSkip : null}
        mode={answerState}
      />
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
