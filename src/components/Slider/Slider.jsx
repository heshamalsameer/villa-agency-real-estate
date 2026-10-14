import { useCallback, useEffect, useRef, useState } from "react";
import "./Slider.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoLocationSharp, IoArrowForward } from "react-icons/io5";

const slides = [
  {
    img: "/images/banner-01.jpg",
    city: "Toronto",
    country: "Canada",
    title: ["Hurry! Get the", "best villa for you"],
    text: "Handpicked luxury homes with private pools, ocean views and smart living built in.",
  },
  {
    img: "/images/banner-02.jpg",
    city: "Melbourne",
    country: "Australia",
    title: ["Be quick! Get the", "best villa in town"],
    text: "Modern architecture, open-plan interiors and gardens designed for slow weekends.",
  },
  {
    img: "/images/banner-03.jpg",
    city: "Miami",
    country: "South Florida",
    title: ["Act now! Get the", "highest level penthouse"],
    text: "Skyline penthouses with panoramic terraces, concierge service and private elevators.",
  },
];

const DURATION = 6500;

function Slider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ x: 0, active: false });
  const n = slides.length;

  const go = useCallback((i) => setCurrent(((i % n) + n) % n), [n]);
  const next = useCallback(() => go(current + 1), [current, go]);
  const prev = useCallback(() => go(current - 1), [current, go]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(next, DURATION);
    return () => clearTimeout(t);
  }, [current, paused, next]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  };

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, active: true };
  };
  const onPointerUp = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    drag.current.active = false;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  return (
    <section
      id="home"
      className={`slider ${paused ? "is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Featured properties"
    >
      <div className="slider-container">
        {slides.map((s, i) => (
          <div
            key={s.img}
            className={`slide ${i === current ? "active" : ""}`}
            aria-hidden={i !== current}
          >
            <img
              src={s.img}
              alt={`${s.city} property`}
              draggable="false"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="content-slider wrap">
              <p className="slide-loc">
                <IoLocationSharp /> {s.city}, <span>{s.country}</span>
              </p>
              <h1>
                {s.title.map((line, k) => (
                  <span className="line" key={k}>
                    <span style={{ "--k": k }}>{line}</span>
                  </span>
                ))}
              </h1>
              <p className="slide-text">{s.text}</p>
              <div className="slide-cta">
                <a href="#properties" className="btn">
                  <span className="btn-ic">
                    <IoArrowForward />
                  </span>
                  Explore properties
                </a>
                <a href="#contact" className="ghost-link">
                  Talk to an agent
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="slider-ui wrap">
        <div className="counter">
          <strong key={current}>0{current + 1}</strong>
          <span>/ 0{n}</span>
        </div>
        <div className="dots" role="tablist">
          {slides.map((s, i) => (
            <button
              key={s.img}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              className={`dot ${i === current ? "active" : ""}`}
              onClick={() => go(i)}
            >
              <span style={{ animationDuration: `${DURATION}ms` }} />
            </button>
          ))}
        </div>
        <div className="arrow">
          <button onClick={prev} aria-label="Previous slide">
            <IoIosArrowBack size={22} />
          </button>
          <button onClick={next} aria-label="Next slide">
            <IoIosArrowForward size={22} />
          </button>
        </div>
      </div>

      <a href="#about" className="scroll-hint" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}

export default Slider;
