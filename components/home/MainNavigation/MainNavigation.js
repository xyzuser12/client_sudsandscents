import Link from "next/link";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";

import classes from "../../../styles/layout/MainNavigation.module.css";
import DrawerMobile from "./DrawerMobile";
import AccountMenu from "./AccountMenu";
import CartMenu from "./CartMenu";

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
  const router = useRouter();
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
          </div>
          <Link href="/">
            <p className={classes.logo}>
              Suds{" "}
              <span
                className={`${
                  props.styleMode === "light"
                    ? classes["logo-light"]
                    : classes["logo-dark"]
                }`}
              >
                &
              </span>{" "}
              Scents
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
                  <ActiveLink
                    href="/category-formula"
                    styleMode={props.styleMode}
                  >
                    Products
                  </ActiveLink>
                </Button>
              </li>
              <li className={classes["list-item"]}>
                <Button sx={style}>
                  <ActiveLink href="/account" styleMode={props.styleMode}>
                    Account
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
                <Button sx={style}>
                  <ActiveLink href="/contact-us" styleMode={props.styleMode}>
                    Contact Us
                  </ActiveLink>
                </Button>
              </li>
            </ul>
          </div>
          <div className={classes["main-menu-icons-right"]}>
            <CartMenu styleMode={props.styleMode} />

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
