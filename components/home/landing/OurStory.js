import Image from "next/image";

import bgImage from "../../../public/assets/images/ourStory-bg.png";
import classes from "../../../styles/layout/OurStory.module.css";
import { Button } from "@mui/material";

const OurStory = () => {
  return (
    <section className={classes["our-story-section"]}>
      <Image
        src={bgImage}
        alt="all kinds of livelihood products"
        loading="lazy"
        className={classes["bg-image"]}
      />

      <div className={classes["story-wrapper"]}>
        <div>
          <h4 className={classes.title}>Our Story</h4>
          <div className={classes["story-content"]}>
            <p>
              <span>A</span>t SUDS & SCENTS, we believe that everyone deserves
              to feel great in their own skin. We also believe that true
              personalization is the key to achieving that feeling. That&apos;s
              why we created a brand that offers fully personalized hygiene
              products, including soap, shampoo, lotion, perfume, and more.
            </p>
            <p>
              Our journey began with a simple idea: that personalization is the
              future of hygiene. We noticed that most hygiene products were
              one-size-fits-all, using generic formulas that didn&apos;t take
              into account each customer&apos;s unique needs and preferences. We
              saw an opportunity to change that, by offering a wide range of
              products that are customized to each customer&apos;s individual
              needs.
            </p>
            <p>
              At SUDS & SCENTS, we&apos;re not just a brand, we&apos;re a
              community. We&apos;re here to help you discover your perfect
              routine, from scent to suds. We&apos;re passionate about
              empowering our customers to feel their best, and we&apos;re
              committed to providing the highest level of personalized care and
              attention.
            </p>
          </div>
          <Button
            variant="contained"
            className={classes["read-more__button"]}
            sx={{
              letterSpacing: "1px",
              color: "#fff",
              alignSelf: "center",
              padding: "0.8em 2em",
              borderRadius: " 50px",

              textTransform: "uppercase",
              fontSize: "clamp(13px, 2vw, 14px)",
              fontFamily: "var(--font-poppins)",
              fontWeight: "normal",
            }}
          >
            Read More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
