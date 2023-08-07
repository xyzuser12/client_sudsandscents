import React from "react";
import styles from "../styles/imageBanner.module.css";

const ImageBanner = ({ imageUrl, altText, text, description }) => {
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

export default ImageBanner;
