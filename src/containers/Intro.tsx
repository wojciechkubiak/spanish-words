import { CATEGORIES } from "../consts";
import Lottie from "lottie-react";
import animationData from "../assets/intro.json";

const Intro = ({ setMode }: { setMode: (mode: number) => void }) => {
  return (
    <div className="text-neutral-800 flex flex-col items-center justify-center gap-4">
      <Lottie animationData={animationData} loop={true} />
      <h1 className="text-2xl font-bold border-b border-neutral-300 pb-2">
        Zacznij naukę:
      </h1>
      <div className="flex flex-col gap-6">
        {CATEGORIES.map((category, index) => (
          <button
            className="bg-neutral-200 hover:bg-red-700/80 hover:text-white hover:cursor-pointer transition-all text-xl duration-300 px-4 py-2 rounded-md"
            onClick={() => setMode(index)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Intro;
