import Image from "next/image";
import Header from "@/components/Header";
import crypto from "crypto";

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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import classes from "../../styles/checkout/Checkout.module.css";
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
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

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
      "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbt",
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
      "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbh",
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

const ingreRaw = [
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1684331184/bottle-of-lavender-essential-oil-with-fresh-royalty-free-image-920637186-1547242978_t8i1bb.jpg",
    price: 30,
    quantity: 100,
    title: "Jojoba",
    updatedAt: "2023-05-17T13:47:03.371Z",
    __v: 0,
    _id: "64465605be70cd3d8b62bd1d",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1684331184/bottle-of-lavender-essential-oil-with-fresh-royalty-free-image-920637186-1547242978_t8i1bb.jpg",
    price: 30,
    quantity: 100,
    title: "Jojoba",
    updatedAt: "2023-05-17T13:47:03.371Z",
    __v: 0,
    _id: "6453603cef19e3b71076cf41",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1684331184/bottle-of-lavender-essential-oil-with-fresh-royalty-free-image-920637186-1547242978_t8i1bb.jpg",
    price: 30,
    quantity: 100,
    title: "Jojoba",
    updatedAt: "2023-05-17T13:47:03.371Z",
    __v: 0,
    _id: "6453577cef19e3b71076cf18",
  },
];

const dataRaw = {
  city: "Manila",
  country: "Philippines",
  delivery: {
    standardDelivery: 90,
  },

  email: "formalejoraymartbedia@gmail.com",
  name: "Raymart Formalejo",
  paymentMethod: "COD",
  phoneNumber: "09452779188",
  postalCode: "1013",
  productToPurchase: [
    {
      categoryId: "644653bbbe70cd3d8b62bd0c",
      categoryImage:
        "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
      categoryName: "Custom Perfume",
      formula:
        "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
      ingredients: [
        "64465605be70cd3d8b62bd1d",
        "6453577cef19e3b71076cf18",
        "6453603cef19e3b71076cf41",
      ],
      numberOfLiter: 1,
      orderId:
        "99b887fdd2252445110176344f15e100ddc2fbf48d68b4ad167232d7a2625a5a",
      productId:
        "3e9a074ecba1826f6b645a430022b4072fa2d59d6ccb632b138ee53d3e4e024f",
      totalEstimatedCost: 245,
      purchaseDate: "2023-05-21 14:07:32",
    },
  ],

  status: "Processing",
  streetAddress: "1247 Yuseco St. Tondo Manila",
  totalPayment: 335,
};

const cityList = [
  "Abra",
  "Agusan del Norte",
  "Agusan del Sur",
  "Aklan",
  "Albay",
  "Antique",
  "Apayao",
  "Aurora",
  "Basilan",
  "Batanes",
  "Batangas",
  "Benguet",
  "Biliran",
  "Bohol",
  "Bukidnon",
  "Bulacan",
  "Cagayan",
  "Camarines Norte",
  "Camarines Sur",
  "Camiguin",
  "Capiz",
  "Catanduanes",
  "Cavite",
  "Cebu",
  "Compostela Valley",
  "Cotabato",
  "Davao del Norte",
  "Davao del Sur",
  "Davao Occindental",
  "Davao Oriental",
  "Dinagat Islands",
  "Eastern Samar",
  "Guimaras",
  "Ifugao",
  "Ilocos Norte",
  "Ilocos Sur",
  "Iloilo",
  "Isabela",
  "Kalinga",
  "La Union",
  "Laguna",
  "Lanao del Norte",
  "Lanao del Sur",
  "Leyte",
  "Maguindanao",
  "Marinduque",
  "Masbate",
  "Metro Manila",
  "Misamis Occidental",
  "Misamis Oriental",
  "Mountain Province",
  "Negros Occidental",
  "Negros Oriental",
  "Northern Samar",
  "Nueva Ecija",
  "Nueva Vizcaya",
  "Occidental Mindoro",
  "Oriental Mindoro",
  "Palawan",
  "Pampanga",
  "Pangasinan",
  "Quezon",
  "Quirino",
  "Rizal",
  "Romblon",
  "Samar",
  "Sarangani",
  "Siquijor",
  "Sorsogon",
  "South Cotabato",
  "Southern Leyte",
  "Sultan Kudarat",
  "Sulu",
  "Surigao del Norte",
  "Surigao del Sur",
  "Tarlac",
  "Tawi-tawi",
  "Zambales",
  "Zamboanga del Norte",
  "Zamboanga del Sur",
  "Zamboanga Sibugay",
  "Manila",
];

const deliveryRaw = [
  {
    bookMyOwn: 0,
    nextDayDelivery: 180,
    provincialDelivery: 180,
    sameDayDelivery: 230,
    standardDelivery: 90,
  },
];

const productPurchaseRaw = [
  {
    categoryId: "644653bbbe70cd3d8b62bd0c",
    categoryImage:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula:
      "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
    ingredients: [
      "64465605be70cd3d8b62bd1d",
      "6453577cef19e3b71076cf18",
      "6453603cef19e3b71076cf41",
    ],
    numberOfLiter: 1,
    orderId: "99b887fdd2252445110176344f15e100ddc2fbf48d68b4ad167232d7a2625a5a",
    productId:
      "3e9a074ecba1826f6b645a430022b4072fa2d59d6ccb632b138ee53d3e4e024f",
    totalEstimatedCost: 245,
    purchaseDate: "2023-05-21 14:07:32",
  },
  {
    categoryId: "644653bbbe75cd3d8b62bd0c",
    categoryImage:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
    categoryName: "Custom Perfume",
    formula:
      "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
    ingredients: [
      "64465605be70cd3d8b62bd1d",
      "6453577cef19e3b71076cf18",
      "6453603cef19e3b71076cf41",
    ],
    numberOfLiter: 1,
    orderId: "99b887fdd2252445110176344f15e100ddc2fbf48d68b4ad167232d7a2625a5a",
    productId:
      "3e9a074ecba1826f6b645a430022b4072fa2d59d6ccb632b138ee53d3e4e024f",
    totalEstimatedCost: 245,
    purchaseDate: "2023-05-21 14:07:32",
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { productToPurchase } = router.query;
  const parsedProductToPurchase = productToPurchase
    ? JSON.parse(productToPurchase)
    : [];
  const { data: session } = useSession();
  const [status, setStatus] = useState("Processing");
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("Philippines");
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

  const [disableSameDayDelivery, setDisableSameDayDelivery] = useState(false);
  const [deliveryOptionsList, setDeliveryOptionsList] = useState([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState();
  const [shippingFee, setShippingFee] = useState(0);
  // const [ingre]
  const [ingredients, setIngredients] = useState([]);
  const [productToPurchaseEmail, setProductToPurchaseEmail] = useState([]);
  const provincialAdditionalFee = 50;

  const randomBytes = crypto.randomBytes(16); // Generate a 16-byte (128-bit) random number
  const uniqueId = crypto
    .createHash("sha256")
    .update(randomBytes)
    .digest("hex");
  const orderId = uniqueId.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    axios.get("/api/delivery").then((response) => {
      setDeliveryOptionsList(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setIngredients(response.data);
    });
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 13) {
      setDisableSameDayDelivery(true);
    }
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    axios.get("/api/address").then((response) => {
      setName(response?.data?.name);
      setPhoneNumber(response?.data?.phoneNumber);
      setEmail(response?.data?.email);
      setCity(response?.data?.city);
      setPostalCode(response?.data?.postalCode);
      setStreetAddress(response?.data?.streetAddress);
      setCountry(response?.data?.country);
    });
  }, [session]);

  const openModalChangeHandler = () => {
    setOpenModal(true);
  };

  const closeModalChangeHandler = () => {
    setOpenModal(false);
    document.body.style.overflow = "";
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
      setErrorCity("City/Region is required");
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

  const subTotalOrderSummary = parsedProductToPurchase?.reduce((acc, curr) => {
    return acc + curr.totalEstimatedCost;
  }, 0);

  const calculateTotalLiters = (toPhurchase) => {
    let totalAmount = 0;
    toPhurchase.forEach((item) => {
      totalAmount += item.numberOfLiter;
    });
    return totalAmount;
  };

  const cityChangeHandler = (cityValue) => () => {
    setCity(cityValue);
    if (cityValue !== "Manila" && cityValue !== "Metro Manila") {
      const standardShippingValue = `provincialDelivery: ${deliveryOptionsList[0]?.nextDayDelivery}`;

      const keyValuePair = standardShippingValue
        .split(":")
        .map((item) => item.trim());
      const selectedOption = {
        [keyValuePair[0]]: parseInt(keyValuePair[1]),
      };
      setSelectedShippingOption(selectedOption);
    }
  };

  const shippingRadioChangeHandler = (e) => {
    const selectedValue = e.target.value;
    const keyValuePair = selectedValue.split(":").map((item) => item.trim());
    const selectedOption = {
      [keyValuePair[0]]: parseInt(keyValuePair[1]),
    };
    setSelectedShippingOption(selectedOption);
  };

  const shippingOptionTextDisplay = () => {
    if (selectedShippingOption) {
      const ship = Object.keys(selectedShippingOption)[0];
      if (ship === "bookMyOwn") return "Fee";
      if (ship === "nextDayDelivery") return "Next day delivery";
      if (ship === "sameDayDelivery") return "Same day delivery";
      if (ship === "standardDelivery") return "Metro Manila(Standard)";
      if (ship === "provincialDelivery") return "Provincial(Standard)";
      else {
        return;
      }
    }
  };

  const paymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  function getCurrentDateTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return currentDateTime;
  }

  function getFormattedDate(inputDate) {
    const dataRaw = getCurrentDateTime();
    const dateObj = new Date(dataRaw);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = dateObj.toLocaleString("en-PH", options);
    const [datePart] = formattedDate.split("/");
    return `${datePart}`;
  }

  function processProductPurchaseRaw(productRawData, ingredientsRawData) {
    return productRawData.map((item) => {
      const ingredients = item.ingredients.map((ingredientId) => {
        const ingredient = ingredientsRawData.find(
          (ingre) => ingre._id === ingredientId
        );
        return {
          _id: ingredient?._id,
          title: ingredient?.title,
          price: ingredient?.price,
          composition: ingredient?.composition,
        };
      });

      return {
        categoryId: item?.categoryId,
        categoryName: item?.categoryName,
        formula: item?.formula,
        ingredients,
        numberOfLiter: item?.numberOfLiter,
        productId: item?.productId,
        totalEstimatedCost: item?.totalEstimatedCost.toString(),
      };
    });
  }

  const calculateTotalPayment = () => {
    if (selectedShippingOption) {
      const ship = Object.keys(selectedShippingOption)[0];

      if (
        parsedProductToPurchase?.length > 0 &&
        ship === "provincialDelivery"
      ) {
        return (
          subTotalOrderSummary +
          (Object.values(selectedShippingOption)[0] +
            provincialAdditionalFee *
              calculateTotalLiters(parsedProductToPurchase) -
            provincialAdditionalFee)
        );
      } else if (parsedProductToPurchase?.length && ship === "bookMyOwn") {
        return subTotalOrderSummary;
      } else if (
        parsedProductToPurchase?.length &&
        ship !== "provincialDelivery"
      ) {
        return subTotalOrderSummary + Object.values(selectedShippingOption)[0];
      }
    } else {
      return subTotalOrderSummary;
    }
  };

  const productToPurchaseRaw = [
    {
      categoryId: "644653bbbe70cd3d8b62bd0c",
      categoryImage:
        "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
      categoryName: "Custom Perfume",
      formula:
        "\n    To make this blend you will need:\n    10ml jojoba oil\n    15 drops frankincense essential oil\n    9 drops lavender essential oil\n    6 drops cedar wood essential oil\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\n    Directions:\n    \n    Pour the jojoba oil into a glass bottle.\n    Add the drops of essential oils carefully.\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\n    Cost Estimation:\n    \n    10ml Jojoba Oil: ₱ 120.00\n    15 drops Frankincense Essential Oil: ₱ 50.00\n    9 drops Lavender Essential Oil: ₱ 30.00\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\n    15ml Glass Bottle: ₱ 20.00",
      ingredients: [
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
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          id: "645354f2ef19e3b71076cecb",
          image:
            "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182831/cedarwood_zuynog.webp",
          price: 123,
          quantity: 234,
          title: "Rose",
        },
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
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
          id: "645354f2ef19e3b71076cecb",
          image:
            "https://res.cloudinary.com/dkppw65bv/image/upload/v1683182831/cedarwood_zuynog.webp",
          price: 123,
          quantity: 234,
          title: "Rose",
        },
      ],
      numberOfLiter: 2,
      productId:
        "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe",
      totalEstimatedCost: 245,
    },
  ];

  async function placeOrderHandler() {
    if (validateFields()) {
      const data = {
        orderId,
        purchaseDate: getCurrentDateTime(),
        name,
        phoneNumber,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paymentMethod,
        productToPurchase: parsedProductToPurchase,
        status,
        delivery: selectedShippingOption,
        totalPayment: calculateTotalPayment(),
      };
      const dataOrderForEmail = {
        orderId,
        purchaseDate: getFormattedDate(),
        name,
        phoneNumber,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        paymentMethod,
        productToPurchase: processProductPurchaseRaw(
          productPurchaseRaw,
          ingredients
        ),
        status,
        delivery: selectedShippingOption,
        totalPayment: calculateTotalPayment(),
      };
      console.log(dataOrderForEmail);
      console.log(JSON.parse(productToPurchase));
      console.log(typeof productToPurchase);

      // ======================= ORDERS
      await axios
        .post("/api/orders", {
          ...data,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setOpenModal(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
      console.log({
        ...dataOrderForEmail,
      });

      // ========================== EMAIL
      await axios
        .post(
          "/api/email",
          JSON.stringify({
            ...dataOrderForEmail,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error("💥💥💥💥" + err);
        });
    } else {
      console.log("One or more fields are invalid");
    }
  }

  const gotoHome = () => {
    router.push("/");
  };
  console.log(parsedProductToPurchase);
  return (
    <div className={classes.container}>
      <Modal
        open={openModal}
        onClose={gotoHome}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "400",
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
            onClick={gotoHome}
            sx={{
              color: "#aaaaaa",
              alignSelf: "end",
              "&:hover": {
                color: "#444",
                transition: "color 0.15s",
              },
            }}
          />
          <Image
            src={
              "https://res.cloudinary.com/dkppw65bv/image/upload/c_scale,w_133/v1684600258/successOrderIcon_yeveeq.png"
            }
            alt="image for success order"
            width={80}
            height={100}
            style={{
              alignSelf: "center",
              height: "88px",
              width: "70px",
            }}
          />
          <h2
            style={{
              alignSelf: "center",
              textAlign: "center",
              color: "#DE89A1",
              fontSize: "18px",
              margin: "10px 0",
            }}
            id="success-modal-title"
          >
            Thank you for your order!
          </h2>
          <p
            style={{
              alignSelf: "center",
              textAlign: "center",
              color: "#545454",
              fontSize: "13px",
              width: "76%",
              marginBottom: "2rem",
            }}
          >
            {" "}
            Your order has been successfully placed! An email confirmation will
            be sent to you shortly.
          </p>
          <div>
            <h3 style={{ color: "#545454", marginBottom: "0.8rem" }}>
              Order Summary
            </h3>
            <Divider />
            <div className={classes["modal-products-container"]}>
              {parsedProductToPurchase &&
                parsedProductToPurchase.map((product) => {
                  return (
                    <div
                      key={product.productId}
                      className={`${classes["product-wrapper"]} ${classes["modal"]}`}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          alignItems: "center",
                        }}
                      >
                        <div>
                          <p>{`${product.categoryName} ${product.numberOfLiter}L`}</p>
                        </div>
                      </div>
                      <div>
                        <p>{`₱${(
                          product.numberOfLiter * product.totalEstimatedCost
                        ).toFixed(2)} `}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
            <Divider />
            <div className={classes["modal-subtotal-container"]}>
              <div>
                <p>
                  Subtotal ({parsedProductToPurchase?.length}{" "}
                  {parsedProductToPurchase?.length > 1 ? "items" : "item"}):
                </p>
                <p>₱{subTotalOrderSummary.toFixed(2)}</p>
              </div>
              <div>
                <p>{`${
                  selectedShippingOption ? shippingOptionTextDisplay() : ""
                } (Total Weight: ${calculateTotalLiters(
                  parsedProductToPurchase
                )}L)`}</p>
                <p>{`₱${
                  selectedShippingOption
                    ? Object.keys(selectedShippingOption)[0] !==
                      "provincialDelivery"
                      ? Object.values(selectedShippingOption)[0].toFixed(2)
                      : Object.values(selectedShippingOption)[0] +
                        provincialAdditionalFee *
                          calculateTotalLiters(parsedProductToPurchase) -
                        provincialAdditionalFee
                    : "0"
                }`}</p>
              </div>
            </div>
            <Divider />
            <div className={classes["modal-total-container"]}>
              <p>Total: </p>
              <p>
                ₱
                {parsedProductToPurchase?.length > 0
                  ? calculateTotalPayment().toFixed(2)
                  : 0}
              </p>
            </div>

            <Button
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
              // onClick={placeOrderHandler}
            >
              View Orders
            </Button>
          </div>
        </Box>
      </Modal>
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
          <Link href={"/cart"}>
            <h2 className={classes.cart}>Cart</h2>
          </Link>
          <Link href={"/checkout"}>
            <h2
              className={`${classes.cart} ${
                router.pathname === "/checkout" ? classes.active : ""
              }`}
            >
              Checkout
            </h2>
          </Link>
        </div>

        <div className={classes["cart-container"]}>
          <RevealWrapper delay={0} className={classes["cart-items"]}>
            {!parsedProductToPurchase?.length && (
              <div>Please select first an item to your cart.</div>
            )}
            {parsedProductToPurchase?.length > 0 && (
              <Paper sx={{ padding: "1.4rem" }}>
                <div className={classes["checkout-details-container"]}>
                  <div className={classes["delivery-address-inputs-wrapper"]}>
                    <h2>Billing Details</h2>
                    <FormControl
                      error={isErrorName}
                      className={classes["name"]}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${
                            isErrorName ? "#FDEDED" : "none"
                          }`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <label htmlFor="name" className={classes.label}>
                        <p>
                          Name<span>*</span>
                        </p>
                      </label>
                      <OutlinedInput
                        id="name"
                        name="name"
                        type="text"
                        onChange={(ev) => setName(ev.target.value)}
                        onBlur={validateFields}
                        required
                        aria-describedby="name-error-text"
                        value={name}
                      />
                      {isErrorName && errorName && (
                        <FormHelperText
                          id="name-error-text"
                          sx={{ marginLeft: "4px" }}
                        >
                          {errorName}
                        </FormHelperText>
                      )}
                    </FormControl>
                    <FormControl
                      error={isErrorCountry}
                      sx={{
                        m: 1,
                        width: "100%",
                        margin: "0",
                        pointerEvents: "none !important",
                        "& div": {
                          fontSize: "14px",
                          backgroundColor: `${
                            isErrorCountry ? "#FDEDED" : "none"
                          }`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <label htmlFor="country" className={classes.label}>
                        <p>
                          Country<span>*</span>
                        </p>
                      </label>
                      <OutlinedInput
                        id="country"
                        name="country"
                        type="text"
                        placeholder="Country"
                        onChange={(ev) => setCountry(ev.target.value)}
                        onBlur={validateFields}
                        required
                        aria-describedby="country-error-text"
                        value={country}
                      />
                      {isErrorCountry && errorCountry && (
                        <FormHelperText
                          id="country-error-text"
                          sx={{ marginLeft: "4px" }}
                        >
                          {errorCountry}
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
                          backgroundColor: `${
                            isErrorNumber ? "#FDEDED" : "none"
                          }`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <label htmlFor="phoneNumber" className={classes.label}>
                        <p>
                          Phone number<span>*</span>
                        </p>
                      </label>
                      <OutlinedInput
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="Phone Number"
                        onChange={(ev) => setPhoneNumber(ev.target.value)}
                        onBlur={validateFields}
                        required
                        aria-describedby="number-error-text"
                        value={phoneNumber}
                      />
                      {isErrorNumber && errorNumber && (
                        <FormHelperText
                          id="name-error-text"
                          sx={{ marginLeft: "4px" }}
                        >
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
                          backgroundColor: `${
                            isErrorEmail ? "#FDEDED" : "none"
                          }`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <label htmlFor="email" className={classes.label}>
                        <p>
                          Email<span>*</span>
                        </p>
                      </label>
                      <OutlinedInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={(ev) => setEmail(ev.target.value)}
                        onBlur={validateFields}
                        required
                        aria-describedby="email-error-text"
                        value={email}
                      />
                      {isErrorEmail && errorEmail && (
                        <FormHelperText
                          id="email-error-text"
                          sx={{ marginLeft: "4px" }}
                        >
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
                            backgroundColor: `${
                              isErrorCity ? "#FDEDED" : "none"
                            }`,
                          },
                          "& div input": {
                            padding: "4px",
                          },
                        }}
                      >
                        <label htmlFor="city" className={classes.label}>
                          <p>
                            City/Region<span>*</span>
                          </p>
                        </label>

                        <Select
                          required
                          name="city"
                          labelId="city"
                          id="city"
                          onBlur={validateFields}
                          aria-describedby="city-error-text"
                          // defaultValue={city}
                          value={city}
                          sx={{
                            "& div": {
                              padding: "4px",
                            },
                          }}
                        >
                          {cityList.map((city) => {
                            return (
                              <MenuItem
                                key={city}
                                value={city.toString()}
                                onClick={cityChangeHandler(city)}
                                sx={{
                                  // border: "1px solid red",
                                  fontSize: "15px",
                                }}
                              >
                                {city}
                              </MenuItem>
                            );
                          })}
                        </Select>
                        {isErrorCity && errorCity && (
                          <FormHelperText
                            id="city-error-text"
                            sx={{ marginLeft: "4px" }}
                          >
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
                            backgroundColor: `${
                              isErrorPostal ? "#FDEDED" : "none"
                            }`,
                          },
                          "& div input": {
                            padding: "4px",
                          },
                        }}
                      >
                        <label htmlFor="postalCode" className={classes.label}>
                          <p>
                            Postal Code<span>*</span>
                          </p>
                        </label>
                        <OutlinedInput
                          id="postalCode"
                          name="postalCode"
                          type="text"
                          onChange={(ev) => setPostalCode(ev.target.value)}
                          onBlur={validateFields}
                          required
                          aria-describedby="postal-error-text"
                          value={postalCode}
                        />
                        {isErrorPostal && errorPostal && (
                          <FormHelperText
                            id="postal-error-text"
                            sx={{ marginLeft: "4px" }}
                          >
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
                          backgroundColor: `${
                            isErrorStreet ? "#FDEDED" : "none"
                          }`,
                        },
                        "& div input": {
                          padding: "4px",
                        },
                      }}
                    >
                      <label htmlFor="streetAddress" className={classes.label}>
                        <p>
                          Street address<span>*</span>
                        </p>
                      </label>
                      <OutlinedInput
                        id="streetAddress"
                        name="streetAddress"
                        type="text"
                        onChange={(ev) => setStreetAddress(ev.target.value)}
                        onBlur={validateFields}
                        required
                        aria-describedby="street-error-text"
                        value={streetAddress}
                      />
                      {isErrorStreet && errorStreet && (
                        <FormHelperText
                          id="street-error-text"
                          sx={{ marginLeft: "4px" }}
                        >
                          {errorStreet}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </div>
                  <div className={classes["shipping-options-wrapper"]}>
                    <h2>Shipping Options</h2>
                    <div className={classes["shipping-radio-btn-wrapper"]}>
                      <FormControl
                        sx={{
                          "& div": {
                            display: "flex",
                            flexDirection: "column",
                          },
                          "& div label": { width: "100%" },
                        }}
                      >
                        <RadioGroup
                          row
                          aria-labelledby="shipping-options-wrapper"
                          name="shipping-options-wrapper"
                          onChange={shippingRadioChangeHandler}
                        >
                          <FormControlLabel
                            disabled={
                              (city === "Manila" || city === "Metro Manila") &&
                              calculateTotalLiters(parsedProductToPurchase) <= 4
                                ? false
                                : true
                            }
                            // [keyValuePair[0]]: parseInt(keyValuePair[1])
                            value={`nextDayDelivery: ${deliveryOptionsList[0]?.nextDayDelivery}`}
                            control={<Radio size="small" />}
                            label="Next day delivery Metro Manila (up to 4L only)"
                            sx={{
                              fontSize: "14px",
                              "& span:last-child": {
                                fontSize: "14px",
                                color: "#545454",
                              },
                            }}
                          />
                          <FormControlLabel
                            disabled={
                              city === "Manila" ||
                              city === "Metro Manila" ||
                              disableSameDayDelivery
                            }
                            value={`sameDayDelivery: ${deliveryOptionsList[0]?.sameDayDelivery}`}
                            control={<Radio size="small" />}
                            label="Same day delivery Metro Manila (up to 6L only - 1:00pm cut-off)"
                            sx={{
                              fontSize: "14px",
                              "& span:last-child": {
                                fontSize: "14px",
                                color: "#545454",
                              },
                            }}
                          />
                          <FormControlLabel
                            disabled={
                              city === "Manila" || city === "Metro Manila"
                                ? false
                                : true
                            }
                            value={`standardDelivery: ${deliveryOptionsList[0]?.standardDelivery}`}
                            control={<Radio size="small" />}
                            label=" Standard Shipping Metro Manila (2-5 Days)"
                            sx={{
                              fontSize: "14px",
                              "& span:last-child": {
                                fontSize: "14px",
                                color: "#545454",
                              },
                            }}
                          />
                          <FormControlLabel
                            disabled={
                              city === "Manila" || city === "Metro Manila"
                                ? true
                                : false
                            }
                            checked={
                              city === "Manila" || city === "Metro Manila"
                                ? false
                                : true
                            }
                            value={`provincialDelivery: ${deliveryOptionsList[0]?.provincialDelivery}`}
                            control={<Radio size="small" />}
                            label="Standard Shipping Provincial (5-10 Days)"
                            sx={{
                              fontSize: "14px",
                              "& span:last-child": {
                                fontSize: "14px",
                                color: "#545454",
                              },
                            }}
                          />
                          <FormControlLabel
                            disabled={
                              city === "Manila" || city === "Metro Manila"
                                ? false
                                : true
                            }
                            value={`bookMyOwn: ${deliveryOptionsList[0]?.bookMyOwn}`}
                            control={<Radio size="small" />}
                            label="Book My Own"
                            sx={{
                              fontSize: "14px",
                              "& span:last-child": {
                                fontSize: "14px",
                                color: "#545454",
                              },
                            }}
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </Paper>
            )}
          </RevealWrapper>
          <div className={classes["order-infos"]}>
            {!!parsedProductToPurchase?.length && (
              <RevealWrapper delay={100}>
                <Paper className={classes["order-infos-wrapper"]}>
                  <div className={classes["delivery-address"]}>
                    <h2 className={classes["delivery-address-title"]}>
                      Products
                    </h2>
                  </div>
                  <div className={classes["products-container"]}>
                    {parsedProductToPurchase &&
                      parsedProductToPurchase.map((product) => {
                        return (
                          <div
                            key={product.productId}
                            className={classes["product-wrapper"]}
                          >
                            <div
                              style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                              }}
                            >
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
                                    "https://res.cloudinary.com/dkppw65bv/image/upload/c_scale,w_50/v1684510657/outputImage_background_tasre3.png"
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
                              <div>
                                <p>{`${product.categoryName} ${product.numberOfLiter}L`}</p>
                              </div>
                            </div>
                            <div>
                              <p>{`₱${product.totalEstimatedCost.toFixed(
                                2
                              )} `}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className={classes["order-summary-wrapper"]}>
                    <p>
                      Subtotal ({parsedProductToPurchase?.length}{" "}
                      {parsedProductToPurchase?.length > 1 ? "items" : "item"}):
                    </p>
                    <p>₱{subTotalOrderSummary.toFixed(2)}</p>
                    <p>{`${
                      selectedShippingOption ? shippingOptionTextDisplay() : ""
                    } (Total Weight: ${calculateTotalLiters(
                      parsedProductToPurchase
                    )}L)`}</p>
                    {parsedProductToPurchase && (
                      <p>{`₱${
                        selectedShippingOption
                          ? Object.keys(selectedShippingOption)[0] !==
                            "provincialDelivery"
                            ? Object.values(selectedShippingOption)[0].toFixed(
                                2
                              )
                            : Object.values(selectedShippingOption)[0] +
                              provincialAdditionalFee *
                                calculateTotalLiters(parsedProductToPurchase) -
                              provincialAdditionalFee
                          : "0"
                      }`}</p>
                    )}
                  </div>
                  <div
                    className={classes["delivery-address"]}
                    style={{ borderBottom: "1px solid #dadada" }}
                  >
                    <h2 className={classes["delivery-address-title"]}>
                      Payment Method
                    </h2>
                  </div>
                  <FormControl
                    error={isErrorPaymentMethod}
                    sx={{
                      m: 1,
                      width: "100%",
                      padding: " 1rem 2rem",
                      margin: "0",
                      borderBottom: "1px solid #dadada",
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
                    </Select>

                    {isErrorPaymentMethod && errorPaymentMethod && (
                      <FormHelperText
                        id="country-error-text"
                        sx={{ marginLeft: "4px" }}
                      >
                        {errorPaymentMethod}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <div className={classes["order-summary-bottom"]}>
                    <div className={classes["voucher-wrapper"]}>
                      <FormControl
                        disabled={!parsedProductToPurchase.length}
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
                        <OutlinedInput
                          type="text"
                          placeholder="Voucher Code"
                          name="voucher"
                          id="voucher"
                        />
                      </FormControl>
                      <CustomButton disabled={!parsedProductToPurchase.length}>
                        Apply
                      </CustomButton>
                    </div>
                    <div className={classes["total-payment-wrapper"]}>
                      <p>Total: </p>
                      <p>
                        ₱
                        {parsedProductToPurchase?.length > 0
                          ? calculateTotalPayment().toFixed(2)
                          : 0}
                      </p>
                    </div>

                    <Button
                      disabled={!(parsedProductToPurchase?.length > 0)}
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
                      onClick={placeOrderHandler}
                    >
                      Place Order
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
