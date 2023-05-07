import Link from "next/link";

import Button from "@mui/material/Button";
import classes from "../../../styles/layout/HeroContent.module.css";

const HeroContent = () => {
  return (
    <section className={`${classes.container} ${classes.flex} ${classes.hero}`}>
      <h2 className={classes.subtitle}>
        Crafted to your unique style of living
      </h2>
      <h1 className={classes.title}>Purely Personal</h1>
      <Link href="/category-formula">
        <Button
          className={classes["formula-button"]}
          sx={{
            backgroundColor: "rgba(230, 230, 229, 0.3)",
            color: "#fff",
            backdropFilter: "blur(1px)",
            alignSelf: "center",
            padding: "0.8em 2em",
            borderRadius: "50px",
            textTransform: "uppercase",
            fontSize: "clamp(15px, 2vw, 17px)",
            fontFamily: "var(--font-poppins)",
            fontWeight: "normal",

            "&:hover, &:focus": {
              backgroundColor: "hsla(342, 57%, 90%, 0.5)",
            },
          }}
        >
          Create your Formula
        </Button>
      </Link>
    </section>
  );
};

export default HeroContent;
