import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import facebookIcon from "../../public/assets/icons/facebook-icon.png";
import googleIcon from "../../public/assets/icons/google-icon.png";
import classes from "../../styles/account/LogIn.module.css";

const Login = () => {
  // const session = useSession();
  const { data: session } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleShowPasswordClick = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // console.log("Email:", username, "Password:", password);

    signIn("credentials", { email, password, callbackUrl: "/" });
  };

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn("google", { callbackUrl: "/" });
  }

  return (
    <div className={classes.container}>
      <div className={classes["inner-container"]}>
        <Card className={classes["login-container"]}>
          <CardHeader className={classes.header} title="Login" />
          <CardContent className={classes.content}>
            <form className={classes.form}>
              <div className={classes["username-wrapper"]}>
                <input
                  type="text"
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
              <div className={classes["login-options"]}>
                <p>Log in with phone number?</p>
                <p>Forgot your password?</p>
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
                onClick={handleLogin}
              >
                Log in
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
              Do not have an account?
              <Link href="/signup">
                <span>Sign Up</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
