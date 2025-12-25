import { FileText } from "lucide-react";
import type { TicketCard } from "../../pages/Data";

interface Props {
  item: TicketCard;
}

export const TicketCardItem: React.FC<Props> = ({ item }) => {
  return (
    <div className="relative rounded-xl border-2 border-dashed border-blue-400 bg-white p-4 hover:shadow-md transition">
      {/* Badge */}
      <span className="inline-block rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
        {item.category}
      </span>

      {/* Title */}
      <h3 className="mt-4 text-center text-xl font-semibold italic">
        {item.title}
      </h3>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-indigo-500" />
          <span>{item.testsCount} test</span>
        </div>
        <span>{item.year}</span>
      </div>
    </div>
  );
};
