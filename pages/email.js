import { Box, Typography } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import { Fragment } from "react";
import Image from "next/image";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const ingreRaw = [
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1684331184/bottle-of-lavender-essential-oil-with-fresh-royalty-free-image-920637186-1547242978_t8i1bb.jpg",
    price: 30,
    quantity: 100,
    title: "Jojoba",
    updatedAt: "2023-05-17T13:47:03.371Z",
    __v: 0,
    _id: "64465605be70cd3d8b62bd1d",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1684331184/bottle-of-lavender-essential-oil-with-fresh-royalty-free-image-920637186-1547242978_t8i1bb.jpg",
    price: 30,
    quantity: 100,
    title: "Jojoba",
    updatedAt: "2023-05-17T13:47:03.371Z",
    __v: 0,
    _id: "6453603cef19e3b71076cf41",
  },
  {
    category: "6446553cbe70cd3d8b62bd0f",
    composition: "Carrier Oils",
    createdAt: "2023-04-24T10:12:21.072Z",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique ultrices quam a pellentesque. Proin semper metus non lectus convallis, eget sagittis libero mollis. Suspendisse sed lorem nisl.",
    image:
      "https://res.cloudinary.com/dkppw65bv/image/upload/v1684331184/bottle-of-lavender-essential-oil-with-fresh-royalty-free-image-920637186-1547242978_t8i1bb.jpg",
    price: 30,
    quantity: 100,
    title: "Jojoba",
    updatedAt: "2023-05-17T13:47:03.371Z",
    __v: 0,
    _id: "6453577cef19e3b71076cf18",
  },
];

const dataRaw = [
  {
    city: "Manila",
    country: "Philippines",
    delivery: {
      standardDelivery: 90,
    },

    email: "formalejoraymartbedia@gmail.com",
    name: "Raymart Formalejo",
    paymentMethod: "COD",
    phoneNumber: "09452779188",
    postalCode: "1013",
    productToPurchase: [
      {
        categoryId: "644653bbbe70cd3d8b62bd0c",
        categoryImage:
          "https://res.cloudinary.com/dkppw65bv/image/upload/v1681367352/Perfume_xe5qhi.png",
        categoryName: "Custom Perfume",
        formula:
          "\n  To make this blend you will need:\n  10ml jojoba oil\n  15 drops frankincense essential oil\n  9 drops lavender essential oil\n  6 drops cedar wood essential oil\n  15ml glass bottle (a roll-on bottle or one with a pipette works well)\n  Directions:\n  \n  Pour the jojoba oil into a glass bottle.\n  Add the drops of essential oils carefully.\n  Place the lid on the bottle and shake gently to ensure all the oils are blended\n  Cost Estimation:\n  \n  10ml Jojoba Oil: ₱ 120.00\n  15 drops Frankincense Essential Oil: ₱ 50.00\n  9 drops Lavender Essential Oil: ₱ 30.00\n  6 drops Cedar Wood Essential Oil: ₱ 25.00\n  15ml Glass Bottle: ₱ 20.00",
        ingredients: [
          {
            composition: "Carrier Oils",
            price: 30,
            title: "Jojoba",
            _id: "64465605be70cd3d8b62bd1d",
          },
          {
            composition: "Citrus Oils",
            price: 32,
            title: "Orange",
            _id: "6453577cef19e3b71076cf18",
          },
          {
            composition: "Woods and Musks",
            price: 12,
            title: "Cedarwood",
            _id: "6453603cef19e3b71076cf41",
          },
        ],
        numberOfLiter: 1,

        productId:
          "3e9a074ecba1826f6b645a430022b4072fa2d59d6ccb632b138ee53d3e4e024f",
        totalEstimatedCost: 245,
      },
    ],

    status: "Processing",
    streetAddress: "1247 Yuseco St. Tondo Manila",
    totalPayment: 335,
    orderId: "99b887fdd2252445110176344f15e100ddc2fbf48d68b4ad167232d7a2625a5a",
    purchaseDate: "2023-05-21 14:07:32",
  },
];
const EmailPage = () => {
  console.log(dataRaw);
  console.log(dataRaw[0].totalPayment);

  function getFormattedDate(inputDate) {
    const dateObj = new Date(inputDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = dateObj.toLocaleString("en-PH", options);
    const [datePart] = formattedDate.split("/");
    return `${datePart}`;
  }
  return (
    <div
      style={{
        backgroundColor: "#E5E6E8",
      }}
    >
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
          maxWidth: "500px",
          margin: "0 auto",
          fontSize: "11px",
          color: "",
        }}
      >
        <div
          style={{
            margin: "0 0 .4rem 0",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "#FBF3FC",
              padding: "3rem 1.4rem 2rem 1.4rem",
              borderRadius: "4px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p
                style={{
                  letterSpacing: "-1px",
                  fontWeight: "800",
                  fontSize: "1rem",
                  textAlign: "left",
                  lineHeight: "1",
                  textTransform: "uppercase",
                }}
              >
                Scents <span style={{ color: "#de89a1" }}>&</span> Suds
              </p>
              <p style={{ color: "#de89a1", fontSize: "10px" }}>
                Purchase confired, thanks for your order!
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "1rem 0 auto",
                gap: "2px",
              }}
            >
              {/* <ShoppingBasketIcon
                style={{ alignSelf: "center", color: "#DE89A1", fontSize: "3rem" }}
              /> */}
              <p
                style={{
                  textAlign: "center",
                  color: "#DE89A1",
                  fontSize: "13px",
                }}
              >
                Purchase Confirmation
              </p>
              <h2
                style={{
                  textAlign: "center",
                  color: "#DE89A1",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                ₱{parseInt(dataRaw[0].totalPayment).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "3rem 1.4rem  2rem 1.4rem",
            position: "relative",
            WebkitMask:
              "radial-gradient(18.66px at 50% 25.60px,#000 99%,#0000 101%) calc(50% - 32px) 0/64px 100%,radial-gradient(18.66px at 50% -9.6px,#0000 99%,#000 101%) 50% 16px/64px 100% repeat-x",
            mask: "radial-gradient(18.66px at 50% 25.60px,#000 99%,#0000 101%) calc(50% - 32px) 0/64px 100%,radial-gradient(18.66px at 50% -9.6px,#0000 99%,#000 101%) 50% 16px/64px 100% repeat-x",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <p style={{ textAlign: "center" }}>{`Hi ${dataRaw[0].name}😊`}</p>
            <p style={{ textAlign: "center" }}>
              Thank you for shopping with SUDS & SCENTS! We&apos;ve received
              your order and will get started on it right away. Once your order
              has been processed and is on its way we&apos;ll send you a
              shipping confimation and expected expected delivery date.
            </p>
          </div>
          <h3 style={{ fontSize: "13px" }}>Order summary</h3>
          <div style={{ display: "flex", marginBottom: ".3rem" }}>
            <p style={{ padding: "0 8px 0 0" }}>Order Id: </p>
            <p
              style={{
                display: "block",
                textOverflow: "ellipsis",
                width: "80%",
              }}
            >
              {dataRaw[0].orderId}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <p>Purchase Date</p>
            <p>{getFormattedDate(dataRaw[0].purchaseDate)}</p>
          </div>
          {/* <TableContainer
            style={{
              border: "1px solid rgba(224, 224, 224, 1)",
              fontSize: "11px",
            }}
          >
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#F8F8F8" }}>
                  <TableCell
                    sx={{
                      fontSize: "9px",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      padding: "0 0 0 14px ",
                    }}
                  >
                    Item
                  </TableCell>
                  <TableCell
                    align="right"
                    colSpan={2}
                    sx={{
                      fontSize: "9px",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      padding: "0 14px 0 0 ",
                    }}
                  >
                    Ingredients
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: "9px",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      padding: "0 14px 0 0 ",
                    }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRaw[0] &&
                  dataRaw[0].productToPurchase &&
                  dataRaw[0].productToPurchase.length > 0 &&
                  dataRaw[0].productToPurchase.map((product) => {
                    return (
                      <TableRow
                        key={product.productId}
                        sx={{
                          borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        }}
                      >
                        <TableCell
                          sx={{
                            display: "flex",
                            borderBottom: "none",
                            fontSize: "11px",
                            padding: "14px 0 0 14px",
                          }}
                        >
                          {`${product.categoryName} ${product.numberOfLiter}L`}
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            borderBottom: "none",
                            borderBottom: "none",
                            fontSize: "11px",
                            padding: "14px 14px 0 0",
                          }}
                          colSpan={2}
                        >
                          {product.ingredients.map((ingredient) => {
                            return (
                              <div
                                key={ingredient._id}
                                style={{ margin: "0 0 6px 0" }}
                              >
                                <p>
                                  {`${ingredient.title} ${ingredient.composition}`}
                                </p>
                                {` ₱${ingredient.price.toFixed(2)}`}
                                <p></p>
                              </div>
                            );
                          })}
                        </TableCell>

                        <TableCell
                          align="right"
                          sx={{
                            borderBottom: "none",
                            borderBottom: "none",
                            fontSize: "11px",
                            padding: "14px 14px 0 0",
                          }}
                        >
                          {`₱${(
                            product.numberOfLiter * product.totalEstimatedCost
                          ).toFixed(2)}`}
                        </TableCell>
                      </TableRow>
                    );
                  })}

                <TableRow>
                  <TableCell colSpan={2} sx={{ borderBottom: "none" }} />
                  <TableCell
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    Subtotal
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    {1235}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontSize: "11px",
                    }}
                  />

                  <TableCell
                    sx={{
                      fontSize: "11px",
                    }}
                  >
                    <p>Total</p>
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {`₱${parseInt(dataRaw[0].totalPayment).toFixed(2)}`}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer> */}
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
