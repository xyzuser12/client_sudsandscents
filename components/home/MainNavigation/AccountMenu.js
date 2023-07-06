// import * as React from "react";
import Image from "next/image";
import { Fragment, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useRouter } from "next/router";
import classes from "../../../styles/layout/AccountMenu.module.css";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const AccountMenu = ({ styleMode, userSession }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAccountBtn, setShowAccountBtn] = useState(true);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { data: sessison } = useSession();
  console.log(userSession);
  useEffect(() => {
    if (router.pathname === "/login" || router.pathname === "/signup") {
      setShowAccountBtn(false);
    } else {
      setShowAccountBtn(true);
    }
  }, [router.pathname]);

  if (userSession) {
    // console.log(typeof userSession?.data?.user.image);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disabled={!showAccountBtn}
          >
            {userSession && userSession.status === "authenticated" ? (
              <Avatar
                sx={{ width: 30, height: 30, backgroundColor: "transparent" }}
              >
                {userSession.data.user.image && (
                  <Image
                    src={userSession.data.user.image}
                    width="30"
                    height="30"
                    alt={userSession.data.user.name}
                  />
                )}
              </Avatar>
            ) : (
              <Avatar
                sx={{ width: 28, height: 28, backgroundColor: "transparent" }}
              >
                <PersonRoundedIcon
                  classes={{
                    root: `${
                      styleMode === "light"
                        ? classes.iconButton
                        : classes.iconButtonDark
                    }`,
                  }}
                  sx={{
                    color: `${!showAccountBtn ? "transparent !important" : ""}`,
                  }}
                />
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        disableScrollLock
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {userSession?.status !== "authenticated" ? (
          <div>
            <Link href="/signup">
              <MenuItem onClick={handleClose}>
                <Avatar /> Sign Up
              </MenuItem>
            </Link>
            <Link href="/login">
              <MenuItem onClick={handleClose}>
                <Avatar /> Log In
              </MenuItem>
            </Link>
          </div>
        ) : (
          <MenuItem onClick={() => signOut()}>
            <Avatar /> Logout
          </MenuItem>
        )}
      </Menu>
    </Fragment>
  );
};

export default AccountMenu;
