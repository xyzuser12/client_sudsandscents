// import Header from "@/components/Header";
// import Title from "@/components/Title";
// import Center from "@/components/Center";
import { useContext, useEffect, useState } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
// import Button from "@/components/Button";
import styled from "styled-components";
// import WhiteBox from "@/components/WhiteBox";
// import { RevealWrapper } from "next-reveal";
// import Input from "@/components/Input";
// import { useEffect, useState } from "react";
import axios from "axios";
// import Spinner from "@/components/Spinner";
// import ProductBox from "@/components/
// ProductBox";
// import Tabs from "@/components/Tabs";
// import SingleOrder from "@/components/SingleOrder";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import classes from "../styles/account/Account.module.css";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import profileTemp from "/public/assets/profiletemp.jpg";
const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [userId, setUserId] = useState("");
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

  console.log(session);
  useEffect(() => {
    axios.get("/api/users", email).then((response) => {
      console.log(response);
      setUserId(response.data._id);
    });
  });

  function saveAccountDetails() {
    const data = {
      name,
      userId,
      phoneNumber,
      email,
      city,
      streetAddress,
      postalCode,
      country,
    };
    axios
      .put("/api/address", data)
      .then((response) => {
        setAlertSeverity("success");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        setAlertSeverity("error");
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
      });
  }

  useEffect(() => {
    if (!session) {
      return;
    }

    axios.get("/api/address").then((response) => {
      console.log(response);
      setName(response?.data?.name);
      setPhoneNumber(response?.data?.phoneNumber);
      setEmail(response?.data?.email);
      setCity(response?.data?.city);
      setPostalCode(response?.data?.postalCode);
      setStreetAddress(response?.data?.streetAddress);
      setCountry(response?.data?.country);
    });
  }, [session]);
  const validateFields = () => {
    let isValid = true;
    const nameRegex = /^[a-zA-Z\s.,]*$/;
    const phoneRegex = /^09\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const postalCodeRegex = /^\d{4,5}$/;
    const onlyLetter = /^[A-Za-z\s]+$/;
    const onlyNumber = /^[1-9]\d*$/;
    const noSpecialChar = /^[a-zA-Z0-9]+$/;

    // Validate name
    if (!nameRegex.test(name)) {
      isValid = false;
      setIsErrorName(true);
      setErrorName("Invalid name");
    } else {
      isValid = true;
      setIsErrorName(false);
      setErrorName("");
    }

    // Validate phone number
    if (!phoneRegex.test(phoneNumber)) {
      isValid = false;
      setIsErrorNumber(true);
      setErrorNumber("Invalid phone number");
    } else {
      isValid = true;
      setIsErrorNumber(false);
      setErrorNumber("");
    }

    // Validate email
    if (!emailRegex.test(email)) {
      isValid = false;
      setIsErrorEmail(true);
      setErrorEmail("Invalid email");
    } else {
      isValid = true;
      setIsErrorEmail(false);
      setErrorEmail("");
    }

    if (!onlyLetter.test(city)) {
      isValid = false;
    }

    // Validate postal code
    if (!postalCodeRegex.test(postalCode)) {
      isValid = false;

      setIsErrorPostal(true);
      setErrorPostal("Invalid postal code");
    } else {
      isValid = true;
      setIsErrorPostal(false);
      setErrorPostal("");
    }

    // Validate country

    return isValid;
  };

  // const {data:session} = useSession();
  // const [name,setName] = useState('');
  // const [email,setEmail] = useState('');
  // const [city,setCity] = useState('');
  // const [postalCode,setPostalCode] = useState('');
  // const [streetAddress,setStreetAddress] = useState('');
  // const [country,setCountry] = useState('');
  // const [addressLoaded,setAddressLoaded] = useState(true);
  // const [wishlistLoaded,setWishlistLoaded] = useState(true);
  // const [orderLoaded,setOrderLoaded] = useState(true);
  // const [wishedProducts,setWishedProducts] = useState([]);
  // const [activeTab, setActiveTab] = useState('Orders');
  // const [orders, setOrders] = useState([]);

  // async function logout() {
  //   await signOut({
  //     callbackUrl: process.env.NEXT_PUBLIC_URL,
  //   });
  // }
  // async function login() {
  //   await signIn('google');
  // }
  // function saveAddress() {
  //   const data = {name,email,city,streetAddress,postalCode,country};
  //   axios.put('/api/address', data);
  // }
  // useEffect(() => {
  //   if (!session) {
  //     return;
  //   }
  //   setAddressLoaded(false);
  //   setWishlistLoaded(false);
  //   setOrderLoaded(false);
  //   axios.get('/api/address').then(response => {
  //     setName(response.data.name);
  //     setEmail(response.data.email);
  //     setCity(response.data.city);
  //     setPostalCode(response.data.postalCode);
  //     setStreetAddress(response.data.streetAddress);
  //     setCountry(response.data.country);
  //     setAddressLoaded(true);
  //   });
  //   axios.get('/api/wishlist').then(response => {
  //     setWishedProducts(response.data.map(wp => wp.product));
  //     setWishlistLoaded(true);
  //   });
  //   axios.get('/api/orders').then(response => {
  //     setOrders(response.data);
  //     setOrderLoaded(true);
  //   });
  // }, [session]);
  // function productRemovedFromWishlist(idToRemove) {
  //   setWishedProducts(products => {
  //     return [...products.filter(p => p._id.toString() !== idToRemove)];
  //   });
  // }
  return (
    <>
      <div className={classes.container}>
        {alertVisible && (
          <Alert
            severity={alertSeverity}
            variant="filled"
            sx={{
              position: "fixed",
              top: "1rem",
              left: "50%",
              transform: "translateX(-50%) !important",
              zIndex: "9999999",
            }}
          >
            {alertSeverity === "success"
              ? "Your information has been successfully saved!"
              : "Something went wrong, please try again."}
          </Alert>
        )}
        <div className={classes["inner-container"]}>
          <h2 className={classes["account-title"]}>Account Details</h2>
          <div className={classes["account-container"]}>
            <div className={classes["information-wrapper"]}>
              <h3>Information</h3>
              <FormControl
                error={isErrorName}
                className={classes["name"]}
                size="small"
                sx={{
                  m: 1,
                  width: "100%",
                  margin: "0",
                  "& div": {
                    fontSize: "14px",
                    backgroundColor: `${isErrorName ? "#FDEDED" : "none"}`,
                  },
                }}
              >
                <label for="name" className={classes.label}>
                  Name
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
                error={isErrorNumber}
                className={classes["phone-number"]}
                size="small"
                sx={{
                  m: 1,
                  width: "100%",
                  margin: "0",
                  "& div": {
                    fontSize: "14px",
                    backgroundColor: `${isErrorNumber ? "#FDEDED" : "none"}`,
                  },
                }}
              >
                <label for="phoneNumber" className={classes.label}>
                  Phone number
                </label>

                <OutlinedInput
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
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
                size="small"
                sx={{
                  m: 1,
                  width: "100%",
                  margin: "0",
                  "& div": {
                    fontSize: "14px",
                    backgroundColor: `${isErrorEmail ? "#FDEDED" : "none"}`,
                  },
                }}
              >
                <label for="email" className={classes.label}>
                  Email
                </label>

                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
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
                  className={classes["city"]}
                  size="small"
                  sx={{
                    m: 1,
                    width: "100%",
                    margin: "0",
                    "& div": {
                      fontSize: "14px",
                    },
                  }}
                >
                  <label for="city" className={classes.label}>
                    City
                  </label>

                  <OutlinedInput
                    id="city"
                    name="city"
                    type="text"
                    onChange={(ev) => setCity(ev.target.value)}
                    onBlur={validateFields}
                    required
                    aria-describedby="city-error-text"
                    value={city}
                  />
                </FormControl>
                <FormControl
                  error={isErrorPostal}
                  className={classes["postal-code"]}
                  size="small"
                  sx={{
                    m: 1,
                    width: "100%",
                    margin: "0",
                    "& div": {
                      fontSize: "14px",
                      backgroundColor: `${isErrorPostal ? "#FDEDED" : "none"}`,
                    },
                  }}
                >
                  <label for="postalCode" className={classes.label}>
                    Postal code
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
                size="small"
                className={classes["street-address"]}
                sx={{
                  m: 1,
                  width: "100%",
                  margin: "0",
                  "& div": {
                    fontSize: "14px",
                  },
                }}
              >
                <label for="streetAddress" className={classes.label}>
                  Street address
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
              </FormControl>
              <FormControl
                size="small"
                sx={{
                  m: 1,
                  width: "100%",
                  margin: "0",
                  "& div": {
                    fontSize: "14px",
                  },
                }}
              >
                <label for="country" className={classes.label}>
                  Country
                </label>

                <OutlinedInput
                  id="country"
                  name="country"
                  type="text"
                  onChange={(ev) => setCountry(ev.target.value)}
                  onBlur={validateFields}
                  required
                  aria-describedby="country-error-text"
                  value={country}
                />
              </FormControl>

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
                onClick={saveAccountDetails}
              >
                Save
              </Button>
            </div>
            <div className={classes["profile-pic-wrapper"]}>
              <h3>Profile photo</h3>
              <div className={classes["image-wrapper"]}>
                <Image
                  src={`${
                    session
                      ? session?.user?.image
                      : "https://res.cloudinary.com/dkppw65bv/image/upload/c_scale,h_236/v1684159321/profiletempo_kwjl6v.jpg"
                  }`}
                  alt={`profile photo of ${session?.user?.name}`}
                  width={200}
                  height={200}
                  className={classes["profile-photo"]}
                />
                <IconButton
                  aria-label="delete"
                  size="large"
                  sx={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    "& svg": { fill: "#fff", zIndex: "1" },
                    "& span": {
                      backgroundColor: "#DE89A1",
                    },
                  }}
                >
                  <EditIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Orders','Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Orders' && (
                  <>
                    {!orderLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {orderLoaded && (
                      <div>
                        {orders.length === 0 && (
                          <p>Login to see your orders</p>
                        )}
                        {orders.length > 0 && orders.map(o => (
                          <SingleOrder {...o} />
                        ))}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Wishlist' && (
                  <>
                    {!wishlistLoaded && (
                      <Spinner fullWidth={true} />
                    )}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProducts.length > 0 && wishedProducts.map(wp => (
                            <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                          ))}
                        </WishedProductsGrid>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && (
                              <p>Your wishlist is empty</p>
                            )}
                            {!session && (
                              <p>Login to add products to your wishlist</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? 'Account details' : 'Login'}</h2>
                {!addressLoaded && (
                  <Spinner fullWidth={true} />
                )}
                {addressLoaded && session && (
                  <>
                    <Input type="text"
                           placeholder="Name"
                           value={name}
                           name="name"
                           onChange={ev => setName(ev.target.value)} />
                    <Input type="text"
                           placeholder="Email"
                           value={email}
                           name="email"
                           onChange={ev => setEmail(ev.target.value)}/>
                    <CityHolder>
                      <Input type="text"
                             placeholder="City"
                             value={city}
                             name="city"
                             onChange={ev => setCity(ev.target.value)}/>
                      <Input type="text"
                             placeholder="Postal Code"
                             value={postalCode}
                             name="postalCode"
                             onChange={ev => setPostalCode(ev.target.value)}/>
                    </CityHolder>
                    <Input type="text"
                           placeholder="Street Address"
                           value={streetAddress}
                           name="streetAddress"
                           onChange={ev => setStreetAddress(ev.target.value)}/>
                    <Input type="text"
                           placeholder="Country"
                           value={country}
                           name="country"
                           onChange={ev => setCountry(ev.target.value)}/>
                    <Button black block
                            onClick={saveAddress}>
                      Save
                    </Button>
                    <hr/>
                  </>
                )}
                {session && (
                  <Button primary onClick={logout}>Logout</Button>
                )}
                {!session && (
                  <Button primary onClick={login}>Login with Google</Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center> */}
    </>
  );
}
