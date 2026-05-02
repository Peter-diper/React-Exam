import { useCallback, useState } from "react";
import compeletedLogo from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";
import Questions from "./Questions.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);

  const currentQuestionIndex = userAnswers.length;
  const handleUserAnswer = useCallback(function handleUserAnswer(answer) {
    setUserAnswers((prevAnswer) => [...prevAnswer, answer]);
  }, []);

  const handleTimeout = useCallback(
    function () {
      handleUserAnswer(null);
    },
    [handleUserAnswer],
  );

  const questionIsFinished = currentQuestionIndex === QUESTIONS.length;
  if (questionIsFinished) {
    return (
      <div id="summary">
        <img src={compeletedLogo} alt="logo of the web page" />
        <h2>quiz compeleted</h2>
      </div>
    );
  }

  return (
    <div id="quiz">
      <Questions
        key={currentQuestionIndex}
        index={currentQuestionIndex}
        onAnswer={handleUserAnswer}
        onSkip={handleTimeout}
      />
    </div>
  );
}
