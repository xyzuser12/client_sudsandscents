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
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleShowPasswordClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleShowConfirmPasswordClick = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  console.log(cPassword);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/users2",
        {
          username,
          email,
          password,
          cPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      const data = response.data;
      if (!data.user) {
        setShowError(true);
        setErrorMessage(data.message);
        return null;
      }

      console.log(data);

      await signIn("credentials", {
        username: data.user.username,
        email,
        password,
        callbackUrl: "http://localhost:4000/login",
      });
    } catch (error) {
      console.error("💥💥💥An error occurred:", error);
    }
  };

  return (
    <>
      <div className={classes.container}>
        <div className={classes["inner-container"]}>
          <Card className={classes["signup-container"]}>
            <CardHeader className={classes.header} title="Signup" />
            <CardContent className={classes.content}>
              <form className={classes.form}>
                {showError && (
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                )}
                <div className={classes["name-wrapper"]}>
                  <input
                    type="name"
                    name="name"
                    placeholder="Name"
                    required
                    className={classes.name}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className={classes["email-wrapper"]}>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    required
                    className={classes.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={classes["password-wrapper"]}>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Password"
                    required
                    className={classes.password}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
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
                  onClick={handleSignup}
                >
                  SIGN UP
                </Button>
              </form>

              <Divider className={classes.divider}>
                <p>OR</p>
              </Divider>

              <div>
                <Button
                  className={classes["google-button"]}
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  sx={{
                    border: "1px solid hsl(0, 0%, 80%)",
                    color: "#545454",
                    textTransform: "uppercase",
                    width: "100%",
                  }}
                >
                  {googleIcon && (
                    <Image src={googleIcon} alt="google icon" loading="lazy" />
                  )}
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
