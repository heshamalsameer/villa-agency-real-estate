import { useEffect, useState } from "react";
import "./App.css";
import Top from "./components/top/Top";
import NavBar from "./components/NavBar/NavBar";
import Slider from "./components/Slider/Slider";
import Featured from "./components/Featured/Featured";
import VideoView from "./components/VideoView/VideoView";
import BestDeal from "./components/bestDeal/BestDeal";
import Properties from "./components/properties/Properties";
import Testimonials from "./components/Testimonials/Testimonials";
import ContectUs from "./components/contect/ContectUs";
import Footer from "./components/footer/Footer";
import ScrollUI from "./components/ScrollUI/ScrollUI";
import Preloader from "./components/ScrollUI/Preloader";
import { useRevealAll } from "./hooks/useReveal";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem("villa-theme");
    if (saved) return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function App() {
  const [theme, setTheme] = useState(getInitialTheme);
  useRevealAll();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("villa-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="app">
      <Preloader />
      <ScrollUI />
      <Top />
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Slider />
        <Featured />
        <VideoView />
        <BestDeal />
        <Properties />
        <Testimonials />
        <ContectUs />
      </main>
      <Footer />
    </div>
  );
}

export default App;
