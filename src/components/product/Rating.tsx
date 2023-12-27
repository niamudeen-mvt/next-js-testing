import { FaStar } from "react-icons/fa";

const Rating = ({ rating = 5 }: { rating?: number }) => {
  return (
    <div className="flex gap-x-1">
      {Array.from({ length: rating }).map((_, i) => {
        return <FaStar key={i} className="text-yellow-400" />;
      })}
    </div>
  );
};

export default Rating;
