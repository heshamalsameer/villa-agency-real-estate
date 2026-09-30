/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Properties.module.css";
import { IoBedOutline, IoLocationOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { LuBath, LuRuler, LuCar, LuBuilding2 } from "react-icons/lu";
import { IoArrowForward } from "react-icons/io5";

export const Card = ({ item, index = 0 }) => {
  const { img, title, number, bedrooms, area, parking, bathrooms, floor, street } = item;
  const [liked, setLiked] = useState(false);

  const specs = [
    { icon: IoBedOutline, label: "Bedrooms", value: bedrooms },
    { icon: LuBath, label: "Bathrooms", value: bathrooms },
    { icon: LuRuler, label: "Area", value: area },
    { icon: LuBuilding2, label: "Floor", value: floor },
    { icon: LuCar, label: "Parking", value: parking },
  ];

  return (
    <article className={`reveal ${styles.cardWrap}`} style={{ "--d": `${(index % 3) * 110}ms` }}>
      <div className={styles.card}>
        <div className={styles.media}>
          <img src={img} alt={title} loading="lazy" />
          <span className={styles.cardtitle}>{title}</span>
          <button
            className={`${styles.like} ${liked ? styles.liked : ""}`}
            onClick={() => setLiked((l) => !l)}
            aria-label={liked ? "Remove from favourites" : "Add to favourites"}
            aria-pressed={liked}
          >
            {liked ? <IoHeart /> : <IoHeartOutline />}
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.salury}>{number}</div>
          <p className={styles.street}>
            <IoLocationOutline /> {street}
          </p>

          <ul className={styles.areas}>
            {specs.map(({ icon: Icon, label, value }) => (
              <li key={label} title={label}>
                <Icon />
                <span>{value}</span>
                <small>{label}</small>
              </li>
            ))}
          </ul>

          <a href="#contact" className={styles.cta}>
            Schedule a visit
            <span>
              <IoArrowForward />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
};
