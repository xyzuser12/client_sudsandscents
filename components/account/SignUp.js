import classes from "../../styles/account/Signup.module.css";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import facebookIcon from "../../public/assets/icons/facebook-icon.png";
import googleIcon from "../../public/assets/icons/google-icon.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

const SignUp = () => {
  const handleShowPasswordClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [inputValues, setInputValues] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(inputValues);
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <Card className={classes["signup-container"]}>
            <CardHeader className={classes.header} title="Signup" />
            <CardContent className={classes.content}>
              <form className={classes.form} onSubmit={handleSignup}>
                <div className={classes["name-wrapper"]}>
                  <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    value={inputValues.Name}
                    required
                    className={classes.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={classes["email-wrapper"]}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Phone Number / Email"
                    required
                    value={inputValues.Email}
                    onChange={handleInputChange}
                    className={classes.email}
                  />
                </div>
                <div className={classes["password-wrapper"]}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    value={inputValues.Password}
                    onChange={handleInputChange}
                    className={classes.password}
                  />
                  <IconButton
                    onClick={handleShowPasswordClick}
                    className={classes.eye}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "0.6rem",
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                <div className={classes["password-wrapper"]}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    className={classes.password}
                  />
                  <IconButton
                    onClick={handleShowConfirmPasswordClick}
                    className={classes.eye}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      right: "0.6rem",
                    }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
                <Button
                  variant="contained"
                  className={classes.button}
                  type="submit"
                  disableElevation
                  sx={{
                    color: "#fff",
                    backgroundColor: "#de89a1",
                    borderRadius: "8px",

                    padding: "0.8em 1em",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  SIGN UP
                </Button>
              </form>

              <Divider className={classes.divider}>
                <p>OR</p>
              </Divider>

              <div className={classes["social-media-buttons-wrapper"]}>
                <Button
                  className={classes["facebook-button"]}
                  sx={{
                    border: "1px solid hsl(0, 0%, 80%)",
                    color: "#545454",
                    textTransform: "uppercase",
                    width: "45%",
                  }}
                >
                  <Image
                    src={facebookIcon}
                    alt="facebook icon"
                    loading="lazy"
                  />
                  <span>Facebook</span>
                </Button>
                <Button
                  className={classes["google-button"]}
                  onClick={() => signIn("google")}
                  sx={{
                    border: "1px solid hsl(0, 0%, 80%)",
                    color: "#545454",
                    textTransform: "uppercase",
                    width: "45%",
                  }}
                >
                  <Image src={googleIcon} alt="google icon" loading="lazy" />
                  <span>Google</span>
                </Button>
              </div>
              <div className={classes.toogle}>
                By signing up, you agree to Suds & Scents'{<br />}
                <Link href="/signup">
                  <span>Terms of Services </span>
                </Link>
                &
                <Link href="/signup">
                  <span> Private Policy</span>
                </Link>
              </div>
              <div className={classes.toogle}>
                Have an account?
                <Link href="/login">
                  <span> Login</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUp;
