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

  return (
    <div className="flex flex-col items-center justify-center gap-2 pt-10">
      <h1 className="text-center min-w-40 text-5xl font-bold border-b border-neutral-300 pb-2 mb-4">
        {correctOption[0]}
      </h1>
      <div className="flex flex-col items-center justify-center gap-6">
        {options?.map(([_label, value]) => (
          <button
            className={cx(
              "w-min min-w-80 hover:cursor-pointer text-xl px-4 py-2 rounded-md",
              {
                "bg-neutral-200": selectedOption !== value.spanish,
                "cursor-not-allowed": selectedOption,
                "bg-red-700 text-white":
                  selectedOption === value.spanish &&
                  selectedOption !== correctOption[1].spanish,
                "bg-green-600 text-white":
                  selectedOption === value.spanish &&
                  selectedOption === correctOption[1].spanish,
              }
            )}
            onClick={() => {
              setIsNextButtonDisabled(false);
              setSelectedOption(value.spanish);
            }}
            disabled={selectedOption !== null}
            key={value.spanish}
          >
            {value.spanish}
          </button>
        ))}

        <div
          className={cx(
            "bg-neutral-100 p-2 rounded-md grid grid-cols-2 gap-2 mb-4",
            {
              "opacity-50": !selectedOption,
            }
          )}
        >
          {Object.entries(correctOption[1].forms).map(([key, value]) => (
            <div
              className="bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer transition-all text-lg duration-300 px-4 py-2 rounded-md"
              key={key}
            >
              {key}: {selectedOption ? value : ""}
            </div>
          ))}
        </div>

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

export default Quiz;
