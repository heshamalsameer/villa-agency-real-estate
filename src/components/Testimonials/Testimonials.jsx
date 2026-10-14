import { useCallback, useEffect, useRef, useState } from "react";
import "./Testimonials.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { RiDoubleQuotesL } from "react-icons/ri";

const items = [
  { name: "Sarah Mitchell", role: "Bought a villa in Miami", text: "From the first call to the final signature everything was smooth. Our agent found us a villa that ticked every box — and a few we didn't know we had." },
  { name: "Omar Haddad", role: "Penthouse owner", text: "The video tours saved us weeks. We shortlisted three homes online, visited in one afternoon and closed within the month. Outstanding service." },
  { name: "Emily Carter", role: "First-time buyer", text: "As first-time buyers we had a hundred questions. The team answered every single one with patience and made the financing part feel simple." },
  { name: "Daniel Brooks", role: "Property investor", text: "Transparent fees, verified listings and honest advice. I've bought two apartments through Villa Agency and I'll be back for the third." },
  { name: "Lina Farouk", role: "Relocated from Toronto", text: "Moving countries is stressful, but they handled viewings remotely and even arranged the utilities. We walked into a home that was ready." },
];

function Testimonials() {
  const track = useRef(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);
  const [hover, setHover] = useState(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.offsetWidth + 24 : el.clientWidth;
    const perView = Math.max(1, Math.round(el.clientWidth / step));
    setPages(Math.max(1, items.length - perView + 1));
    setPage(Math.round(el.scrollLeft / step));
  }, []);

  useEffect(() => {
    measure();
    const el = track.current;
    el.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      el.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const goTo = useCallback((i) => {
    const el = track.current;
    const card = el.firstElementChild;
    const step = card.offsetWidth + 24;
    el.scrollTo({ left: i * step, behavior: "smooth" });
  }, []);

  const next = useCallback(
    () => goTo(page + 1 >= pages ? 0 : page + 1),
    [page, pages, goTo]
  );
  const prev = () => goTo(page - 1 < 0 ? pages - 1 : page - 1);

  useEffect(() => {
    if (hover) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next, hover]);

  return (
    <section className="section testimonials">
      <div className="wrap">
        <div className="t-head">
          <div>
            <SectionTitle title="Testimonials" />
            <h2 className="h-display reveal" style={{ "--d": "80ms" }}>
              What Our <em>Clients</em> Say
            </h2>
          </div>
          <div className="t-arrows reveal" style={{ "--d": "150ms" }}>
            <button onClick={prev} aria-label="Previous testimonial">
              <IoIosArrowBack />
            </button>
            <button onClick={next} aria-label="Next testimonial">
              <IoIosArrowForward />
            </button>
          </div>
        </div>

        <div
          className="reveal"
          style={{ "--d": "200ms" }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="t-track" ref={track}>
            {items.map((t, i) => (
              <figure key={t.name} className={`t-card ${i === page ? "current" : ""}`}>
                <RiDoubleQuotesL className="t-quote" />
                <div className="t-stars" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <IoStar key={k} />
                  ))}
                </div>
                <blockquote>{t.text}</blockquote>
                <figcaption>
                  <span className="t-avatar">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="t-dots">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                className={i === page ? "on" : ""}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
