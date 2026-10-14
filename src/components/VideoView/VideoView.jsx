import { useEffect, useState } from "react";
import "./VideoVIew.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import ViewCard from "../ViewCard/ViewCard";
import { IoPlay, IoClose } from "react-icons/io5";

const VIDEO_ID = "ScMzIvxBSi4";

function VideoView() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="view">
      <div className="view-bg" aria-hidden="true" />
      <div className="wrap content">
        <div className="viewtitle">
          <SectionTitle title="Video View" center light />
          <h2 className="h-display reveal" style={{ "--d": "100ms" }}>
            Get Closer View <br />& <em>Different Feeling</em>
          </h2>
        </div>

        <div className="video-wrap reveal" data-anim="zoom" style={{ "--d": "150ms" }}>
          <div className="video-card">
            <img
              className="videoFrame"
              src="/images/video-frame.jpg"
              alt="Property video tour"
              loading="lazy"
            />
            <button
              className="play"
              onClick={() => setOpen(true)}
              aria-label="Play video tour"
            >
              <IoPlay />
            </button>
          </div>
        </div>

        <div className="viewcards">
          <ViewCard number={34} string="Buildings Finished Now" delay={0} />
          <ViewCard number={12} string="Years Experience" delay={120} />
          <ViewCard number={24} string="Awards Won 2023" delay={240} />
        </div>
      </div>

      {open && (
        <div className="modal" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(false)} aria-label="Close video">
              <IoClose />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title="Property tour"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default VideoView;
