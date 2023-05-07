import { Fragment, MouseEventHandler, ReactNode, useEffect } from "react";
import Image from "next/image";
import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoadingButton from "@mui/lab/LoadingButton";
import WaterDropOutlinedIcon from "@mui/icons-material/WaterDropOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Stack from "@mui/material/Stack";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Divider from "@mui/material/Divider";
import { OutlinedInput } from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import Tooltip from "@mui/material/Tooltip";

import { InputAdornment } from "@mui/material";
// import { CurrencyPhp } from "mdi-material-ui";

import classes from "../../styles/createFormula/CreateFormula.module.css";
import outputImageBg from "../../public/assets/outputImage_background.png";

const CreateFormula = ({ categoryData, ingredientData }) => {
  const [base, setBase] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState("1");
  const [loading, setLoading] = useState(false);
  const [showCreateFormulaButton, setShowCreateFormulaButton] = useState(true);
  const [variety, setVariety] = useState("");
  const [ingre, setIngre] = useState("");

  const customProductName = categoryData.name;
  // const classification = categoryData.classification;
  const categoryImage = categoryData.image;
  // const ingre = ingredientData.find(
  //   (ingre) => ingre.ingredient_row_id === variety
  // );
  console.log(categoryData);
  console.log(ingredientData);
  useEffect(() => {
    if (ingredientData) {
      setIngre(ingredientData.find((ingre) => ingre.categoryId === variety));
    }
  }, [variety, ingredientData]);

  const incrementQuantityHandler = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantityHandler = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const addIngredientHandler = (id, value) => () => {
    setIngredients((prev) => {
      const index = prev.findIndex((i) => i.ingredient.id === id);
      if (index !== -1) {
        // ingredient already exists, update isSelected
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            ingredient: {
              ...prev[index].ingredient,
              isSelected: !prev[index].ingredient.isSelected,
            },
          },
          ...prev.slice(index + 1),
        ];
      } else {
        // ingredient doesn't exist, add it
        return [
          ...prev,
          {
            ingredient: { id, name: value, isSelected: true },
          },
        ];
      }
    });
  };
  console.log(ingredients);

  const baseHandler = (e) => {
    setBase(e.target.value);
  };

  const tabHandler = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  const createFormulaHandler = () => {
    setLoading((prev) => !prev);

    setTimeout(() => {
      setLoading(false);
      setShowCreateFormulaButton(false);
    }, 2000);
  };

  const varietyChangeHandler = (value) => () => {
    if (value !== variety) {
      setVariety(value);
    }
  };

  // console.log(ingredientData.find((ingre = variety === ingre)));

  return (
    <div
      className={`${classes.container} ${classes["create-formula-container"]}`}
    >
      {/*========================1) TITLE DRID ITEM =======================*/}
      <div className={classes["title"]}>
        {/* <h3 className={classes.classification}>{classification}</h3> */}
        <h2 className={classes["product-name"]}>{customProductName}</h2>
      </div>

      {/*=======================2) IMAGE DRID ITEM =======================*/}

      <div className={classes["image-wrapper"]}>
        <Image
          src={categoryImage}
          alt="image of perfume"
          width={400}
          height={400}
          className={classes.image}
          loading="lazy"
        />
        <Image
          src={outputImageBg}
          alt="background of image of perfume"
          className={classes["image-backgound"]}
          loading="lazy"
        />
      </div>

      {/*======================3) EDITOR DRID ITEM =======================*/}
      <div className={classes["editor-wrapper"]}>
        <FormControl color="secondary" className={classes["base-wrapper"]}>
          <InputLabel id="base">
            Subcategory<span className={classes["oil__required"]}>*</span>
          </InputLabel>
          <Select
            required
            labelId="base"
            id="base"
            value={base}
            label="Subcategory"
            className={classes["base__select"]}
            onChange={baseHandler}
          >
            {categoryData.subcategories.map((categ) => (
              <MenuItem
                key={categ.categoryId}
                value={`${categ.category}`}
                onClick={varietyChangeHandler(categ.categoryId)}
              >
                {categ.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {ingre && (
          <div className={classes["editor-button-wrapper"]}>
            <FormControl className={classes.budget}>
              <InputLabel htmlFor="budget">Budget (optional)</InputLabel>
              <OutlinedInput
                id="budget"
                label="Budget (optional)"
                aria-describedby="budget-helper-text"
                type="number"
                inputProps={{ step: 1, min: 0 }}
                startAdornment={"₱ "}
                endAdornment={
                  <InputAdornment position="end">
                    <Button variant="outlined" color="primary">
                      Send
                    </Button>
                  </InputAdornment>
                }
              />
              <FormHelperText id="budget-helper-text">
                Enter your budget for your {categoryData.name} to receive
                recommendations on ingredients within that budget.
              </FormHelperText>
            </FormControl>

            <FormControl className={classes.liter}>
              <InputLabel htmlFor="budget">
                Liter<span className={classes["oil__required"]}>*</span>
              </InputLabel>
              <OutlinedInput
                required
                id="liter"
                label="Liter"
                aria-describedby="liter-helper-text"
                type="number"
                inputProps={{ step: 1, min: 1 }}
                endAdornment={"L"}
                defaultValue={1}
              />
              <FormHelperText id="liter-helper-text">
                The liter of {categoryData.name}.
              </FormHelperText>
            </FormControl>
          </div>
        )}

        <div className={classes["ingredient-optoins-wrapper"]}>
          {ingre &&
            ingre.ingredients_row.map((ingredient) => {
              return (
                <div
                  key={ingredient.composition}
                  className={classes["oils-wrapper"]}
                >
                  <h4 className={classes["oil-title"]}>
                    {ingredient.composition}
                    <span className={classes["oil__required"]}>*</span>
                  </h4>
                  <div className={classes["oils-wrapper__options"]}>
                    {ingredient.options.map((option) => {
                      return (
                        <Tooltip title={option.description} key={option.id}>
                          <div
                            key={option.id}
                            className={classes["oil-option"]}
                            onClick={addIngredientHandler(
                              option.id,
                              option.title
                            )}
                          >
                            <div
                              className={`${classes["image-button"]} ${
                                ingredients.find(
                                  (i) => i.ingredient.id === option.id
                                )?.ingredient.isSelected && classes.selected
                              }`}
                            >
                              <div>
                                <Image
                                  src={option.image}
                                  width={50}
                                  height={50}
                                  alt="perfume"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            <p>{option.title}</p>
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/*=====================4) OUTPUT DRID ITEM ========================*/}
      {!showCreateFormulaButton && (
        <div className={classes["formula-wrapper"]}>
          <Divider className={classes["output__divider--top"]} />

          <div className={classes["formula__tab"]}>
            <TabContext value={tabValue}>
              <TabList onChange={tabHandler} aria-label="lab API tabs example">
                <Tab
                  label="Formula"
                  value="1"
                  className={classes["formula-title"]}
                />
              </TabList>
              <TabPanel value="1" className={classes["tab-panel"]}>
                <div className={classes["ingredients-wrapper"]}>
                  <p className={classes["ingredients-header"]}>
                    To make this blend you will need:
                  </p>
                  <ul>
                    <li>10ml jojoba oil</li>
                    <li>15 drops frankincense essential oil</li>
                    <li>9 drops lavender essential oil</li>
                    <li>6 drops cedar wood essential oil </li>
                    <li>
                      15ml glass bottle (a roll-on bottle or one with a pipette
                      works well)
                    </li>
                  </ul>
                </div>
                <div className={classes["directions-wrapper"]}>
                  <p className={classes["directions-header"]}>Directions:</p>
                  <ul>
                    <li>Pour the jojoba oil into a glass bottle.</li>
                    <li>Add the drops of essential oils carefully.</li>
                    <li>
                      Place the lid on the bottle and shake gently to ensure all
                      the oils are blended
                    </li>
                  </ul>
                </div>
                <div className={classes["cost-estimation-wrapper"]}>
                  <p className={classes["cost-estimation-header"]}>
                    Cost Estimation:
                  </p>
                  <ul>
                    <li>10ml Jojoba Oil: ₱ 120.00</li>
                    <li>15 drops Frankincense Essential Oil: ₱ 50.00</li>
                    <li>9 drops Lavender Essential Oil: ₱ 30.00</li>
                    <li>6 drops Cedar Wood Essential Oil: ₱ 25.00</li>
                    <li>15ml Glass Bottle: ₱ 20.00</li>
                  </ul>
                </div>
              </TabPanel>
            </TabContext>
          </div>
          <Button
            className={classes["save-copy__button"]}
            variant="outlined"
            sx={{
              alignSelf: "center",
              padding: "0.8em 2em",
              borderRadius: "50px",

              textTransform: "uppercase",
              fontSize: "clamp(10px, 2vw, 12px)",
              fontFamily: "var(--font-poppins)",
              fontWeight: "normal",
            }}
            startIcon={<SaveAltIcon />}
          >
            Save a copy
          </Button>
          <Divider className={classes["output__divider--bottom"]} />
        </div>
      )}

      {/*======================5) ACTION BUTTONS GRID ITEM ========================*/}
      {ingre && (
        <div className={classes["actions-buttons-wrapper"]}>
          {/* <FormControl sx={{ marginTop: "1.6rem" }}>
            <InputLabel htmlFor="budget">
              Liter<span className={classes["oil__required"]}>*</span>
            </InputLabel>
            <OutlinedInput
              required
              id="liter"
              label="Liter"
              aria-describedby="liter-helper-text"
              type="number"
              inputProps={{ step: 1, min: 1 }}
              endAdornment={"L"}
              defaultValue={1}
            />
            <FormHelperText id="liter-helper-text">
              The liter of {categoryData.name}.
            </FormHelperText>
          </FormControl> */}

          {showCreateFormulaButton ? (
            <LoadingButton
              onClick={createFormulaHandler}
              className={classes["create-formula__button"]}
              loading={loading}
              color="primary"
              loadingPosition="start"
              startIcon={<WaterDropOutlinedIcon />}
              size="medium"
              variant="contained"
              sx={{
                alignSelf: "center",
                padding: "0.8em 2em",
                borderRadius: "50px",
                textTransform: "uppercase",
                fontSize: "clamp(14px, 2vw, 15px)",
                fontWeight: "normal",
                letterSpacing: "1px",
                backgroundColor: "#de89a1",
                color: "#fff",
                outline: "none",
                border: "none",
              }}
            >
              <span>Create My Formula</span>
            </LoadingButton>
          ) : (
            <Fragment>
              <div className={classes["total-estimated-cost__wrapper"]}>
                <h4 className={classes["oil-title"]}>Total estimated cost</h4>
                <p className={classes["total-cost"]}>₱245.00</p>
              </div>
              <Stack
                direction="row"
                spacing={2}
                className={classes["stack-action-button"]}
              >
                <Button
                  variant="outlined"
                  startIcon={<ShoppingCartIcon />}
                  className={classes["add-to-cart__button"]}
                  sx={{
                    alignSelf: "center",
                    padding: "0.8em 2em",
                    borderRadius: "50px",
                    textTransform: "uppercase",
                    fontSize: "clamp(14px, 2vw, 15px)",
                    fontWeight: "normal",
                    letterSpacing: "1px",
                  }}
                >
                  Add to cart
                </Button>
                <Button
                  variant="contained"
                  className={classes["buy-now__button"]}
                  sx={{
                    alignSelf: "center",
                    padding: "0.8em 2em",
                    borderRadius: "50px",
                    textTransform: "uppercase",
                    fontSize: "clamp(14px, 2vw, 15px)",
                    fontWeight: "normal",
                    letterSpacing: "1px",
                    backgroundColor: "#de89a1",
                    color: "#fff",
                    outline: "none",
                    border: "none",
                  }}
                >
                  Buy now
                </Button>
              </Stack>
            </Fragment>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateFormula;
