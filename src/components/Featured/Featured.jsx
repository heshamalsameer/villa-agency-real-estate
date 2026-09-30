import { useState } from "react";
import "./Featured.css";
import Card from "./Card/Card";
import SectionTitle from "../SectionTitle/SectionTitle";
import { IoAdd } from "react-icons/io5";

const faqs = [
  {
    q: "Best useful links?",
    a: "Browse our curated listings, virtual tours and neighbourhood guides — everything you need to compare homes side by side before you ever book a visit.",
  },
  {
    q: "How does this work?",
    a: "Pick a property, schedule a visit online and one of our agents will walk you through the home, the paperwork and financing options in a single appointment.",
  },
  {
    q: "Why is Villa Agency the best?",
    a: "Twelve years of experience, verified listings only, transparent fees and a dedicated agent from first viewing until the keys are in your hand.",
  },
];

const infos = [
  { img: "/images/info-icon-01.png", title: "250 m²", more: "Total Flat Space" },
  { img: "/images/info-icon-02.png", title: "Contract", more: "Contract Ready" },
  { img: "/images/info-icon-03.png", title: "Payment", more: "Payment Process" },
  { img: "/images/info-icon-04.png", title: "Safety", more: "24/7 Under Control" },
];

function Featured() {
  const [open, setOpen] = useState(0);

  return (
    <section id="about" className="section">
      <div className="wrap featured">
        <div className="imgs reveal" data-anim="left">
          <div className="img-frame">
            <img src="/images/featured.jpg" alt="Apartment with sea view" loading="lazy" />
          </div>
          <div className="img-badge">
            <img src="/images/featured-icon.png" alt="" />
          </div>
          <div className="img-tag">
            <strong>12+</strong>
            <span>Years of trust</span>
          </div>
        </div>

        <div className="featured-text">
          <SectionTitle title="Featured" />
          <h2 className="h-display reveal" style={{ "--d": "80ms" }}>
            Best Apartment <br />& <em>Sea View</em>
          </h2>
          <div className="useful">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className="reveal"
                style={{ "--d": `${150 + i * 90}ms` }}
              >
              <div className={`acc ${open === i ? "open" : ""}`}>
                <button
                  className="acc-head"
                  onClick={() => setOpen(open === i ? -1 : i)}
                  aria-expanded={open === i}
                >
                  {f.q}
                  <span className="acc-ic">
                    <IoAdd />
                  </span>
                </button>
                <div className="acc-body">
                  <div>
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
              </div>
            ))}
          </div>
        </div>

        <div className="infCard reveal" data-anim="right">
          {infos.map((c, i) => (
            <Card key={c.title} {...c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Featured;
