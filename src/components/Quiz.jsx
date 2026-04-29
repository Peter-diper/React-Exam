import { useCallback, useState } from "react";
import compeletedLogo from "../assets/quiz-complete.png";

import QUESTIONS from "../questions.js";
import ProgressBar from "./ProgressBar.jsx";
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
        <img src={compeletedLogo} alt="" />
        <h2>quiz compeleted</h2>
      </div>
    );
  }

  const suffledQuestion = [...QUESTIONS[currentQuestionIndex].answers];
  suffledQuestion.sort(() => Math.random() - 0.5);

  return (
    <div id="quiz">
      <div id="question">
        <ProgressBar
          key={currentQuestionIndex}
          timeout={10000}
          onTimeout={handleTimeout}
        />
        <h2> {QUESTIONS[currentQuestionIndex].text}</h2>
        <ul id="answers">
          {suffledQuestion.map((answer) => (
            <li key={answer} className="answer">
              <button
                onClick={() => {
                  handleUserAnswer(answer);
                }}
              >
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
