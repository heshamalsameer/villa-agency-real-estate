import "./ViewCard.css";
import { useCountUp, useInView } from "../../hooks/useReveal";

function ViewCard({ number, string, delay = 0 }) {
  const [ref, inView] = useInView(0.5);
  const value = useCountUp(number, inView);

  return (
    <div ref={ref} className="reveal" style={{ "--d": `${delay}ms` }}>
      <div className="viewcard">
        <p className="number">
          {value}
          <sup>+</sup>
        </p>
        <p className="string">{string}</p>
      </div>
    </div>
  );
}

export default ViewCard;
