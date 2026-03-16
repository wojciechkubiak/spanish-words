import cx from "classnames";
import { useMemo, useState } from "react";

const OtherQuiz = ({ questions }: { questions: Record<string, string> }) => {
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const options = useMemo(() => {
    const entries = Object.entries(questions);
    const shuffled = [...entries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [questions, questionIndex]);

  const correctOption = useMemo(() => {
    return options[Math.floor(Math.random() * options.length)];
  }, [options]);

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      <h1 className="text-center min-w-40 text-5xl font-bold border-b border-neutral-300 pb-2 mb-4">
        {correctOption[0]}
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        {options?.map(([label, value]) => {
          const isCorrectAnswer = value === correctOption[1];

          return (
            <button
              className={cx(
                "flex flex-col items-center justify-center bg-neutral-200 w-min min-w-80 text-xl px-4 py-2 rounded-md",
                {
                  "hover:cursor-pointer": !selectedOption,
                  "cursor-not-allowed": selectedOption,
                  "text-red-700": selectedOption === value && !isCorrectAnswer,
                  "text-green-600": selectedOption === value && isCorrectAnswer,
                }
              )}
              onClick={() => {
                setIsNextButtonDisabled(false);
                setSelectedOption(value);
              }}
              disabled={selectedOption !== null}
              key={label}
            >
              <span>{value}</span>
              {selectedOption && (
                <span className="text-sm text-neutral-500">
                  ({selectedOption ? label : ""})
                </span>
              )}
            </button>
          );
        })}

        <button
          className="bg-neutral-200 w-40 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer transition-all text-lg duration-300 px-4 py-2 rounded-md mt-6"
          disabled={isNextButtonDisabled}
          onClick={() => {
            setSelectedOption(null);
            setIsNextButtonDisabled(true);
            setQuestionIndex(questionIndex + 1);
          }}
        >
          Dalej
        </button>
      </div>
    </div>
  );
};

export default OtherQuiz;
