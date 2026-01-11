import { useState } from "react";
import type { Question } from "../../Utilities/Services/types.ts";
import Image from "../Image/Image.tsx";

interface QuestionCardProps {
  question: Question | null;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [loaded, setLoaded] = useState(false);

  if (!question) return null;

  return (
    <div className="w-full h-[400px] col-span-1 rounded-xl dark:bg-[#050C1D] flex items-center justify-center relative overflow-hidden">
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-700/40 rounded-xl" />
      )}

      {question.image_url ? (
        <img
          src={question.image_url}
          alt="Savol rasmi"
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`rounded-lg object-contain transition-opacity duration-500
            ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <Image name="cobalt" className="rounded-lg object-contain" />
      )}
    </div>
  );
};

export default QuestionCard;
