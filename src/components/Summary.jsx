import React from "react";
import compeletedLogo from "../assets/quiz-complete.png";
import QUESTION from "../questions.js";
import Questions from "./Questions.jsx";

export default function Summary({ userAnswers }) {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTION[index].answers[0],
  );

  const sharedSkippedAnswers = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100,
  );

  const sharedCorrectAnswers = Math.round(
    (correctAnswers.length / userAnswers.length) * 100,
  );

  const sharedIncorrectAnswers =
    100 - sharedCorrectAnswers + sharedSkippedAnswers;

  return (
    <div id="summary">
      <img src={compeletedLogo} alt="logo of the web page" />
      <h2>quiz compeleted</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{sharedSkippedAnswers}%</span>
          <span className="text">skipped Answers</span>
        </p>
        <p>
          <span className="number">{sharedCorrectAnswers}%</span>
          <span className="text">correct Answers</span>
        </p>
        <p>
          <span className="number">{sharedIncorrectAnswers}%</span>
          <span className="text">wrong Answers</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer ";

          if (answer === QUESTION[index].answers[0]) {
            cssClass += "correct";
          } else if (answer === null) {
            cssClass += "skipped";
          } else {
            cssClass += "wrong";
          }
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTION[index].text}</p>
              <p className={cssClass}>{answer ?? "skipped"}</p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
