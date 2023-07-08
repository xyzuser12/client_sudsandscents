import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import FormControl from "@mui/material/FormControl";
import { OutlinedInput } from "@mui/material";

// import FetchProducts from "../../api/FetchCategories";
import { useRouter } from "next/router";

import classes from "../../styles/formulaCategory/FormulaCategoryList.module.css";
// import image1 from "../../assets/images/products/Facial-wash.png";
// import image2 from "../../assets/images/products/Lotion.png";
// import image3 from "../../assets/images/products/Perfume.png";
// import image4 from "../../assets/images/products/Shampoo.png";
// import image5 from "../../assets/images/products/Soap.png";

// const CAT_IMAGES = [
//   { id: "custom-perfume", images: { imageSmall: image3, imageLarge: image3 } },
//   {
//     id: "custom-facial-wash",
//     images: { imageSmall: image1, imageLarge: image1 },
//   },
//   { id: "custom-lotion", images: { imageSmall: image2, imageLarge: image2 } },
//   { id: "custom-shampoo", images: { imageSmall: image4, imageLarge: image4 } },
//   { id: "custom-soap", images: { imageSmall: image5, imageLarge: image5 } },
// ];

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "1px solid #BDBDBD",
  borderRadius: "6px",
  boxShadow: 24,
  padding: "1.6rem",
};

function ChildModal({ categId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(0);
  const [disableBtn, setDisableBtn] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function createFormulaBudgetHandler() {
    router.push({
      pathname: "/category-formula/" + categId,
      query: { budget },
    });
  }

  const budgetHandler = (e) => {
    setBudget(e.target.value);
    if (e.target.value > 0) setDisableBtn(false);
    if (e.target.value === "0") setDisableBtn(true);
    console.log(e.target.value);
  };

  return (
    <Fragment>
      <div className={classes["modal-option-item"]} onClick={handleOpen}>
        <Image
          src={"/assets/icons/budgetIcon.png"}
          alt="formula"
          width={50}
          height={50}
        />
        <h3>Budget-based</h3>
        <p>Input your budget.</p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "40%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            borderRadius: "6px",
            boxShadow: 24,
            padding: "1.4rem",
          }}
        >
          {" "}
          <CloseSharpIcon
            onClick={handleClose}
            sx={{
              color: "#aaaaaa",
              alignSelf: "end",
              "&:hover": {
                color: "#444",
                transition: "color 0.15s",
              },
            }}
          />
          <h2 id="child-modal-title">Please enter your budget.</h2>
          <FormControl className={classes.budget}>
            <OutlinedInput
              id="budget"
              aria-describedby="budget-helper-text"
              type="number"
              inputProps={{ step: 1, min: 100 }}
              startAdornment={"₱ "}
              sx={{ marginTop: ".8rem" }}
              value={budget}
              onChange={budgetHandler}
            />
          </FormControl>
          <Button
            disabled={disableBtn}
            variant="contained"
            sx={{ width: "50%", margin: "1rem auto 0" }}
            onClick={createFormulaBudgetHandler}
          >
            SEND
          </Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

const FormulaCategoryList = ({ categories }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState();
  console.log(categories);

  const handleOpen = (id) => {
    setCategoryId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function createFormulaHandler(id) {
    router.push("/category-formula/" + id);
  }

  const convertImage = (image) => {
    const imageData = Buffer.from(image).toString("base64");
    return imageData;
  };
  // console.log(parentCateg);
  return (
    <div className={classes["category-lists"]}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "40%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "6px",
            boxShadow: 24,
            padding: "1.4rem",
          }}
        >
          <CloseSharpIcon
            onClick={handleClose}
            sx={{
              color: "#aaaaaa",
              alignSelf: "end",
              "&:hover": {
                color: "#444",
                transition: "color 0.15s",
              },
            }}
          />

          <h2 className={classes["modal-title"]}>Customize or Collaborate</h2>
          <p className={classes["modal-text"]}>
            Choose whether to create your own formula or let the AI calculate
            within your budget.
          </p>

          <div className={classes["modal-options"]}>
            <div
              className={classes["modal-option-item"]}
              onClick={() => createFormulaHandler(categoryId)}
            >
              <Image
                src={"/assets/icons/formulaIcon.png"}
                alt="formula"
                width={40}
                height={50}
              />
              <h3>Formula-based</h3>
              <p>Create your own fomula.</p>
            </div>
            <ChildModal categId={categoryId} />
          </div>
        </Box>
      </Modal>

      <div className={classes.card}>
        {categories &&
          categories.map((cat) => {
            // console.log(cat);
            // const catImage = CAT_IMAGES.find((img) => img.id === cat.id)?.images;
            return (
              <div
                onClick={() => handleOpen(cat.id)}
                className={`${classes["card-item"]} ${
                  classes[`card-item-${cat.id}`]
                }`}
                key={cat.id}
              >
                <div className={classes["image-wrapper"]}>
                  {cat.image && (
                    <Image
                      src={`data:image/jpeg;base64,${convertImage(
                        cat.image.data
                      )}`}
                      width={400}
                      height={400}
                      alt={cat.name}
                      loading="lazy"
                      className={classes["category-image"]}
                    />
                  )}
                </div>
                <div className={classes.info}>
                  <h3 className={classes["category-name"]}>{cat.name}</h3>
                  {/* <p className={classes.classification}>{cat.classification}</p> */}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FormulaCategoryList;
