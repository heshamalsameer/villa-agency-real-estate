import "./Schedule.css";
import { AiFillSchedule } from "react-icons/ai";

function Schedule({ onClick, className = "" }) {
  return (
    <a href="#contact" className={`btn Schedule ${className}`} onClick={onClick}>
      <span className="btn-ic">
        <AiFillSchedule size={18} />
      </span>
      Schedule a visit
    </a>
  );
}

export default Schedule;
