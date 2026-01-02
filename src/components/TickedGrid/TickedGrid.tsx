import { useEffect, useState } from "react";
import { TicketCardItem } from "../TicketCard/TicketCard";

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
    return <p className="p-4">Yuklanmoqda...</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {tickets.map((item) => (
        <TicketCardItem key={item.number} item={item} />
      ))}
    </div>
  );
};
