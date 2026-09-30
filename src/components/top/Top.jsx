import styles from "./Top.module.css";
import { ImMap } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaXTwitter, label: "X (Twitter)" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
  { icon: FaInstagram, label: "Instagram" },
];

const Top = () => {
  return (
    <div className={styles.topBar}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.left}>
          <a href="mailto:info@company.com" className={styles.item}>
            <HiOutlineMail className={styles.ic} />
            info@company.com
          </a>
          <span className={styles.sep} />
          <span className={styles.item}>
            <ImMap className={styles.ic} />
            Sunny Isles Beach, FL 33160
          </span>
        </div>

        <div className={styles.right}>
          {socials.map(({ icon: Icon, label }) => (
            <a key={label} href="#" aria-label={label} className={styles.icons}>
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Top;
