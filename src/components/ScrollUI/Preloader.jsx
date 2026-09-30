import { useEffect, useState } from "react";

function Preloader() {
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const finish = () => setTimeout(() => setDone(true), 350);
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const safety = setTimeout(() => setDone(true), 3000);
    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 800);
    return () => clearTimeout(t);
  }, [done]);

  if (gone) return null;
  return (
    <div className={`preloader ${done ? "done" : ""}`} aria-hidden="true">
      <div className="preloader-logo">
        {"VILLA.".split("").map((ch, i) => (
          <span key={i} style={{ "--i": i }}>
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Preloader;
