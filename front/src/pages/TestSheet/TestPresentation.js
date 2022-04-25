import React from "react";

import TestQuestion from "./TestQuestion";
import TestAnswerBtn from "./TestAnswerBtn";
import TestContent from "./TestContent";

export default function TestPresentation({
  test,
  onSubmit,
  selectedAnswer,
  handleClickAnswer,
}) {
  return (
    <div>
      {test && (
        <>
          <TestQuestion id={test.id} question={test.question} />
          <TestContent content={test.content} />
          <TestAnswerBtn
            testId={test.id}
            choices={test.choices}
            handleClickAnswer={handleClickAnswer}
            selectedAnswer={selectedAnswer}
          />
        </>
      )}
    </div>
  );
}
