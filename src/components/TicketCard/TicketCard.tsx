import { FileText, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Props {
  item: {
    number: number;
    question_count: number;
    title: string;
  };
}

export const TicketCardItem: React.FC<Props> = ({ item }) => {
  const [locked] = useState(false);
  return (
    <Link
      to={`/test/ticket/${item.number}`}
      className={`relative rounded-xl border-2 border-dashed p-4 transition
        ${
          locked
            ? "border-blue-300 bg-white/70"
            : "border-blue-400 bg-white hover:shadow-md"
        }
      `}
    >
      {/* Overlay (LOCK holati) */}
      {locked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white/80 backdrop-blur-[1px]">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Lock className="h-6 w-6 text-gray-600" />
          </div>
          <p className="mt-3 text-sm font-medium text-gray-600">
            Premium tarifni sotib oling
          </p>
        </div>
      )}

      {/* Badge */}
      {/* <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
        {item.category}
      </span> */}

      {/* Title */}
      <h3
        className={`mt-4 text-center text-xl font-semibold italic ${
          locked ? "text-gray-400" : "text-black"
        }`}
      >
        {item.title}
      </h3>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" />
          <span>{item.question_count} test</span>
        </div>
        <span>2026</span>
      </div>
    </Link>
  );
};
