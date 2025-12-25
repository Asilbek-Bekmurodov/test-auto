import useLocalStorage from "use-local-storage";
import Header from "../Header/Header";
import { useEffect } from "react";
import QuestionCard from "../QuestionCard/QuestionCard";
import AnswerList from "../AnswerList/AnswerList";
import QuestionNavigation from "../QuestioinNavigation/QuestionNavigation";

const Test = () => {
  const preference: boolean = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const [isDark, setIsDark] = useLocalStorage<boolean>("isdark", preference);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  return (
    <>
      <Header isDark={isDark} setIsDark={setIsDark} />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-3 gap-6">
            <QuestionCard />
            <AnswerList />
          </div>

          <QuestionNavigation />
        </div>
      </div>
    </>
  );
};

export default Test;
