import Divider from "@mui/material/Divider";

import classes from "../../../styles/layout/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={classes.container}>
      <div className={`  ${classes["footer-top"]}`}>
      <div className={classes["footer_description"]}>
          <h6>SUDS & SCENTS</h6>
          <div>Suds & Scents is a brand that specializes in personalized hygiene products.<br></br> We offer a wide range of products all tailored to meet the unique needs and<br></br> preferences of our customers.</div>
        </div>
        <div className={classes["footer_description"]}>
          <h6>PRODUCTS</h6>
          <div>Perfume</div>
          <div>Body Wash</div>
          <div>Shampoo</div>
          <div>Dishwashing Liquid </div>
          <div>Liquid Detergent</div>
        </div>
        <div className={classes["footer_description"]}>
          <h6>SOCIALS</h6>
          <div>Instagram</div>
          <div>Facebook</div>
          <div>Twitter</div>
        </div>
        <div className={classes["footer_description"]}>
          <h6>OTHERS</h6>
          <div>Terms and Conditions</div>
          <div>Privacy Policy</div>
          <div>Help Center</div>
        </div>
      </div>
      <Divider />
      <div className={classes["copyright-wrapper"]}>
        <p className={classes["copyright-description"]}>
          &copy; Copyright {currentYear} | Suds & Scents | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
