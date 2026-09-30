/* eslint-disable react/prop-types */
import "./SectionTitle.css";

function SectionTitle({ title, center = false, light = false }) {
  return (
    <p
      className={`title reveal ${center ? "center" : ""} ${light ? "light" : ""}`}
    >
      <span className="title-bar" />
      {title}
    </p>
  );
}

export default SectionTitle;
