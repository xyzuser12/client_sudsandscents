import Divider from "@mui/material/Divider";

import classes from "../../../styles/layout/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={classes.container}>
      <div className={`  ${classes["footer-top"]}`}>
        <div className={classes["footer_description"]}>
          <h6>Quick links</h6>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum </div>
        </div>
        <div className={classes["footer_description"]}>
          <h6>Quick links</h6>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum </div>
        </div>
        <div className={classes["footer_description"]}>
          <h6>Quick links</h6>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum dolor</div>
          <div>Lorem ipsum </div>
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
