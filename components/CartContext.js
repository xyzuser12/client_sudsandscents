import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const cartRaw = [
  '["2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe","644653bbbe70cd3d8b62bd0c","Custom Perfume","https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png","\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",["64466387be70cd3d8b62bda8","64536178ef19e3b71076cf87","645361e6ef19e3b71076cfab"],1,245]',
];

// const productId =
//   "2d06cffba29d0d39b4c2aef9b6f2c963a392f0ba2a85e81effe489a451e4bbbe";

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  function addProduct(productData) {
    setCartProducts((prev) => [...prev, productData]);
  }
  function removeProduct(productId) {
    setCartProducts((prev) => {
      const filteredCart = prev.filter((item) => {
        return !item.includes(productId);
      });
      return filteredCart;
    });
  }
  function clearCart() {
    setCartProducts([]);
  }
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
