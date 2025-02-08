import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from "@inertiajs/react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <h3>Car Portal</h3>
        <p>
            Cars Sale is your ultimate destination for buying and selling cars. Whether you're looking for a brand-new model or a pre-owned vehicle, we offer a wide selection of cars for all types of customers. Find detailed information, photos, and reviews on the cars you're interested in and make an informed decision.
        </p>
        <div style={styles.socialIcons}>
          <a href="#" style={styles.icon}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" style={styles.icon}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" style={styles.icon}>
            <i className="fab fa-google"></i>
          </a>
          <a href="#" style={styles.icon}>
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="#" style={styles.icon}>
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div style={styles.links}>
          <Link href={route("home-page")} style={styles.link}>
            Home
          </Link>
          <Link href={route('about-us-page')} style={styles.link}>
            About us
          </Link>
          <Link href={route('contact-us-page')} style={styles.link}>
            Contact us
          </Link>
          <a href="register" style={styles.link}>
            Register
          </a>
          <a href="login" style={styles.link}>
            Login
          </a>
        </div>
        <p>
          &copy; 2024 -{" "}
          <a href="#" style={styles.groundTutorialLink}>
            Used Car Portal.
          </a>
        </p>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#0d0d0d", // Darker black with a touch of gray for the "mid-night" effect
    color: "#fff",
    textAlign: "center",
    padding: "20px",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    margin: "10px 0",
  },
  icon: {
    margin: "0 10px",
    color: "#fff",
    fontSize: "20px",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  iconHover: {
    color: "#ff6347", // Hover effect with a warm color (tomato red)
  },
  links: {
    margin: "20px 0",
  },
  link: {
    margin: "0 10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "16px",
    transition: "color 0.3s ease",
  },
  linkHover: {
    color: "#ff6347", // Hover effect for links
  },
  groundTutorialLink: {
    color: "#4caf50", // Green for the 'Ground Tutorial' link
    textDecoration: "none",
  },
};

export default Footer;
