import { useEffect, useState } from "react";
import { TicketCardItem } from "../TicketCard/TicketCard";
import BoxLoader from "../Loaders/BoxLoader/BoxLoader";

type TopicCard = {
  slug: string;
  question_count: number;
  title: string;
};

type TopicResponce = {
  topics: TopicCard[];
};

export const TopicGrid = () => {
  const [tickets, setTickets] = useState<TopicCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://imtihongatayyorlov.pythonanywhere.com/tests/topics/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Tickets not found");

        const data: TopicResponce = await res.json();
        setTickets(data.topics);
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
        <TicketCardItem key={item.slug} item={item} />
      ))}
    </div>
  );
};
