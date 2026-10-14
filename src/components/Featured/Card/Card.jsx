import "./Card.css";

function Card({ img, title, more }) {
  return (
    <div className="inform">
      <div className="inform-ic">
        <img src={img} alt="" />
      </div>
      <div>
        <p className="inform-title">{title}</p>
        <p className="inform-more">{more}</p>
      </div>
    </div>
  );
}

export default Card;
