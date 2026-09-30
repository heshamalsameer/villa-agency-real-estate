import "./Footer.css";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { IoArrowForward } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="f-brand">
          <a href="#home" className="logo">
            VILLA<span>.</span>
          </a>
          <p>
            Luxury villas, apartments and penthouses — handpicked, verified and
            ready for you to call home.
          </p>
          <div className="f-social">
            {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#deals">Best Deal</a></li>
            <li><a href="#properties">Properties</a></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>Sunny Isles Beach, FL 33160</li>
            <li><a href="tel:0100200340">010-020-0340</a></li>
            <li><a href="mailto:info@villa.co">info@villa.co</a></li>
          </ul>
        </div>

        <div>
          <h4>Newsletter</h4>
          <p className="f-note">New listings in your inbox, once a week.</p>
          <form className="f-news" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" aria-label="Email" required />
            <button aria-label="Subscribe">
              <IoArrowForward />
            </button>
          </form>
        </div>
      </div>

      <div className="wrap f-bottom">
        <span>Copyright &copy; {new Date().getFullYear()} Villa Agency Co, Ltd. All rights reserved.</span>
        <span>Design: TemplateMo</span>
      </div>
    </footer>
  );
};

export default Footer;
