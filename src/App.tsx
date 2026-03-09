import { useState } from "react";
import { SECTIONS } from "./consts";
import Intro from "./containers/Intro";
import Quiz from "./containers/Quiz";
import Results from "./containers/Results";

const App = () => {
  const [section, setSection] = useState<string>(SECTIONS[0]);
  const [questions, setQuestions] = useState<Record<string, string>>({});
  const [successRate, setSuccessRate] = useState<number>(0);

  return (
    <div className="h-screen w-screen bg-neutral-100 text-neutral-800 flex flex-col items-center justify-center">
      {section === SECTIONS[0] && (
        <Intro onConfirm={() => setSection(SECTIONS[1])} />
      )}
      {section === SECTIONS[1] && <Quiz questions={questions} />}
      {section === SECTIONS[2] && <Results successRate={successRate} />}
    </div>
  );
};

export default App;
