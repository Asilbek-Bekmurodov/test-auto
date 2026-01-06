import type { Question } from "../../Utilities/Services/types.ts";
import Image from "../Image/Image.tsx";

interface QuestionCardProps {
  question: Question | null;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  if (!question) return null;

  console.log(question.image_url);

  return (
    <div className="w-full h-[400px] col-span-1 rounded-xl  text-white flex justify-center text-lg font-semibold dark:bg-[#050C1D]">
      {question.image_url === null ? (
        <Image
          name="cobalt"
          className="rounded-lg object-contain lg:object-cover"
        />
      ) : (
        <img
          src={question.image_url}
          alt="Savol rasmi"
          className="w-[100%] rounded-lg object-contain lg:object-cover"
        />
      )}
    </div>
  );
};

export default QuestionCard;
