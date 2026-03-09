import cx from "classnames";
import { useMemo, useState } from "react";

const Quiz = ({
  questions,
}: {
  questions: Record<string, { spanish: string; forms: Record<string, string> }>;
}) => {
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

  console.log({ correctOption });
  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      <h1 className="text-center min-w-40 text-5xl font-bold border-b border-neutral-300 pb-2 mb-4">
        {correctOption[0]}
      </h1>
      <div className="flex flex-col items-center justify-center gap-4">
        {options?.map(([_label, value]) => {
          const isCorrectAnswer = value.spanish === correctOption[1].spanish;

          return (
            <button
              className={cx("w-min min-w-80 text-xl px-4 py-2 rounded-md", {
                "bg-neutral-200":
                  !selectedOption ||
                  (selectedOption !== value.spanish && !isCorrectAnswer),
                "hover:cursor-pointer": !selectedOption,
                "cursor-not-allowed text-white": selectedOption,
                "bg-red-700": selectedOption && !isCorrectAnswer,
                "bg-green-600": isCorrectAnswer,
              })}
              onClick={() => {
                setIsNextButtonDisabled(false);
                setSelectedOption(value.spanish);
              }}
              disabled={selectedOption !== null}
              key={value.spanish}
            >
              {value.spanish}
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

        <div
          className={cx(
            "bg-neutral-100 pb-2 rounded-md grid grid-cols-2 gap-2 mb-4",
            {
              "opacity-50": !selectedOption,
            }
          )}
        >
          {Object.entries(correctOption[1].forms).map(([key, value]) => (
            <div
              className="flex flex-col bg-neutral-200 disabled:opacity-50 text-lg duration-300 px-4 py-2 rounded-md"
              key={key}
            >
              <span className="text-sm">{key}:</span>
              <span className="text-md font-semibold">
                {selectedOption ? value : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
