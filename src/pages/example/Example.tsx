import { TicketGrid } from "../../components/TickedGrid/TickedGrid";
import PublicHeader from "../public/components/PublicHeader/PublicHeader";

const Example = () => {
  return (
    <div>
      <PublicHeader />
      <div className="container mx-auto">
        <TicketGrid />
      </div>
    </div>
  );
};
export default Example;
