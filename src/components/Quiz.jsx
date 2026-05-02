import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Questions from "./Questions.jsx";
import Summary from "./Summary.jsx";

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
    return <Summary userAnswers={userAnswers} />;
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
