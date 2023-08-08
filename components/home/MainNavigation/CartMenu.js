import { Fragment, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconButton } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { CartContext } from "../../CartContext";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect } from "react";
import Button from "@mui/material/Button";

import outputImageBg from "../../../public/assets/outputImage_background.png";
import classes from "../../../styles/layout/CartMenu.module.css";

const CartMenu = (props) => {
  const { cartProducts } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cartDatas, setCartDatas] = useState([]);
  const [transformedCartDatas, setTransformedCartDatas] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const cartData = convertCartData(cartProducts);
    const transformedData = getUniqueCartData(cartData);

    setCartDatas(transformedData);

    const slicedData = transformedData.slice(-4);
    const reversedData = slicedData.reverse();
    setTransformedCartDatas(reversedData);
  }, [cartProducts]);

  // console.log(cartProducts);
  // console.log(transformedCartDatas);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const convertCartData = (cartDatas) => {
    const result = [];

    console.log(cartDatas, "Cart");

    for (const cartData of cartDatas) {
      const [productId, categoryId, categoryName, categoryImage, formula, ingredients, numberOfLiter, totalEstimatedCost] = cartData;

      const ingredientList = ingredients;
      const totalCost = totalEstimatedCost;
      const fixedTotalEstimatedCost = parseFloat(totalEstimatedCost).toFixed(2);

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
            color: `${props.styleMode === "light" ? "rgb(var(--background-rgb))" : "rgb(var(--foreground-rgb))"}`,
          }}
        >
          <Badge
            badgeContent={cartDatas.length}
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
          // console.log(cartData.categoryImage);
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
                {cartData.categoryImage && <Image src={cartData.categoryImage} alt={`${cartData.categoryName} image`} width={100} height={100} className={classes.image} loading="lazy" />}
                {outputImageBg && <Image src={outputImageBg} alt={`${cartData.categoryName} background image`} className={classes["image-backgound"]} loading="lazy" />}
              </div>
              <div className={classes.data}>
                <p className={classes.name}>{cartData.categoryName}</p>
                <div className={classes.number}>
                  <div>{cartData.numberOfLiter}L</div>
                  <div>₱{cartData?.fixedTotalEstimatedCost}</div>
                </div>
              </div>
            </MenuItem>
            // </Tooltip>
          );
        })}
        <Link href={"/cart"}>
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
        </Link>
      </Menu>
    </Fragment>
  );
};

export default CartMenu;
