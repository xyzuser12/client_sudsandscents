import Image from "next/image";
import Header from "@/components/Header";

import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@mui/material/Button";
import CustomButton from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import Spinner from "@/components/Spinner";

import classes from "../../styles/cart/Cart.module.css";
import outputImageBg from "../../public/assets/outputImage_background.png";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Php } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";

const ingreDataArr = [
  {
    category: "Oil-based",
    categoryId: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    id: "644662c5be70cd3d8b62bd73",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334401/Frankincense_sgpmuj.png",
    price: 42,
    quantity: 11,
    title: "Sweet Almond",
  },
  {
    category: "Oil-based",
    categoryId: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    id: "6446630abe70cd3d8b62bd7f",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334470/coconut_zafspz.png",
    price: 29,
    quantity: 34,
    title: "Coconut",
  },
  {
    category: "Floral",
    categoryId: "64465be6be70cd3d8b62bd3b",
    composition: "Essential Oils",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: "645354f2ef19e3b71076cecb",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182831/cedarwood_zuynog.webp",
    price: 123,
    quantity: 234,
    title: "Rose",
  },
  {
    category: "Floral",
    categoryId: "64465be6be70cd3d8b62bd3b",
    composition: "Essential Oils",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    id: "64535584ef19e3b71076ced7",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182976/jasmine_qfdcu6.jpg",
    price: 41,
    quantity: 654,
    title: "Jasmine",
  },
];

const cartDatas = [
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula:
      "\n    To make this blend you will need:\n    10ml jojoba oil\n    15 drops frankincense essential oil\n    9 drops lavender essential oil\n    6 drops cedar wood essential oil\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\n    Directions:\n    \n    Pour the jojoba oil into a glass bottle.\n    Add the drops of essential oils carefully.\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\n    Cost Estimation:\n    \n    10ml Jojoba Oil: ₱ 120.00\n    15 drops Frankincense Essential Oil: ₱ 50.00\n    9 drops Lavender Essential Oil: ₱ 30.00\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\n    15ml Glass Bottle: ₱ 20.00",
    ingredients: [
      "6453603cef19e3b71076cf41",
      "64535667ef19e3b71076cf0c",
      "645354f2ef19e3b71076cecb",
    ],
    numberOfLiter: 2,
    productId:
      "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe",
    totalEstimatedCost: 245,
  },
];

const cartRaw = [
  '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]',
  '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]',
  '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]',
  '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]',
  '["2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]',
];

export default function CartPage() {
  const router = useRouter();
  const { cartProducts, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [reverseOrderProducts, setReverseOrderProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [productFormatted, setProductFormatted] = useState([]);
  const [productToPurchase, setProductToPurchase] = useState([]);

  useEffect(() => {
    const cartData = convertCartData(cartProducts);
    const transformedData = getUniqueCartData(cartData);
    const reversedData = transformedData.reverse();
    if (cartProducts.length > 0) {
      setReverseOrderProducts(reversedData);
      setProducts(reversedData);
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  useEffect(() => {
    axios.get("/api/products").then((result) => {
      const ingredients = result.data;
      setIngredients(ingredients);
    });
  }, []);

  useEffect(() => {
    if (products.length > 0 && ingredients.length > 0) {
      setProductFormatted(generateFormattedCartData(products, ingredients));
    }
  }, [ingredients, products]);

  console.log(productFormatted);

  const convertCartData = (cartDatas) => {
    const result = [];

    for (const cartData of cartDatas) {
      const [
        productId,
        categoryId,
        categoryName,
        categoryImage,
        formula,
        ingredients,
        numberOfLiter,
        totalEstimatedCost,
      ] = JSON.parse(cartData);

      const ingredientList = ingredients;
      const totalCost = totalEstimatedCost;

      result.push({
        productId,
        categoryId,
        categoryName,
        categoryImage,
        formula,
        ingredients: ingredientList,
        numberOfLiter: parseInt(numberOfLiter),
        totalEstimatedCost: totalCost,
      });
    }

    return result;
  };

  function getUniqueCartData(cartDatas) {
    const uniqueProducts = [];
    const productCounts = {};

    for (const cartData of cartDatas) {
      const productId = cartData.productId;
      if (!productCounts[productId]) {
        productCounts[productId] = 1;
        uniqueProducts.push(cartData);
      } else {
        productCounts[productId]++;
      }
    }

    for (const product of uniqueProducts) {
      const productId = product.productId;
      const count = productCounts[productId];
      product.numberOfLiter += count - 1;
    }

    return uniqueProducts;
  }

  const removeProductToCartHandler = (productId) => {
    if (productId) {
      removeProduct(productId);
    }
  };
  const checkboxChangeHandler = (event, productId) => {
    if (event.target.checked) {
      const selectedProduct = productFormatted.find(
        (product) => product.productId === productId
      );
      setProductToPurchase([...productToPurchase, selectedProduct]);
    } else {
      const updatedProductList = productToPurchase.filter(
        (product) => product.productId !== productId
      );
      setProductToPurchase(updatedProductList);
    }
  };

  const subTotalOrderSummary = productToPurchase.reduce((acc, curr) => {
    return acc + curr.totalEstimatedCost;
  }, 0);

  const calculateTotalLiters = (toPhurchase) => {
    let totalAmount = 0;
    toPhurchase.forEach((item) => {
      totalAmount += item.numberOfLiter;
    });
    return totalAmount;
  };

  console.log(productToPurchase);

  const goToCheckout = () => {
    router.push({
      pathname: "/checkout",
      query: { productToPurchase: JSON.stringify(productToPurchase) },
    });
  };

  const updateIngre = [
    {
      category: "64465be6be70cd3d8b62bd3b",
      composition: "Essential Oils",
      createdAt: "2023-05-04T06:50:47.827Z",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image:
        "https://res.cloudinary.com/dkppw65bv/image/upload/v1683183043/ylang-ylang_n8q0hf.jpg",
      price: 45,
      quantity: 76,
      title: "Lily",
      updatedAt: "2023-05-04T06:50:47.827Z",
      __v: 0,
      _id: "645355c7ef19e3b71076cee3",
    },
    {
      category: "64465be6be70cd3d8b62bd3b",
      composition: "Citrus Oils",
      createdAt: "2023-05-04T06:58:04.381Z",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image:
        "https://res.cloudinary.com/dkppw65bv/image/upload/v1683183480/ylang-ylang_hgoefm.jpg",
      price: 32,
      quantity: 12,
      title: "Orange",
      updatedAt: "2023-05-04T06:58:04.381Z",
      __v: 0,
      _id: "6453577cef19e3b71076cf18",
    },
    {
      category: "64465be6be70cd3d8b62bd3b",
      composition: "Woods and Musks",
      createdAt: "2023-05-04T07:35:24.740Z",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      image:
        "https://res.cloudinary.com/dkppw65bv/image/upload/v1683185721/myrrh-oil-500x500_vqewce.webp",
      price: 12,
      quantity: 12,
      title: "Cedarwood",
      updatedAt: "2023-05-04T07:35:24.740Z",
      __v: 0,
      _id: "6453603cef19e3b71076cf41",
    },
  ];

  function generateFormattedCartData(cartDatasRaw, ingreDataArrRaw) {
    const formattedCartData = [];

    for (const cartData of cartDatasRaw) {
      const {
        categoryId,
        categoryImage,
        categoryName,
        formula,
        ingredients,
        numberOfLiter,
        productId,
        totalEstimatedCost,
      } = cartData;
      const updatedIngredients = [];

      for (const ingredientId of ingredients) {
        const foundIngredient = ingreDataArrRaw.find(
          (ingredient) => ingredient._id === ingredientId
        );

        console.log(foundIngredient);

        if (foundIngredient) {
          updatedIngredients.push(foundIngredient);
        }
      }

      console.log(numberOfLiter);
      console.log(updatedIngredients);

      const updatedTotalEstimatedCost = updatedIngredients.reduce(
        (totalCost, ingredient) => {
          return totalCost + ingredient.price;
        },
        0
      );

      const formattedCartObj = {
        categoryId,
        categoryImage,
        categoryName,
        formula,
        ingredients: updatedIngredients,
        numberOfLiter,
        productId,
        totalEstimatedCost: updatedTotalEstimatedCost * numberOfLiter,
      };

      formattedCartData.push(formattedCartObj);
    }

    return formattedCartData;
  }

  console.log(ingredients);
  console.log(products);
  console.log(generateFormattedCartData(products, ingredients));

  return (
    <div className={classes.container}>
      <div className={classes["inner-container"]}>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            maxWidth: "50%",
            margin: "0 auto 1rem auto",
          }}
        >
          <Link
            href={`/checkout?productToPurchase=${encodeURIComponent(
              productToPurchase
            )}`}
          >
            <h2
              className={`${classes.cart} ${
                router.pathname === "/cart" ? classes.active : ""
              }`}
            >
              Cart
            </h2>
          </Link>
          <Link href={"/checkout"} disabled style={{ pointerEvents: "none" }}>
            <h2 className={classes.cart}>Checkout</h2>
          </Link>
        </div>

        <div className={classes["cart-container"]}>
          <RevealWrapper delay={0} className={classes["cart-items"]}>
            <div>
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {productFormatted?.length > 0 && (
                <div>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Select all items"
                    className={classes["select-all"]}
                    sx={{
                      color: "#545454",
                      margin: "0",
                    }}
                  />
                  <TableContainer component={Paper}>
                    <Table aria-label="spanning table">
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#F8F8F8" }}>
                          <TableCell></TableCell>
                          <TableCell>
                            <p
                              style={{
                                textTransform: "uppercase",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              Product
                            </p>
                          </TableCell>
                          <TableCell align="right">
                            <p
                              style={{
                                textTransform: "uppercase",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              Ingredient Price
                            </p>
                          </TableCell>
                          <TableCell align="right">
                            <p
                              style={{
                                textTransform: "uppercase",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              subTotal
                            </p>
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {productFormatted &&
                          productFormatted.map((product) => {
                            return (
                              <TableRow
                                key={product.productId}
                                sx={{
                                  borderBottom:
                                    "1px solid rgba(224, 224, 224, 1)",
                                  height: "100%",
                                }}
                              >
                                <TableCell
                                  sx={{ display: "flex", borderBottom: "none" }}
                                  className={classes["td-image"]}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        onChange={(event) =>
                                          checkboxChangeHandler(
                                            event,
                                            product.productId
                                          )
                                        }
                                      />
                                    }
                                    sx={{ marginRight: "0" }}
                                  />
                                </TableCell>
                                <TableCell
                                  sx={{ borderBottom: "none" }}
                                  className={classes["td-image"]}
                                >
                                  <div style={{ display: "flex", gap: "14px" }}>
                                    <div className={classes["image-wrapper"]}>
                                      <Image
                                        src={product.categoryImage}
                                        alt="image of perfume"
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                        style={{
                                          width: "100%",
                                          height: "100%",
                                          padding: "2px",
                                          zIndex: "2",
                                        }}
                                      />
                                      <Image
                                        src={
                                          "https://res.cloudinary.com/dkppw65bv/image/upload/c_scale,w_116/v1684510657/outputImage_background_tasre3.png"
                                        }
                                        alt="background of image of perfume"
                                        width={100}
                                        height={100}
                                        loading="lazy"
                                        style={{
                                          position: "absolute",
                                          top: "0",
                                          left: "0",
                                          width: "100%",
                                          height: "100%",
                                          zIndex: "1",
                                        }}
                                      />
                                    </div>
                                    <p className={classes["product-name"]}>
                                      {`${product.categoryName} ${product.numberOfLiter}L`}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ borderBottom: "none" }}
                                  className={classes["td-price"]}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "10px",
                                    }}
                                  >
                                    {product.ingredients.map((ingredientId) => {
                                      if (ingredientId) {
                                        return (
                                          <div key={ingredientId._id}>
                                            <p>
                                              <i
                                                className={
                                                  classes["ingredient-name"]
                                                }
                                              >
                                                {ingredientId.title}{" "}
                                                {ingredientId.composition}
                                              </i>
                                            </p>
                                            <p
                                              className={
                                                classes["ingredient-price"]
                                              }
                                            >
                                              ₱{ingredientId.price.toFixed(2)}
                                            </p>
                                          </div>
                                        );
                                      }
                                      return null;
                                    })}
                                  </div>
                                </TableCell>
                                <TableCell
                                  align="right"
                                  sx={{ borderBottom: "none" }}
                                >
                                  <p>
                                    ₱{product.totalEstimatedCost.toFixed(2)}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <CloseSharpIcon
                                    onClick={() =>
                                      removeProductToCartHandler(
                                        product.productId
                                      )
                                    }
                                    sx={{
                                      color: "#aaaaaa",
                                      "&:hover": {
                                        color: "#444",
                                        transition: "color 0.15s",
                                      },
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )}
            </div>
          </RevealWrapper>
          <div className={classes["order-infos"]}>
            {!!cartProducts?.length && (
              <RevealWrapper delay={100}>
                <Paper className={classes["order-infos-wrapper"]}>
                  <div className={classes["delivery-address"]}>
                    <h2 className={classes["delivery-address-title"]}>
                      Cart Totals
                    </h2>
                  </div>

                  <div className={classes["order-summary-wrapper"]}>
                    <p>
                      Subtotal ({productToPurchase.length}{" "}
                      {productToPurchase.length > 1 ? "items" : "item"}):
                    </p>
                    <p>₱{subTotalOrderSummary.toFixed(2)}</p>
                    <p>Total Weight:</p>
                    <p>{`${calculateTotalLiters(productToPurchase)}L`}</p>
                  </div>
                  <div className={classes["order-summary-bottom"]}>
                    <div className={classes["total-payment-wrapper"]}>
                      <p>Total: </p>
                      <p>
                        ₱
                        {productToPurchase.length > 0
                          ? subTotalOrderSummary.toFixed(2)
                          : 0}
                      </p>
                    </div>
                    <Button
                      disabled={!(productToPurchase.length > 0)}
                      variant="contained"
                      className={classes["buy-now__button"]}
                      sx={{
                        width: "100%",
                        alignSelf: "center",
                        padding: "0.8em 2em",
                        borderRadius: "6px",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        backgroundColor: "#de89a1",
                        color: "#fff",
                        outline: "none",
                        border: "none",
                      }}
                      onClick={goToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </Paper>
              </RevealWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
