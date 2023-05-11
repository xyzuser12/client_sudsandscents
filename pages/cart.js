import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
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
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
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
          <div className={classes["cart-items"]}>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Select all items"
                />

                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Liters</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, i) => (
                      <tr>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img
                              src={product.categoryImage}
                              alt={product.categoryName}
                            />
                          </ProductImageBox>
                          {product.title}
                        </ProductInfoCell>
                        <td>
                          <Button
                            onClick={() => lessOfThisProduct(product.productId)}
                          >
                            -
                          </Button>
                          <QuantityLabel>{product.numberOfLiter}</QuantityLabel>
                          <Button
                            onClick={() => moreOfThisProduct(product.productId)}
                          >
                            +
                          </Button>
                        </td>
                        <td>₱{product.totalEstimatedCost}</td>
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
                </Table>
              </div>
            )}
          </div>
          <div className={classes["order-infos"]}></div>
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
