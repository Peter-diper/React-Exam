import { useRef } from "react";

export default function Answers({
  selectAnswer,
  answerState,
  onAnswer,
  answers,
}) {
  const shuffledAnswerd = useRef();

  if (!shuffledAnswerd.current) {
    shuffledAnswerd.current = [...answers];
    shuffledAnswerd.current.sort(() => Math.random() - 0.5);
  }
  return (
    <ul id="answers">
      {shuffledAnswerd.current.map((answer) => {
        let cssClass = "";
        const isSelected = selectAnswer === answer;

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => {
                onAnswer(answer);
              }}
              className={cssClass}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
