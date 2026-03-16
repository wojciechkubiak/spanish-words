import { useMemo, useState } from "react";
import Intro from "./containers/Intro";
import VerbsQuiz from "./containers/VerbsQuiz";
import verbs from "./data/verbs.json";
import adjectives from "./data/adjectives.json";
import nouns from "./data/nouns.json";
import OtherQuiz from "./containers/OtherQuiz";

const App = () => {
  const [isIntro, setIsIntro] = useState<boolean>(true);
  const [mode, setMode] = useState<number | null>(null);

  const questions = useMemo((): Record<
    string,
    { spanish: string; forms: Record<string, string> } | string
  > => {
    console.log({ mode });
    if (mode === 0) return Object.fromEntries(Object.entries(verbs));
    if (mode === 1) return Object.fromEntries(Object.entries(adjectives));
    if (mode === 2) return Object.fromEntries(Object.entries(nouns));

    return {};
  }, [mode]);

  console.log({ questions });

  return (
    <div className="h-screen w-screen text-neutral-800">
      {isIntro ? (
        <Intro
          setMode={(mode) => {
            console.log({ mode });
            setMode(mode);
            setIsIntro(false);
          }}
        />
      ) : (
        <div>
          {mode === 0 && (
            <VerbsQuiz
              questions={
                questions as Record<
                  string,
                  { spanish: string; forms: Record<string, string> }
                >
              }
            />
          )}
          {(mode === 1 || mode === 2) && (
            <OtherQuiz questions={questions as Record<string, string>} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
