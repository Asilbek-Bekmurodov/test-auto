import type { Prep20Question } from "../../Utilities/Services/startPrep20.ts";

interface QuestionCardProps {
  question: Prep20Question | null;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  if (!question) return null;

  return (
    <div className="w-[50%] col-span-1 bg-green-600 rounded-xl p-6 text-white flex items-center justify-center text-lg font-semibold">
      {/* Agar savol text bo‘lsa */}
      <img
       
        src={question.image_url}
        alt="Savol rasmi"
        className="w-[100%] rounded-lg"
      />
    </div>
  );
};

export default QuestionCard;
