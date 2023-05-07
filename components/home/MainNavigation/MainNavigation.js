// import { makeStyles } from "@mui/styles";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";

import classes from "../../../styles/layout/MainNavigation.module.css";
import DrawerMobile from "./DrawerMobile";
import AccountMenu from "./AccountMenu";
import ProductOptions from "./ProductOptions";

const ActiveLink = ({ href, styleMode, children }) => {
  const router = useRouter();

  // console.log(userSessionData);

  let className = "";
  if (router.pathname === href) {
    className = "active";
  }

  return (
    <Link
      href={href}
      className={` ${
        styleMode === "light"
          ? classes["link-list-item"]
          : classes["link-list-item-dark"]
      } ${
        styleMode === "light"
          ? classes[className]
          : classes[className + "-dark"]
      } `}
    >
      {children}
    </Link>
  );
};

const MainNavigation = (props) => {
  console.log(props.userSession);
  // if (session) {
  //   console.log(session);
  // }
  const style = {
    color: `${
      props.styleMode === "light"
        ? "rgb(var(--background-rgb))"
        : "rgb(var(--foreground-rgb))"
    }`,
    position: "relative",
    fontFamily: "var(--font-inter)",
    fontWeight: "400",
    fontSize: "14px",
    "&:hover": { backgroundColor: "transparent" },
  };
  return (
    <div
      className={`${
        props.backgroundSColorAcc === "transparent"
          ? classes.container
          : classes["container-login"]
      }`}
    >
      <nav
        className={`${
          props.styleMode === "light"
            ? classes["nav-container"]
            : classes["nav-container-dark-text"]
        }`}
      >
        <div className={classes.nav}>
          <div className={classes["main-menu-icons-left"]}>
            <DrawerMobile styleMode={props.styleMode} />
            <IconButton
              sx={{
                fontSize: "0.8rem",
                color: `${
                  props.styleMode === "light"
                    ? "rgb(var(--background-rgb))"
                    : "rgb(var(--foreground-rgb))"
                }`,
              }}
            >
              <SearchRoundedIcon />
            </IconButton>
          </div>
          <Link href="/">
            <p className={classes.logo}>
              Scents{" "}
              <span
                className={`${
                  props.styleMode === "light"
                    ? classes["logo-light"]
                    : classes["logo-dark"]
                }`}
              >
                &
              </span>{" "}
              Suds
            </p>
          </Link>
          <div className={classes["main-menu"]}>
            <ul className={classes["nav-list"]}>
              <li className={classes["list-item"]}>
                <Button sx={style}>
                  <ActiveLink href="/" styleMode={props.styleMode}>
                    Home
                  </ActiveLink>
                </Button>
              </li>
              <li className={classes["list-item"]}>
                <Button sx={style}>
                  <ActiveLink href="/about" styleMode={props.styleMode}>
                    About
                  </ActiveLink>
                </Button>
              </li>
              <li className={classes["list-item"]}>
                <ProductOptions styleMode={props.styleMode} />
              </li>
              <li className={classes["list-item"]}>
                <Button sx={style}>
                  <ActiveLink href="/contact-us" styleMode={props.styleMode}>
                    Contact Us
                  </ActiveLink>
                </Button>
              </li>
            </ul>
          </div>
          <div className={classes["main-menu-icons-right"]}>
            <IconButton
              // classes={{
              //   root: `${
              //     props.styleMode === "light"
              //       ? classes.iconButton
              //       : classes.iconButtonDark
              //   }`,
              // }}
              sx={{
                fontSize: "0.8rem",
                color: `${
                  props.styleMode === "light"
                    ? "rgb(var(--background-rgb))"
                    : "rgb(var(--foreground-rgb))"
                }`,
              }}
            >
              <Badge
                badgeContent={0}
                color="primary"
                max={99}
                sx={{
                  "& .MuiBadge-badge": {
                    color: "#fff",
                  },
                }}
              >
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
            <AccountMenu
              styleMode={props.styleMode}
              userSession={props.userSession}
            />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainNavigation;
