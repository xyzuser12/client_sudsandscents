import { Fragment, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconButton, Tooltip } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { CartContext } from "../../CartContext";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import { set } from "lodash";
import Button from "@mui/material/Button";

import outputImageBg from "../../../public/assets/outputImage_background.png";
import classes from "../../../styles/layout/CartMenu.module.css";

const cartDatas = [
  '["644653bbbe70cd3d8b62bd0c","Custom Perfume","\\n  To make this blend you will need:\\n  10ml jojoba oil\\n  15 drops frankincense essential oil\\n  9 drops lavender essential oil\\n  6 drops cedar wood essential oil\\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\\n  Directions:\\n  \\n  Pour the jojoba oil into a glass bottle.\\n  Add the drops of essential oils carefully.\\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\\n  Cost Estimation:\\n  \\n  10ml Jojoba Oil: ₱ 120.00\\n  15 drops Frankincense Essential Oil: ₱ 50.00\\n  9 drops Lavender Essential Oil: ₱ 30.00\\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\\n  15ml Glass Bottle: ₱ 20.00",["645355c7ef19e3b71076cee3","64535667ef19e3b71076cf0c","64536084ef19e3b71076cf4d"],1, 245]',

  '["644653bbbe70cd3d8b62bd0c","Custom Perfume","\\n    To make this blend you will need:\\n    10ml jojoba oil\\n    15 drops frankincense essential oil\\n    9 drops lavender essential oil\\n    6 drops cedar wood essential oil\\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\\n    Directions:\\n    \\n    Pour the jojoba oil into a glass bottle.\\n    Add the drops of essential oils carefully.\\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\\n    Cost Estimation:\\n    \\n    10ml Jojoba Oil: ₱ 120.00\\n    15 drops Frankincense Essential Oil: ₱ 50.00\\n    9 drops Lavender Essential Oil: ₱ 30.00\\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\\n    15ml Glass Bottle: ₱ 20.00",["64466360be70cd3d8b62bd9c","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1, 245]',
  '["644653bbbe70cd3d8b62bd0c","Custom Perfume","\\n    To make this blend you will need:\\n    10ml jojoba oil\\n    15 drops frankincense essential oil\\n    9 drops lavender essential oil\\n    6 drops cedar wood essential oil\\n    15ml glass bottle (a roll-on bottle or one with a pipette works well)\\n    Directions:\\n    \\n    Pour the jojoba oil into a glass bottle.\\n    Add the drops of essential oils carefully.\\n    Place the lid on the bottle and shake gently to ensure all the oils are blended\\n    Cost Estimation:\\n    \\n    10ml Jojoba Oil: ₱ 120.00\\n    15 drops Frankincense Essential Oil: ₱ 50.00\\n    9 drops Lavender Essential Oil: ₱ 30.00\\n    6 drops Cedar Wood Essential Oil: ₱ 25.00\\n    15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64466a11be70cd3d8b62bdbe","645361e6ef19e3b71076cfab","64536178ef19e3b71076cf87","644662c5be70cd3d8b62bd73"],"3", 245]',
];

const CartMenu = (props) => {
  const { cartProducts } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [transformedCartDatas, setTransformedCartDatas] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const transformedData = convertCartData(cartProducts);
    const slicedData = transformedData.slice(-4);
    const reversedData = slicedData.reverse();
    setTransformedCartDatas(reversedData);
  }, [cartProducts]);

  console.log(cartProducts);
  console.log(transformedCartDatas);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const convertCartData = (cartDatas) => {
    const result = [];

    for (const cartData of cartDatas) {
      const [
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

  return (
    <Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          aria-controls={open ? "cart-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
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
            badgeContent={cartProducts.length}
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
            padding: "1rem",
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
        <p className={classes.recent}>Recently Added Products</p>
        {transformedCartDatas.map((cartData) => {
          console.log(cartData.categoryImage);
          return (
            // <Tooltip title={cartData.categoryName}>
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
                marginBottom: "8px",
                alignItems: "start",
              }}
            >
              <div className={classes["image-wrapper"]}>
                <Image
                  src={cartData.categoryImage}
                  alt={`${cartData.categoryName} image`}
                  width={100}
                  height={100}
                  className={classes.image}
                  loading="lazy"
                />
                <Image
                  src={outputImageBg}
                  alt={`${cartData.categoryName} background image`}
                  className={classes["image-backgound"]}
                  loading="lazy"
                />
              </div>
              <div className={classes.data}>
                <p className={classes.name}>{cartData.categoryName}</p>
                <div className={classes.number}>
                  <div>{cartData.numberOfLiter}L</div>
                  <div>₱{cartData.totalEstimatedCost.toFixed(2)}</div>
                </div>
              </div>
            </MenuItem>
            // </Tooltip>
          );
        })}
        <Button
          variant="contained"
          className={classes["buy-now__button"]}
          sx={{
            alignSelf: "center",
            padding: "0.8em 2em",
            borderRadius: "3px",
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: "normal",
            letterSpacing: "1px",
            backgroundColor: "#de89a1",
            color: "#fff",
            outline: "none",
            border: "none",
            width: "100%",
          }}
        >
          View my cart
        </Button>
      </Menu>
    </Fragment>
  );
};

export default CartMenu;
