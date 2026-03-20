import React from "react";
import "../styles/contact.css";

const Contact = () => {
  return (
    <section className="contact-hero">
      <div className="contact-container">
        <div className="contact-left">
          <h1>Contact Us</h1>
          <p>
            Have questions or suggestions? We’d love to hear from you! Fill out the form and we’ll get back to you as soon as possible.
          </p>

          <div className="contact-info">
            <p>📧 Email: support@moodify.com</p>
            <p>📞 Phone: +91 9876543****</p>
            <p>📍 Address: Uttar-pradesh, India</p>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form">
            <label>Name</label>
            <input type="text" placeholder="Your Name" required />

            <label>Email</label>
            <input type="email" placeholder="Your Email" required />

            <label>Message</label>
            <textarea placeholder="Your Message" rows="5" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;