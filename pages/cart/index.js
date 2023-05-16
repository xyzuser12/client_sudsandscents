import Image from "next/image";
import Header from "@/components/Header";

import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@mui/material/Button";
import CutomButton from "../../components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
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

import classes from "../../styles/cart/Cart.module.css";
import outputImageBg from "../../public/assets/outputImage_background.png";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Php } from "@mui/icons-material";

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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    id: "644662c5be70cd3d8b62bd73",
    image: "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334401/Frankincense_sgpmuj.png",
    price: 42,
    quantity: 11,
    title: "Sweet Almond",
  },
  {
    category: "Oil-based",
    categoryId: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    id: "6446630abe70cd3d8b62bd7f",
    image: "https://res.cloudinary.com/dkppw65bv/image/upload/v1682334470/coconut_zafspz.png",
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
    image: "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182831/cedarwood_zuynog.webp",
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
    image: "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182976/jasmine_qfdcu6.jpg",
    price: 41,
    quantity: 654,
    title: "Jasmine",
  },
];

const cartDatas = [
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage: "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula: "\n    To make this blend you will need:\n    10ml jojoba oil\n    15 drops frankincense essential oil\n    9 drops lavender essential oil\n    6 drops cedar wood essential oil\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\n    Directions:\n    \n    Pour the jojoba oil into a glass bottle.\n    Add the drops of essential oils carefully.\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\n    Cost Estimation:\n    \n    10ml Jojoba Oil: ₱ 120.00\n    15 drops Frankincense Essential Oil: ₱ 50.00\n    9 drops Lavender Essential Oil: ₱ 30.00\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\n    15ml Glass Bottle: ₱ 20.00",
    ingredients: ["6453603cef19e3b71076cf41", "64535667ef19e3b71076cf0c", "645354f2ef19e3b71076cecb"],
    numberOfLiter: 2,
    productId: "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe",
    totalEstimatedCost: 245,
  },
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage: "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula: "\n    To make this blend you will need:\n    10ml jojoba oil\n    15 drops frankincense essential oil\n    9 drops lavender essential oil\n    6 drops cedar wood essential oil\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\n    Directions:\n    \n    Pour the jojoba oil into a glass bottle.\n    Add the drops of essential oils carefully.\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\n    Cost Estimation:\n    \n    10ml Jojoba Oil: ₱ 120.00\n    15 drops Frankincense Essential Oil: ₱ 50.00\n    9 drops Lavender Essential Oil: ₱ 30.00\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\n    15ml Glass Bottle: ₱ 20.00",
    ingredients: ["6453603cef19e3b71076cf41", "64535667ef19e3b71076cf0c", "645354f2ef19e3b71076cecb"],
    numberOfLiter: 2,
    productId: "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbt",
    totalEstimatedCost: 245,
  },
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage: "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula: "\n    To make this blend you will need:\n    10ml jojoba oil\n    15 drops frankincense essential oil\n    9 drops lavender essential oil\n    6 drops cedar wood essential oil\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\n    Directions:\n    \n    Pour the jojoba oil into a glass bottle.\n    Add the drops of essential oils carefully.\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\n    Cost Estimation:\n    \n    10ml Jojoba Oil: ₱ 120.00\n    15 drops Frankincense Essential Oil: ₱ 50.00\n    9 drops Lavender Essential Oil: ₱ 30.00\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\n    15ml Glass Bottle: ₱ 20.00",
    ingredients: ["6453603cef19e3b71076cf41", "64535667ef19e3b71076cf0c", "645354f2ef19e3b71076cecb"],
    numberOfLiter: 2,
    productId: "d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43",
    totalEstimatedCost: 245,
  },
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage: "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula: "\n    To make this blend you will need:\n    10ml jojoba oil\n    15 drops frankincense essential oil\n    9 drops lavender essential oil\n    6 drops cedar wood essential oil\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\n    Directions:\n    \n    Pour the jojoba oil into a glass bottle.\n    Add the drops of essential oils carefully.\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\n    Cost Estimation:\n    \n    10ml Jojoba Oil: ₱ 120.00\n    15 drops Frankincense Essential Oil: ₱ 50.00\n    9 drops Lavender Essential Oil: ₱ 30.00\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\n    15ml Glass Bottle: ₱ 20.00",
    ingredients: ["6453603cef19e3b71076cf41", "64535667ef19e3b71076cf0c", "645354f2ef19e3b71076cecb"],
    numberOfLiter: 2,
    productId: "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbh",
    totalEstimatedCost: 245,
  },
];

const cartRaw = ['["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]', '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]', '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]', '["d7cfd193d046f7db76ffa0cb1a40a988a65ff2d6e60825961077b24f8d639e43","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]', '["2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]'];

export default function CartPage() {
  const { data: session } = useSession();

  const { cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorNumber, setErrorNumber] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorPostal, setErrorPostal] = useState("");
  const [errorStreet, setErrorStreet] = useState("");
  const [errorCountry, setErrorCountry] = useState("");
  const [errorPaymentMethod, setErrorPaymentMethod] = useState("");

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorNumber, setIsErrorNumber] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorCity, setIsErrorCity] = useState(false);
  const [isErrorPostal, setIsErrorPostal] = useState(false);
  const [isErrorStreet, setIsErrorStreet] = useState(false);
  const [isErrorCountry, setIsErrorCountry] = useState(false);
  const [isErrorPaymentMethod, setIsErrorPaymentMethod] = useState(false);

  const [productToPurchase, setProductToPurchase] = useState([]);
  console.log(productToPurchase);

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
    if (!session) {
      return;
    }
    // setAddressLoaded(false);
    // setWishlistLoaded(false);
    // setOrderLoaded(false);
    axios.get("/api/address").then((response) => {
      setName(response?.data?.name);
      setPhoneNumber(response?.data?.phoneNumber);
      setEmail(response?.data?.email);
      setCity(response?.data?.city);
      setPostalCode(response?.data?.postalCode);
      setStreetAddress(response?.data?.streetAddress);
      setCountry(response?.data?.country);
      // setAddressLoaded(true);
    });

    // axios.get('/api/wishlist').then(response => {
    //   setWishedProducts(response.data.map(wp => wp.product));
    //   setWishlistLoaded(true);
    // });
    // axios.get('/api/orders').then(response => {
    //   setOrders(response.data);
    //   setOrderLoaded(true);
    // });
  }, [session]);

  const convertCartData = (cartDatas) => {
    const result = [];

    for (const cartData of cartDatas) {
      const [productId, categoryId, categoryName, categoryImage, formula, ingredients, numberOfLiter, totalEstimatedCost] = JSON.parse(cartData);

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

  function moreOfThisProduct(productId) {
    const item = cartProducts.find((item) => item.includes(productId));
    addProduct(item);

    const updatedProducts = productToPurchase.map((product) => {
      if (product.productId === productId) {
        return {
          ...product,
          numberOfLiter: product.numberOfLiter + 1,
        };
      }
      return product;
    });
    setProductToPurchase(updatedProducts);
  }
  function lessOfThisProduct(productId) {
    const item = cartProducts.find((item) => item.includes(productId));
    removeProduct(item);

    const updatedProducts = productToPurchase.map((product) => {
      if (product.productId === productId) {
        return {
          ...product,
          numberOfLiter: product.numberOfLiter - 1,
        };
      }
      return product;
    });
    setProductToPurchase(updatedProducts);
  }

  const paymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateFields = () => {
    let isValid = true;
    const nameRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const postalCodeRegex = /^\d{4,5}$/;

    // Validate name
    if (name.trim() === "") {
      isValid = false;
      setIsErrorName(true);
      setErrorName("Name is required");
    } else if (!nameRegex.test(name)) {
      isValid = false;
      setIsErrorName(true);
      setErrorName("Invalid name");
    } else {
      setIsErrorName(false);
      setErrorName("");
    }

    // Validate phone number
    if (phoneNumber.trim() === "") {
      isValid = false;
      setIsErrorNumber(true);
      setErrorNumber("Phone number is required");
    } else if (!phoneRegex.test(phoneNumber)) {
      isValid = false;
      setIsErrorNumber(true);
      setErrorNumber("Invalid phone number");
    } else {
      setIsErrorNumber(false);
      setErrorNumber("");
    }

    // Validate email
    if (email.trim() === "") {
      isValid = false;
      setIsErrorEmail(true);
      setErrorEmail("Email is required");
    } else if (!emailRegex.test(email)) {
      isValid = false;
      setIsErrorEmail(true);
      setErrorEmail("Invalid email");
    } else {
      setIsErrorEmail(false);
      setErrorEmail("");
    }

    if (city.trim() === "") {
      isValid = false;
      setIsErrorCity(true);
      setErrorCity("City is required");
    } else {
      setIsErrorCity(false);
      setErrorCity("");
    }

    // Validate postal code
    if (postalCode.trim() === "") {
      isValid = false;

      setIsErrorPostal(true);
      setErrorPostal("Postal code is required");
    } else if (!postalCodeRegex.test(postalCode)) {
      isValid = false;

      setIsErrorPostal(true);
      setErrorPostal("Invalid postal code");
    } else {
      setIsErrorPostal(false);
      setErrorPostal("");
    }

    if (streetAddress.trim() === "") {
      isValid = false;
      setIsErrorStreet(true);
      setErrorStreet("Street Adress is required");
    } else {
      setIsErrorStreet(false);
      setErrorStreet("");
    }

    // Validate country
    if (country.trim() === "") {
      isValid = false;
      setIsErrorCountry(true);
      setErrorCountry("Country is required");
    } else {
      setIsErrorCountry(false);
      setErrorCountry("");
    }

    if (paymentMethod.trim() === "") {
      isValid = false;
      setIsErrorPaymentMethod(true);
      setErrorPaymentMethod("Payment method required");
    } else {
      setIsErrorPaymentMethod(false);
      setErrorPaymentMethod("");
    }

    return isValid;
  };

  async function goToPayment() {
    if (validateFields()) {
      console.log("All fields are valid. Proceeding to payment...");
      await axios.post("/api/checkout", {
        name,
        phoneNumber,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paymentMethod,
        productToPurchase,
      });
    } else {
      console.log("One or more fields are invalid");
    }
  }
  const checkboxChangeHandler = (event, productId) => {
    if (event.target.checked) {
      const selectedProduct = products.find((product) => product.productId === productId);
      setProductToPurchase([...productToPurchase, selectedProduct]);
    } else {
      const updatedProductList = productToPurchase.filter((product) => product.productId !== productId);
      setProductToPurchase(updatedProductList);
    }
  };

  const subTotalOrderSummary = productToPurchase.reduce((acc, curr) => {
    const productCost = curr.numberOfLiter * curr.totalEstimatedCost;
    return acc + productCost;
  }, 0);

  console.log(subTotalOrderSummary);

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
                    <tbody className={classes["table-body"]} style={{ padding: "1px" }}>
                      {products.map((product) => (
                        <tr className={classes["table-row"]} key={product.productId}>
                          <td className={classes["select"]}>
                            <FormControlLabel control={<Checkbox onChange={(event) => checkboxChangeHandler(event, product.productId)} />} sx={{ marginRight: "0" }} />
                          </td>
                          <td className={classes["td-image"]}>
                            <div className={classes["image-wrapper"]}>
                              <Image src={product.categoryImage} alt="image of perfume" width={100} height={100} className={classes.image} loading="lazy" />
                              <Image src={outputImageBg} alt="background of image of perfume" className={classes["image-backgound"]} loading="lazy" />
                            </div>
                            <p className={classes["product-name"]}>{product.categoryName}</p>
                          </td>
                          <td className={classes["td-price"]}>
                            {product.ingredients.map((ingredientId) => {
                              const foundIngredient = ingredients.find((ingredient) => ingredient._id === ingredientId);
                              if (foundIngredient) {
                                return (
                                  <div key={foundIngredient._id}>
                                    <p>
                                      <i className={classes["ingredient-name"]}>
                                        {foundIngredient.title} {foundIngredient.composition}
                                      </i>
                                    </p>
                                    <p className={classes["ingredient-price"]}>₱{foundIngredient.price.toFixed(2)}</p>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </td>
                          <td className={classes["td-liters"]}>
                            <div>
                              <CutomButton onClick={() => lessOfThisProduct(product.productId)}>-</CutomButton>
                              <QuantityLabel>{product.numberOfLiter}</QuantityLabel>
                              <CutomButton onClick={() => moreOfThisProduct(product.productId)}>+</CutomButton>
                            </div>
                          </td>
                          <td className={classes["td-subtotal"]}>
                            <p>₱{(product.totalEstimatedCost * product.numberOfLiter).toFixed(2)}</p>
                          </td>
                        </tr>
                      ))}
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
                    <h2 className={classes["delivery-address-title"]}>Delivery Address</h2>
                  </div>
                  <div className={classes["delivery-address-inputs-wrapper"]}>
                    <FormControl
                      error={isErrorName}
                      className={classes["name"]}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${isErrorName ? "#FDEDED" : "none"}`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <OutlinedInput id="name" name="name" type="text" placeholder="Name" onChange={(ev) => setName(ev.target.value)} onBlur={validateFields} required aria-describedby="name-error-text" value={name} />
                      {isErrorName && errorName && (
                        <FormHelperText id="name-error-text" sx={{ marginLeft: "4px" }}>
                          {errorName}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      error={isErrorNumber}
                      className={classes["phone-number"]}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${isErrorNumber ? "#FDEDED" : "none"}`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <OutlinedInput id="phoneNumber" name="phoneNumber" type="tel" placeholder="Phone Number" onChange={(ev) => setPhoneNumber(ev.target.value)} onBlur={validateFields} required aria-describedby="number-error-text" value={phoneNumber} />
                      {isErrorNumber && errorNumber && (
                        <FormHelperText id="name-error-text" sx={{ marginLeft: "4px" }}>
                          {errorNumber}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      error={isErrorEmail}
                      className={classes["email"]}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${isErrorEmail ? "#FDEDED" : "none"}`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <OutlinedInput id="email" name="email" type="email" placeholder="Email" onChange={(ev) => setEmail(ev.target.value)} onBlur={validateFields} required aria-describedby="email-error-text" value={email} />
                      {isErrorEmail && errorEmail && (
                        <FormHelperText id="email-error-text" sx={{ marginLeft: "4px" }}>
                          {errorEmail}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <div className={classes.country}>
                      <FormControl
                        error={isErrorCity}
                        className={classes["city"]}
                        sx={{
                          m: 1,
                          width: "100%",
                          margin: "0",
                          "& div": {
                            fontSize: "14px",
                            backgroundColor: `${isErrorCity ? "#FDEDED" : "none"}`,
                          },
                          "& div input": {
                            padding: "4px",
                          },
                        }}
                      >
                        <OutlinedInput id="city" name="city" type="text" placeholder="City" onChange={(ev) => setCity(ev.target.value)} onBlur={validateFields} required aria-describedby="city-error-text" value={city} />
                        {isErrorCity && errorCity && (
                          <FormHelperText id="city-error-text" sx={{ marginLeft: "4px" }}>
                            {errorCity}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        error={isErrorPostal}
                        className={classes["postal-code"]}
                        sx={{
                          m: 1,
                          width: "100%",
                          margin: "0",
                          "& div": {
                            fontSize: "14px",
                            backgroundColor: `${isErrorPostal ? "#FDEDED" : "none"}`,
                          },
                          "& div input": {
                            padding: "4px",
                          },
                        }}
                      >
                        <OutlinedInput id="postalCode" name="postalCode" type="text" placeholder="Postal Code" onChange={(ev) => setPostalCode(ev.target.value)} onBlur={validateFields} required aria-describedby="postal-error-text" value={postalCode} />
                        {isErrorPostal && errorPostal && (
                          <FormHelperText id="postal-error-text" sx={{ marginLeft: "4px" }}>
                            {errorPostal}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </div>
                    <FormControl
                      error={isErrorStreet}
                      className={classes["street-address"]}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${isErrorStreet ? "#FDEDED" : "none"}`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <OutlinedInput id="streetAddress" name="streetAddress" type="text" placeholder="Street Address" onChange={(ev) => setStreetAddress(ev.target.value)} onBlur={validateFields} required aria-describedby="street-error-text" value={streetAddress} />
                      {isErrorStreet && errorStreet && (
                        <FormHelperText id="street-error-text" sx={{ marginLeft: "4px" }}>
                          {errorStreet}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      error={isErrorCountry}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${isErrorCountry ? "#FDEDED" : "none"}`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <OutlinedInput id="country" name="country" type="text" placeholder="Country" onChange={(ev) => setCountry(ev.target.value)} onBlur={validateFields} required aria-describedby="country-error-text" value={country} />
                      {isErrorCountry && errorCountry && (
                        <FormHelperText id="country-error-text" sx={{ marginLeft: "4px" }}>
                          {errorCountry}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className={classes["delivery-address"]} style={{ borderBottom: "1px solid #dadada" }}>
                    <h2 className={classes["delivery-address-title"]}>Payment Method</h2>
                  </div>
                  <FormControl
                    error={isErrorPaymentMethod}
                    sx={{
                      m: 1,
                      width: "100%",
                      padding: "1rem",
                      margin: "0",
                      "& div div": { padding: "0" },
                    }}
                  >
                    <Select
                      value={paymentMethod}
                      onChange={paymentMethodHandler}
                      onBlur={validateFields}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      required
                      sx={{
                        padding: ".4rem",
                        fontSize: "15px",
                      }}
                    >
                      <MenuItem value={"COD"}>COD</MenuItem>
                      <MenuItem value={"CRD"}>Paypal/Credit Card</MenuItem>
                    </Select>

                    {isErrorPaymentMethod && errorPaymentMethod && (
                      <FormHelperText id="country-error-text" sx={{ marginLeft: "4px" }}>
                        {errorPaymentMethod}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <PayPalScriptProvider options={{ "client-id": "AYhmiNUu130-H1rJSWMOPmNNaz0c0Pbu8LHhJx5uVoiblHLGAEMxuBIzZz4D5M_PJ74YKE7WZQiBYFH_" }}>
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: "245",
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        const details = await actions.order.capture();
                        const name = details.payer.name.given_name;
                        alert("Transaction completed by " + name);
                      }}
                    />
                  </PayPalScriptProvider>

                  <div className={classes["delivery-address"]} style={{ borderTop: "1px solid #dadada" }}>
                    <h2 className={classes["delivery-address-title"]}>Order Summary</h2>
                  </div>

                  <div className={classes["order-summary-wrapper"]}>
                    <p>
                      Subtotal ({productToPurchase.length} {productToPurchase.length > 1 ? "items" : "item"}):
                    </p>
                    <p>₱{subTotalOrderSummary.toFixed(2)}</p>
                    <p>Shipping:</p>
                    <p>₱80.00</p>
                  </div>
                  <div className={classes["order-summary-bottom"]}>
                    <div className={classes["voucher-wrapper"]}>
                      <FormControl
                        disabled={!productToPurchase.length}
                        className={classes["postal-code"]}
                        sx={{
                          m: 1,
                          width: "100%",
                          margin: "0",
                          "& div": {
                            fontSize: "14px",
                          },
                          "& div input": {
                            padding: "4px",
                          },
                        }}
                      >
                        <OutlinedInput type="text" placeholder="Voucher Code" name="voucher" id="voucher" />
                      </FormControl>
                      <CutomButton disabled={!productToPurchase.length}> Apply</CutomButton>
                    </div>
                    <div className={classes["total-payment-wrapper"]}>
                      <p>Total Payment: </p>
                      <p>₱{productToPurchase.length > 0 ? (subTotalOrderSummary + 80).toFixed(2) : 0}</p>
                    </div>
                    <Button
                      disabled={!(productToPurchase.length > 0)}
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
                      onClick={goToPayment}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </div>
              </RevealWrapper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
