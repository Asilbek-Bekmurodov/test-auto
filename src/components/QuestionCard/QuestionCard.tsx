import type { Prep20Question } from "../../Utilities/Services/startPrep20.ts";
import Image from "../Image/Image.tsx";

interface QuestionCardProps {
  question: Prep20Question | null;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  if (!question) return null;

  console.log(question.image_url);

  return (
    <div className="w-[50%] h-[400px] col-span-1 rounded-xl  text-white flex justify-center text-lg font-semibold">
      {question.image_url === null ? (
        <Image name="cobalt" className="rounded-lg" />
      ) : (
        <img
          src={question.image_url}
          alt="Savol rasmi"
          className="w-[100%] rounded-lg"
        />
      )}
    </div>
  );
};

export default QuestionCard;
