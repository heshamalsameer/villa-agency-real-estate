import { useState } from "react";
import styles from "./ContectUs.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import { IoCall, IoMail, IoSend, IoCheckmarkCircle } from "react-icons/io5";

const initial = { name: "", email: "", subject: "", message: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email";
  if (v.message.trim().length < 10) e.message = "Message should be at least 10 characters";
  return e;
}

const ContectUs = () => {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate(values);
    setErrors(er);
    if (Object.keys(er).length) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setValues(initial);
      setTimeout(() => setStatus("idle"), 4000);
    }, 1200);
  };

  const field = (name, label, type = "text") => (
    <div className={`${styles.field} ${errors[name] ? styles.invalid : ""}`}>
      {type === "textarea" ? (
        <textarea id={name} name={name} value={values[name]} onChange={onChange} placeholder=" " rows={4} />
      ) : (
        <input id={name} name={name} type={type} value={values[name]} onChange={onChange} placeholder=" " />
      )}
      <label htmlFor={name}>{label}</label>
      {errors[name] && <span className={styles.err}>{errors[name]}</span>}
    </div>
  );

  return (
    <section id="contact" className={styles.contectsection}>
      <div className={styles.contect}>
        <div className={`wrap ${styles.title}`}>
          <SectionTitle title="Contact Us" center light />
          <h2 className="h-display reveal" style={{ "--d": "80ms" }}>
            Get In Touch With <em>Our Agents</em>
          </h2>
        </div>
      </div>

      <div className={`wrap ${styles.plan}`}>
        <div className={`reveal ${styles.contectimg}`} data-anim="left">
          <div className={styles.map}>
            <iframe
              title="Office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11662.9823862156!2d-80.11417883366248!3d25.936737059558723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9acfee073549d%3A0xf4e74db7a5da487a!2z2LXZhtmKINii2YrZhNiyINio2YrYqti02Iwg2YHZhNmI2LHZitiv2KcgMzMxNjDYjCDYp9mE2YjZhNin2YrYp9iqINin2YTZhdiq2K3Yr9ip!5e1!3m2!1sar!2snl!4v1724217821361!5m2!1sar!2snl"
            />
          </div>
          <div className={styles.contectinfo}>
            <a href="tel:0100200340" className={styles.infoCard}>
              <span className={styles.infoIc}>
                <IoCall />
              </span>
              <span>
                <strong>010-020-0340</strong>
                <small>Phone Number</small>
              </span>
            </a>
            <a href="mailto:info@villa.co" className={styles.infoCard}>
              <span className={styles.infoIc}>
                <IoMail />
              </span>
              <span>
                <strong>info@villa.co</strong>
                <small>Business Email</small>
              </span>
            </a>
          </div>
        </div>

        <div className={`reveal ${styles.formWrap}`} data-anim="right">
          <form className={styles.form} onSubmit={onSubmit} noValidate>
            <h3>Send us a message</h3>
            <p className={styles.formSub}>We usually reply within 24 hours.</p>
            {field("name", "Full Name")}
            {field("email", "Email Address", "email")}
            {field("subject", "Subject")}
            {field("message", "Your Message", "textarea")}
            <button
              type="submit"
              className={`btn ${styles.submit}`}
              disabled={status === "sending"}
            >
              <span className="btn-ic">
                {status === "sending" ? <span className={styles.spinner} /> : <IoSend />}
              </span>
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
          <div className={`${styles.toast} ${status === "sent" ? styles.show : ""}`} role="status">
            <IoCheckmarkCircle /> Thanks! Your message has been sent.
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContectUs;
