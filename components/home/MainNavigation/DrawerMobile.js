import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Paper from "@mui/material/Paper";

import classes from "../../../styles/layout/DrawerMobile.module.css";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();

  console.log(router);

  let className = "";
  if (router.pathname === href) {
    className = "active";
  }

  return (
    <Link
      href={href}
      className={` ${classes["link-list-item"]} ${classes[className]} `}
    >
      {children}
    </Link>
  );
};

const DrawerMobile = (props) => {
  const [state, setState] = useState({ left: false });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="home" disablePadding>
          <Link href="/" style={{ width: "100%" }}>
            <ListItemButton>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="about" disablePadding>
          <Link href="/about" style={{ width: "100%" }}>
            <ListItemButton>
              <ListItemText primary="About" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem key="products" disablePadding>
          <Accordion
            sx={{
              borderRadius: 0,
              border: "none",
              boxShadow: "none",
              width: "100%",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              onClick={(e) => e.stopPropagation()}
            >
              <Typography>Products</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                paddingTop: "0px",
              }}
            >
              <List>
                <ListItem
                  sx={{
                    padding: "0",
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="Perfume" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "0",
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="Hand Soap" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "0",
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="Lotion" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "0",
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="Lotion" />
                  </ListItemButton>
                </ListItem>
                <ListItem
                  sx={{
                    padding: "0",
                  }}
                >
                  <ListItemButton>
                    <ListItemText primary="Lotion" />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </ListItem>
        <ListItem key="contact-us" disablePadding>
          <Link href="/contact-us" style={{ width: "100%" }}>
            <ListItemButton>
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className={classes.container}>
      <IconButton
        sx={{
          color: `${props.styleMode === "light" ? "#fff" : "#27272A"}`,
          fontSize: "1.3rem",
          width: "100%",
        }}
        onClick={toggleDrawer("left", true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        disableScrollLock
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default DrawerMobile;
