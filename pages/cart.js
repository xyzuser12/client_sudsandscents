import Image from "next/image";
import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@mui/material/Button";
import CutomButton from "../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import classes from "../styles/cart/Cart.module.css";
import outputImageBg from "../public/assets/outputImage_background.png";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 15px 0;
  }
  table tbody tr.subtotal td:nth-child(2) {
    font-size: 1.4rem;
  }
  tr.total td {
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  button {
    padding: 0 !important;
  }
`;

const ProductImageBox = styled.div`
  position: relative;
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  &.image {
    width: 100%;
    height: 100%;
    padding: 3rem;
  }
  &.image-backgound {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 6px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

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
      "d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43",
    totalEstimatedCost: 245,
  },
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
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [reverseOrderProducts, setReverseOrderProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    const cartData = convertCartData(cartProducts);
    const transformedData = getUniqueCartData(cartData);
    // console.log(getUniqueCartData(transformedData));
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

  function moreOfThisProduct(id) {
    const item = cartProducts.find((item) => item.includes(id));
    console.log(id);
    console.log(item);
    addProduct(item);
  }
  function lessOfThisProduct(id) {
    const item = cartProducts.find((item) => item.includes(id));
    removeProduct(item);
  }

  console.log(cartProducts);
  console.log(ingredients);
  console.log(products);
  console.log(reverseOrderProducts);
  // const { data: session } = useSession();
  // const [products, setProducts] = useState([]);
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [city, setCity] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  // const [streetAddress, setStreetAddress] = useState("");
  // const [country, setCountry] = useState("");
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [shippingFee, setShippingFee] = useState(null);
  // useEffect(() => {
  //   if (cartProducts.length > 0) {
  //     axios.post("/api/cart", { ids: cartProducts }).then((response) => {
  //       setProducts(response.data);
  //     });
  //   } else {
  //     setProducts([]);
  //   }
  // }, [cartProducts]);
  // useEffect(() => {
  //   if (typeof window === "undefined") {
  //     return;
  //   }
  //   if (window?.location.href.includes("success")) {
  //     setIsSuccess(true);
  //     clearCart();
  //   }
  //   axios.get("/api/settings?name=shippingFee").then((res) => {
  //     setShippingFee(res.data?.value);
  //   });
  // }, []);
  // useEffect(() => {
  //   if (!session) {
  //     return;
  //   }
  //   axios.get("/api/address").then((response) => {
  //     setName(response.data?.name);
  //     setEmail(response.data?.email);
  //     setCity(response.data?.city);
  //     setPostalCode(response.data?.postalCode);
  //     setStreetAddress(response.data?.streetAddress);
  //     setCountry(response.data?.country);
  //   });
  // }, [session]);

  // async function goToPayment() {
  //   const response = await axios.post("/api/checkout", {
  //     name,
  //     email,
  //     city,
  //     postalCode,
  //     streetAddress,
  //     country,
  //     cartProducts,
  //   });
  //   if (response.data.url) {
  //     window.location = response.data.url;
  //   }
  // }
  // let productsTotal = 0;
  // for (const productId of cartProducts) {
  //   const price = products.find((p) => p._id === productId)?.price || 0;
  //   productsTotal += price;
  // }

  // if (isSuccess) {
  //   return (
  //     <>
  //       <Header />
  //       <Center>
  //         <ColumnsWrapper>
  //           <Box>
  //             <h1>Thanks for your order!</h1>
  //             <p>We will email you when your order will be sent.</p>
  //           </Box>
  //         </ColumnsWrapper>
  //       </Center>
  //     </>
  //   );
  // }
  return (
    <div className={classes.container}>
      <div className={classes["inner-container"]}>
        <h2 className={classes.cart}>Cart</h2>

        <div className={classes["cart-container"]}>
          <RevealWrapper delay={0} className={classes["cart-items"]}>
            <div>
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {products?.length > 0 && (
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

                  <table className={classes["table"]}>
                    <thead className={classes["table-head"]}>
                      <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Liters</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody
                      className={classes["table-body"]}
                      style={{ padding: "1px" }}
                    >
                      {products.map((product) => (
                        //       <tr>
                        //         <FormControlLabel
                        //   control={<Checkbox />}

                        // />
                        //       </tr>
                        <tr className={classes["table-row"]}>
                          <td className={classes["select"]}>
                            <FormControlLabel
                              control={<Checkbox />}
                              sx={{ marginRight: "0" }}
                            />
                          </td>
                          <td className={classes["td-image"]}>
                            <div className={classes["image-wrapper"]}>
                              <Image
                                src={product.categoryImage}
                                alt="image of perfume"
                                width={100}
                                height={100}
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
                            <p className={classes["product-name"]}>
                              {product.categoryName}
                            </p>
                          </td>
                          <td className={classes["td-price"]}>
                            {product.ingredients.map((ingredientId) => {
                              const foundIngredient = ingredients.find(
                                (ingredient) => ingredient._id === ingredientId
                              );
                              if (foundIngredient) {
                                return (
                                  <div key={foundIngredient._id}>
                                    <p>
                                      <i className={classes["ingredient-name"]}>
                                        {foundIngredient.title}{" "}
                                        {foundIngredient.composition}
                                      </i>
                                    </p>
                                    <p className={classes["ingredient-price"]}>
                                      ₱{foundIngredient.price.toFixed(2)}
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </td>
                          <td className={classes["td-liters"]}>
                            <div>
                              <CutomButton
                                onClick={() =>
                                  lessOfThisProduct(product.productId)
                                }
                              >
                                -
                              </CutomButton>
                              <QuantityLabel>
                                {product.numberOfLiter}
                              </QuantityLabel>
                              <CutomButton
                                onClick={() =>
                                  moreOfThisProduct(product.productId)
                                }
                              >
                                +
                              </CutomButton>
                            </div>
                          </td>
                          <td className={classes["td-subtotal"]}>
                            <p>
                              ₱
                              {(
                                product.totalEstimatedCost *
                                product.numberOfLiter
                              ).toFixed(2)}
                            </p>
                          </td>
                        </tr>
                      ))}
                      {/* <tr className="subtotal">
                    <td colSpan={2}>Products</td>
                    <td>${productsTotal}</td>
                  </tr>
                  <tr className="subtotal">
                    <td colSpan={2}>Shipping</td>
                    <td>${shippingFee}</td>
                  </tr>
                  <tr className="subtotal total">
                    <td colSpan={2}>Total</td>
                    <td>${productsTotal + parseInt(shippingFee || 0)}</td>
                  </tr> */}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </RevealWrapper>
          <div className={classes["order-infos"]}>
            {!!cartProducts?.length && (
              <RevealWrapper delay={100}>
                <div className={classes["order-infos-wrapper"]}>
                  <div className={classes["delivery-address"]}>
                    <h2 className={classes["delivery-address-title"]}>
                      Delivery Address
                    </h2>
                  </div>
                  <div className={classes["delivery-address-inputs-wrapper"]}>
                    <Input
                      type="text"
                      placeholder="Name"
                      value={name}
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      name="phoneNumber"
                      onChange={(ev) => setPhoneNumber(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Email"
                      value={email}
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type="text"
                        placeholder="City"
                        value={city}
                        name="city"
                        onChange={(ev) => setCity(ev.target.value)}
                      />
                      <Input
                        type="text"
                        placeholder="Postal Code"
                        value={postalCode}
                        name="postalCode"
                        onChange={(ev) => setPostalCode(ev.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type="text"
                      placeholder="Street Address"
                      value={streetAddress}
                      name="streetAddress"
                      onChange={(ev) => setStreetAddress(ev.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="Country"
                      value={country}
                      name="country"
                      onChange={(ev) => setCountry(ev.target.value)}
                    />
                  </div>
                  <div className={classes["delivery-address"]}>
                    <h2 className={classes["delivery-address-title"]}>
                      Order Summary
                    </h2>
                  </div>
                  <div className={classes["order-summary-wrapper"]}>
                    <p>
                      Subtotal ({products.length}{" "}
                      {products.length > 1 ? "items" : "item"}):
                    </p>
                    <p>₱490.00</p>
                    <p>Shipping:</p>
                    <p>₱38.00</p>
                  </div>
                  <div className={classes["order-summary-bottom"]}>
                    <div className={classes["voucher-wrapper"]}>
                      <Input
                        style={{ margin: "0" }}
                        type="text"
                        placeholder="Voucher Code"
                        name="voucher"
                      />
                      <CutomButton>Apply</CutomButton>
                    </div>
                    <div className={classes["total-payment-wrapper"]}>
                      <p>Total Payment: </p>
                      <p>₱528.00</p>
                    </div>
                    <Button
                      variant="contained"
                      className={classes["buy-now__button"]}
                      sx={{
                        width: "100%",
                        alignSelf: "center",
                        padding: "0.8em 2em",
                        borderRadius: "8px",
                        textTransform: "uppercase",
                        fontSize: "14px",
                        fontWeight: "700",
                        letterSpacing: "1px",
                        backgroundColor: "#de89a1",
                        color: "#fff",
                        outline: "none",
                        border: "none",
                      }}
                    >
                      Continue to payment
                    </Button>
                  </div>
                </div>
              </RevealWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
    // <>
    //   <Header />
    //   <Center>
    //     <ColumnsWrapper>
    //       <RevealWrapper delay={0}>
    //         <Box>
    //           <h2>Cart</h2>
    //           {!cartProducts?.length && <div>Your cart is empty</div>}
    //           {products?.length > 0 && (
    //             <Table>
    //               <thead>
    //                 <tr>
    //                   <th>Product</th>
    //                   <th>Quantity</th>
    //                   <th>Price</th>
    //                 </tr>
    //               </thead>
    //               <tbody>
    //                 {products.map((product) => (
    //                   <tr>
    //                     <ProductInfoCell>
    //                       <ProductImageBox>
    //                         <img src={product.images[0]} alt="" />
    //                       </ProductImageBox>
    //                       {product.title}
    //                     </ProductInfoCell>
    //                     <td>
    //                       <Button
    //                         onClick={() => lessOfThisProduct(product._id)}
    //                       >
    //                         -
    //                       </Button>
    //                       <QuantityLabel>
    //                         {
    //                           cartProducts.filter((id) => id === product._id)
    //                             .length
    //                         }
    //                       </QuantityLabel>
    //                       <Button
    //                         onClick={() => moreOfThisProduct(product._id)}
    //                       >
    //                         +
    //                       </Button>
    //                     </td>
    //                     <td>
    //                       $
    //                       {cartProducts.filter((id) => id === product._id)
    //                         .length * product.price}
    //                     </td>
    //                   </tr>
    //                 ))}
    //                 <tr className="subtotal">
    //                   <td colSpan={2}>Products</td>
    //                   <td>${productsTotal}</td>
    //                 </tr>
    //                 <tr className="subtotal">
    //                   <td colSpan={2}>Shipping</td>
    //                   <td>${shippingFee}</td>
    //                 </tr>
    //                 <tr className="subtotal total">
    //                   <td colSpan={2}>Total</td>
    //                   <td>${productsTotal + parseInt(shippingFee || 0)}</td>
    //                 </tr>
    //               </tbody>
    //             </Table>
    //           )}
    //         </Box>
    //       </RevealWrapper>
    //       {!!cartProducts?.length && (
    //         <RevealWrapper delay={100}>
    //           <Box>
    //             <h2>Order information</h2>
    //             <Input
    //               type="text"
    //               placeholder="Name"
    //               value={name}
    //               name="name"
    //               onChange={(ev) => setName(ev.target.value)}
    //             />
    //             <Input
    //               type="text"
    //               placeholder="Email"
    //               value={email}
    //               name="email"
    //               onChange={(ev) => setEmail(ev.target.value)}
    //             />
    //             <CityHolder>
    //               <Input
    //                 type="text"
    //                 placeholder="City"
    //                 value={city}
    //                 name="city"
    //                 onChange={(ev) => setCity(ev.target.value)}
    //               />
    //               <Input
    //                 type="text"
    //                 placeholder="Postal Code"
    //                 value={postalCode}
    //                 name="postalCode"
    //                 onChange={(ev) => setPostalCode(ev.target.value)}
    //               />
    //             </CityHolder>
    //             <Input
    //               type="text"
    //               placeholder="Street Address"
    //               value={streetAddress}
    //               name="streetAddress"
    //               onChange={(ev) => setStreetAddress(ev.target.value)}
    //             />
    //             <Input
    //               type="text"
    //               placeholder="Country"
    //               value={country}
    //               name="country"
    //               onChange={(ev) => setCountry(ev.target.value)}
    //             />
    //             <Button black block onClick={goToPayment}>
    //               Continue to payment
    //             </Button>
    //           </Box>
    //         </RevealWrapper>
    //       )}
    //     </ColumnsWrapper>
    //   </Center>
    // </>
  );
}
