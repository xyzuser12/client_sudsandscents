import { useEffect, useState } from "react";

import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Button from "@mui/material/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";


import classes from "../../../styles/layout/CategorySection.module.css";

const CategorySection = ({ categories }) => {
  const [parentCateg, setParentCateg] = useState([]);
  console.log(parentCateg);

  useEffect(() => {
    const topLevelCategories = getTopLevelCategories(categories);
    setParentCateg(topLevelCategories);
  }, [categories]);
  function getTopLevelCategories(categ) {
    const topLevelCategories = [];

    categ?.forEach((category) => {
      if (!category.parent) {
        topLevelCategories.push({
          id: category._id,
          name: category.name,
          image: category.image,
        });
      }
    });

    return topLevelCategories;
  }
  const renderArrowPrev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
      <Button
        type="button"
        className={classes["prev-button"]}
        onClick={onClickHandler}
        title={label}
      >
        <ArrowBackIosRoundedIcon />
      </Button>
    );

  const renderArrowNext = (onClickHandler, hasNext, label) =>
    hasNext && (
      <Button
        type="button"
        className={classes["back-button"]}
        onClick={onClickHandler}
        title={label}
      >
        <ArrowForwardIosRoundedIcon />
      </Button>
    );
  return (
    <section className={classes["category-section"]}>
      <div className={classes["category-section__left"]}>
        <h3 className={classes["category-section__title"]}>
          Custom Care for Your Every Scent and Suds
        </h3>
        <p className={classes["category-section__description"]}>
          Unlock the full potential of personalized livelihood products with our
          intuitive software. Simplify the customization process and create
          unique products faster and easier than ever before!
        </p>
        <Button
          variant="contained"
          href="/category-formula"
          className={classes["explore-button"]}
          sx={{
            padding: "0.8em 2em",
            borderRadius: "50px",
            textTransform: "uppercase",
            fontSize: "clamp(14px, 2vw, 15px)",
            fontFamily: "var(--font-poppins)",
            fontWeight: "normal",
            backgroundColor: "#de89a1",
            color: "#fff",
            outline: "none",
            border: "none",
            letterSpacing: "1px",
          }}
        >
          Explore
        </Button>
      </div>
      <div className={classes["category-section__right"]}>
        <Carousel
          className={classes["carousel-wrapper"]}
          autoPlay
          infiniteLoop
          interval={6000}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          renderArrowPrev={renderArrowPrev}
          renderArrowNext={renderArrowNext}
        >
          {parentCateg.map((category) => {
            return (
              <div key={category.id} className={classes["image-wrapper"]}>
                {category.image && (
                  <Image
                    src={category.image}
                    alt="category image"
                    loading="lazy"
                    width={300}
                    height={300}
                  />
                )}
                <h4 className={classes["category-title"]}>{category.name}</h4>
              </div>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
};

export default CategorySection;
