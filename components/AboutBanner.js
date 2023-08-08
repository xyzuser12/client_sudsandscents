import React from "react";
import styles from "../styles/aboutBanner.module.css";

const AboutBanner = ({ imageUrl, altText, text, description }) => {
  return (
    <div className={styles.imageBanner}>
      <img src={imageUrl} alt={altText} className={styles.bannerImage} />
      <div className={styles.overlayText}>
        <p>{text}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default AboutBanner;
