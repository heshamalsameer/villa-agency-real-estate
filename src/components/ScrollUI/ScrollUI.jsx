import { IoArrowUp } from "react-icons/io5";
import { useScrollY } from "../../hooks/useReveal";
import "./ScrollUI.css";

const R = 22;
const C = 2 * Math.PI * R;

function ScrollUI() {
  const y = useScrollY();
  const max =
    typeof document !== "undefined"
      ? document.documentElement.scrollHeight - window.innerHeight
      : 1;
  const p = max > 0 ? Math.min(y / max, 1) : 0;

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${p})` }} />
      <button
        className={`to-top ${y > 600 ? "show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <svg viewBox="0 0 50 50" aria-hidden="true">
          <circle cx="25" cy="25" r={R} className="track" />
          <circle
            cx="25"
            cy="25"
            r={R}
            className="bar"
            style={{ strokeDasharray: C, strokeDashoffset: C * (1 - p) }}
          />
        </svg>
        <IoArrowUp />
      </button>
    </>
  );
}

export default ScrollUI;
