import { useMemo, useState } from "react";
import Intro from "./containers/Intro";
import Quiz from "./containers/Quiz";
import verbs from "./data/verbs.json";

const App = () => {
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [mode, setMode] = useState<number | null>(null);

  const questions = useMemo(() => {
    if (mode === 0) return Object.fromEntries(Object.entries(verbs));

    return {};
  }, [mode]);

  console.log({ questions });
  return (
    <div className="h-screen w-screen text-neutral-800">
      {isIntro ? (
        <Intro
          setMode={(mode) => {
            setMode(mode);
            setIsIntro(false);
          }}
        />
      ) : (
        <Quiz questions={questions} />
      )}
    </div>
  );
};

export default App;
