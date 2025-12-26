import type { TicketCard } from "../../pages/Data";
import { TicketCardItem } from "../TicketCard/TicketCard";

const data: TicketCard[] = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  category: "Avto test",
  title: i === 0 ? "Bilet-1" : "Bilet-2",
  testsCount: 20,
  year: "Avtotest 2025",
  locked: i !== 0,
  path: i === 0 ? "/test" : "",
}));

export const TicketGrid = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {data.map((item) => (
        <TicketCardItem key={item.id} item={item} />
      ))}
    </div>
  );
};
