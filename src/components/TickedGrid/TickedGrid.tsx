import { useEffect, useState } from "react";
import { TicketCardItem } from "../TicketCard/TicketCard";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

type TicketCard = {
  number: number;
  question_count: number;
  title: string;
};

type TicketsResponse = {
  tickets: TicketCard[];
};

export const TicketGrid = () => {
  const [tickets, setTickets] = useState<TicketCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://imtihongatayyorlov.pythonanywhere.com/tests/tickets/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Tickets not found");

        const data: TicketsResponse = await res.json();
        setTickets(data.tickets);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div
        style={{ height: "calc(100vh - 120px)" }}
        className="bg-white dark:bg-[#0B142D] flex items-center justify-center rounded-xl p-6 shadow"
      >
        <BoxLoader />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {tickets.map((item) => (
        <TicketCardItem key={item.number} item={item} />
      ))}
    </div>
  );
};
