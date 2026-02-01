import { useState } from "react";
import type { Question } from "../../Utilities/Services/types.ts";
import Image from "../Image/Image.tsx";
import ImageModal from "../ImageModal/ImageModal";

interface QuestionCardProps {
  question: Question | null;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  if (!question) return null;

  return (
    <>
      <div className="w-full col-span-1 rounded-xl relative overflow-hidden cursor-zoom-in">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-slate-200 rounded-xl" />
        )}

        {question.image_url ? (
          <img
            src={question.image_url}
            alt="Savol rasmi"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onClick={() => setOpen(true)}
            className={`rounded-lg object-contain transition-opacity duration-500
              ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        ) : (
          <Image name="cobalt" className="rounded-lg object-contain" />
        )}
      </div>

      {/* Modal */}
      {question.image_url && (
        <ImageModal
          src={question.image_url}
          alt="Savol rasmi"
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default QuestionCard;
