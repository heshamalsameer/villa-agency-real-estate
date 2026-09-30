import { useMemo, useState } from "react";
import { Card } from "./Card";
import styles from "./Properties.module.css";
import { arry } from "../../utils";
import SectionTitle from "../SectionTitle/SectionTitle";

const Properties = () => {
  const filters = useMemo(
    () => ["All", ...Array.from(new Set(arry.map((p) => p.title)))],
    []
  );
  const [filter, setFilter] = useState("All");
  const list = filter === "All" ? arry : arry.filter((p) => p.title === filter);

  return (
    <section id="properties" className="section">
      <div className="wrap">
        <div className="section-head">
          <SectionTitle title="Properties" center />
          <h2 className="h-display reveal" style={{ "--d": "80ms" }}>
            We Provide The Best <em>Property</em> You Like
          </h2>
        </div>

        <div className={`reveal ${styles.filtersWrap}`} style={{ "--d": "140ms" }}>
          <div className={styles.filters}>
            {filters.map((f) => (
              <button
                key={f}
                className={filter === f ? styles.on : ""}
                onClick={() => setFilter(f)}
              >
                {f}
                <small>
                  {f === "All" ? arry.length : arry.filter((p) => p.title === f).length}
                </small>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.grid} key={filter}>
          {list.map((item, index) => (
            <Card key={item.street} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Properties;
