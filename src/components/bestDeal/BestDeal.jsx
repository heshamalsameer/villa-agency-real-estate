import { useLayoutEffect, useRef, useState } from "react";
import { GrFormSchedule } from "react-icons/gr";
import styles from "./BestDeal.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";

const deals = [
  {
    tab: "Apartment",
    img: "/images/deal-01.jpg",
    specs: [
      ["Total Flat Space", "185 m²"],
      ["Floor number", "26th"],
      ["Number of rooms", "4"],
      ["Parking available", "Yes"],
      ["Payment process", "Bank"],
    ],
    title: "Extra Info About Property",
    text: [
      "A bright corner apartment with floor-to-ceiling windows, an open kitchen and a wrap-around balcony overlooking the bay.",
      "Residents enjoy a rooftop pool, 24/7 concierge and a private gym — minutes from the beach and the city centre.",
    ],
  },
  {
    tab: "Villa House",
    img: "/images/property-02.jpg",
    specs: [
      ["Total Flat Space", "250 m²"],
      ["Floor number", "3"],
      ["Number of rooms", "5"],
      ["Parking available", "Yes"],
      ["Payment process", "Bank"],
    ],
    title: "Detail Info About Villa",
    text: [
      "A family villa with a landscaped garden, heated pool and a double-height living room flooded with natural light.",
      "Smart-home controls, solar roof panels and a private driveway make everyday living effortless and efficient.",
    ],
  },
  {
    tab: "Penthouse",
    img: "/images/property-05.jpg",
    specs: [
      ["Total Flat Space", "320 m²"],
      ["Floor number", "34th"],
      ["Number of rooms", "6"],
      ["Parking available", "Yes"],
      ["Payment process", "Bank"],
    ],
    title: "Extra Info About Penthouse",
    text: [
      "A full-floor penthouse with a private elevator, panoramic terrace and uninterrupted skyline views on every side.",
      "Includes a wine cellar, private spa room and two reserved parking spots in the secured basement.",
    ],
  },
];

const BestDeal = () => {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  const d = deals[active];

  useLayoutEffect(() => {
    const update = () => {
      const el = tabsRef.current[active];
      if (el) setInd({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <section id="deals" className={`section ${styles.bestDeal}`}>
      <div className="wrap">
        <div className={styles.header}>
          <div>
            <SectionTitle title="Best Deal" />
            <h2 className="h-display reveal" style={{ "--d": "80ms" }}>
              Find Your Best <em>Deal</em> Right Now!
            </h2>
          </div>
          <div className="reveal" style={{ "--d": "160ms" }}>
            <div className={styles.tabs} role="tablist">
              <span
                className={styles.pill}
                style={{ transform: `translateX(${ind.left}px)`, width: ind.width }}
              />
              {deals.map((x, i) => (
                <button
                  key={x.tab}
                  ref={(el) => (tabsRef.current[i] = el)}
                  role="tab"
                  aria-selected={active === i}
                  className={active === i ? styles.tabActive : ""}
                  onClick={() => setActive(i)}
                >
                  {x.tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={`reveal`} style={{ "--d": "200ms" }}>
          <div className={styles.midlle} key={active}>
            <div className={styles.card}>
              {d.specs.map(([k, v], i) => (
                <div key={k} className={styles.row} style={{ "--i": i }}>
                  <p>{k}</p>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className={styles.imgBox}>
              <img src={d.img} alt={d.tab} loading="lazy" />
            </div>
            <div className={styles.description}>
              <h4>{d.title}</h4>
              {d.text.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
              <a href="#contact" className="btn">
                <span className="btn-ic">
                  <GrFormSchedule className={styles.grIcon} />
                </span>
                Schedule a visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestDeal;
