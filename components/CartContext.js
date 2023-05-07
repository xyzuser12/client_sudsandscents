import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

const productDatas = {
  categoryId: "644653bbbe70cd3d8b62bd0c",
  categoryName: "Custom Perfume",
  formula: `To make this blend you will need:
  10ml jojoba oil
  15 drops frankincense essential oil
  9 drops lavender essential oil
  6 drops cedar wood essential oil
  15ml glass bottle (a roll-on bottle or one with a pipette works well)
  Directions:
  
  Pour the jojoba oil into a glass bottle.
  Add the drops of essential oils carefully.
  Place the lid on the bottle and shake gently to ensure all the oils are blended
  Cost Estimation:
  
  10ml Jojoba Oil: ₱ 120.00
  15 drops Frankincense Essential Oil: ₱ 50.00
  9 drops Lavender Essential Oil: ₱ 30.00
  6 drops Cedar Wood Essential Oil: ₱ 25.00
  15ml Glass Bottle: ₱ 20.00`,
  ingredients: [
    "645355c7ef19e3b71076cee3",
    "64535667ef19e3b71076cf0c",
    "6453577cef19e3b71076cf18",
  ],
  numberOfLiter: 2,
};

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
  function removeProduct(productData) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productData);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
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
