import { useState } from "react";
import { CATEGORIES, NUM_QUESTIONS } from "../consts";
import Lottie from "lottie-react";
import cx from "classnames";
import animationData from "../assets/intro.json";

const Intro = ({ onConfirm }: { onConfirm: () => void }) => {
  const [selected, setSelected] = useState<string[]>(["czasowniki"]);

  const toggle = (category: string) => {
    setSelected((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="text-neutral-800 flex flex-col items-center justify-center gap-8">
      <Lottie animationData={animationData} loop={true} />
      <div className="flex flex-col gap-4">
        {CATEGORIES.map((category) => (
          <button
            className={cx(
              "bg-neutral-200 hover:bg-red-700/80 hover:text-white hover:cursor-pointer transition-all duration-300 px-4 py-2 rounded-md",
              {
                "bg-red-700 text-white": selected.includes(category),
              }
            )}
            onClick={() => toggle(category)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <select className="p-2 rounded-md border border-neutral-300">
        {NUM_QUESTIONS.map((num) => (
          <option value={num}>{num}</option>
        ))}
      </select>

      <button
        className="bg-[#ffc400] hover:bg-[#ffc400]/80 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-red-800 text-xl px-4 py-2 rounded-md"
        onClick={onConfirm}
        disabled={selected.length === 0}
      >
        Start
      </button>
    </div>
  );
};

export default Intro;
