import { transporter } from "../../config/nodemailer";
import { Box } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  orderId: "Order Id",
  purchaseDate: "Purchase date",
  phoneNumber: "Phone number",
  city: "City",
  postalCode: "Postal code",
  streetAddress: "Street address",
  country: "Country",
  paymentMethod: "Payment method",
  delivery: "Delivery",
  totalPayment: "Total",
};

const GenerateEmailContent = (
  orderId,
  purchaseDate,
  line_items,
  name,
  email,
  phoneNumber,
  city,
  postalCode,
  streetAddress,
  country,
  paymentMethod,
  status,
  delivery,
  totalPayment
) => {
  const data = {
    orderId,
    purchaseDate,
    line_items,
    name,
    email,
    phoneNumber,
    city,
    postalCode,
    streetAddress,
    country,
    paymentMethod,
    status,
    delivery,
    totalPayment,
  };
  const productName = [
    "Custom Perfume",
    "Custom Body Wash",
    "Custom Dishwashing Liquid",
  ];
  const stringData = Object.entries(data).reduce(
    (str, [key, val]) =>
      (str += `${CONTACT_MESSAGE_FIELDS[key]}: \n${val} \n \n`),
    ""
  );
  const htmlData = Object.entries(data).reduce((str, [key, val]) => {
    return (str += `<h3 class="form-heading" align="left">${CONTACT_MESSAGE_FIELDS[key]}</h3><p class="form-answer" align="left">${val}</p>`);
  }, "");
  return {
    text: stringData,
    html: `<!DOCTYPE html>
    <html>
      <head>
        <title></title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <style type="text/css">
          body,
          table,
          td,
          a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          table {
            border-collapse: collapse !important;
          }
          body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
          }
          @media screen and (max-width: 525px) {
            .wrapper {
              width: 100% !important;
              max-width: 100% !important;
            }
            .responsive-table {
              width: 100% !important;
            }
            .padding {
              padding: 10px 5% 15px 5% !important;
            }
            .section-padding {
              padding: 0 15px 50px 15px !important;
            }
          }
          .form-container {
            margin-bottom: 24px;
            padding: 20px;
            border: 1px dashed #ccc;
          }
          .form-heading {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 400;
            text-align: left;
            line-height: 20px;
            font-size: 18px;
            margin: 0 0 8px;
            padding: 0;
          }
          .form-answer {
            color: #2a2a2a;
            font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            font-weight: 300;
            text-align: left;
            line-height: 20px;
            font-size: 16px;
            margin: 0 0 24px;
            padding: 0;
          }
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
        </style>
      </head>
      <body
        style="margin: 0 !important; padding: 0 !important; background: #fcf3f5"
      >
        <div
          style="
            display: flex;
            font-size: 1px;
            color: #fefefe;
            line-height: 1px;
            max-height: 0px;
            max-width: 0px;
            opacity: 0;
            overflow: hidden;
          "
        ></div>
        <div
          style="
            display: flex;
            width: 80%;
            max-width: 600px;
            height: 100vh;
            align-items: center;
            margin: 0 auto;
            font-family: inter;
            color: #545454;
          "
        >
          <div
            style="
              border: 1px solid #bdbdbd;
              border-radius: 4px;
              background-color: #fff;
              padding: 1.4rem;
            "
          >
            <img
              src="https://res.cloudinary.com/dkppw65bv/image/upload/c_scale,w_230/v1684608334/logoScentsandsuds_hzv1cg.png"
              alt="Suds & Scents logo"
            />
            <h2
              style="
                font-family: inter;
                color: #545454;
                font-size: 18px;
                margin-top: 18px;
              "
            >
              Purchase confirmed thank you for your order!
            </h2>
            <h3 style="font-size: 14px; font-weight: 600">
              Hello ${name},
            </h3>
            <p
              style="
                font-size: 11px;
                line-height: 1.8;
                margin: 0;
                padding-bottom: 24px;
                border-bottom: 1px solid #bdbdbd;
              "
            >
              Thank you for shopping with SUDS & SCENTS! We've received your order
              and will get started on it right away. Once your order has been
              processed and is on its way, we'll send you a shipping confirmation
              and expected delivery date.
            </p>
            <h3 style="font-size: 13px; font-weight: 600">Order</h3>
            <div style="display: flex">
              <div style="width: 20%; margin-right: 1rem">
                <p style="font-size: 9px; color: #9b9988">Order date</p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${purchaseDate}
                </p>
              </div>
              <div style="width: 80%">
                <p style="font-size: 9px; color: #9b9988">Order ID</p>
                <p
                  style="
                    font-size: 11px;
                    line-height: 1.4;
                    margin: 0;
                    word-break: break-all;
                  "
                >
                  ${orderId}
                </p>
              </div>
            </div>
            <div style="border-bottom: 1px solid #bdbdbd; padding-bottom: 1rem">
              <div>
                <p
                  style="
                    font-size: 12px;
                    line-height: 1.4;
                    margin: 1rem 0 1px 0;
                    word-break: break-all;
                  "
                >
                  My ${productName[2]}
                </p>
                <div style="display: flex">
                  <div style="width: 50%">
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      10ml Jojoba Oil
                    </p>
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      15 drops Frankincense Essential Oil
                    </p>
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      15 drops 9 drops Lavender Essential Oil
                    </p>
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      15 drops 9 6 drops Cedar Wood Essential Oil
                    </p>
                  </div>
                  <div style="width: 50%; text-align: right">
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      ₱120.00
                    </p>
    
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      ₱120.00
                    </p>
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      ₱120.00
                    </p>
                    <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                      ₱120.00
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                border-bottom: 1px solid #bdbdbd;
                padding-bottom: 1rem;
              "
            >
              <div style="width: 50%">
                <h3 style="font-size: 13px; font-weight: 600">Payment</h3>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${paymentMethod}
                </p>
              </div>
              <div style="width: 50%">
                <h3 style="font-size: 13px; font-weight: 600">Delivery</h3>
                <p style="font-size: 9px; color: #9b9988; margin: 2px 0">Address</p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${streetAddress}
                </p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${city}
                </p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${country}
                </p>
                <p style="font-size: 9px; color: #9b9988; margin: 2px 0">Delivery Method</p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${
                    Object.keys(delivery)[0] === "nextDayDelivery"
                      ? "Next Day Delivery"
                      : ""
                  }
                </p>
              </div>
            </div>
            <div style="display: flex">
              <div style="width: 50%">
                <h3 style="font-size: 13px; font-weight: 600">Customer Details</h3>
                <p style="font-size: 9px; color: #9b9988; margin: 2px 0">Name</p>
    
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${name}
                </p>
                <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                  Phone Number
                </p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${phoneNumber}
                </p>
                <p style="font-size: 9px; color: #9b9988; margin: 2px 0">
                  Email
                </p>
                <p style="font-size: 11px; line-height: 1.4; margin: 0">
                  ${email}
                </p>
              </div>
              <div style="width: 50%">
                <h3 style="font-size: 13px; font-weight: 600">Order Summary</h3>
                <div style="display: flex">
                  <div style="width: 50%">
                    <p style="font-size: 11px; line-height: 1.4; margin: 0">
                      Subtotal (1 item):
                    </p>
                    <p style="font-size: 11px; color: #9b9988; margin: 2px 0">
                      Shipping:
                    </p>
                    <p
                      style="
                        font-size: 13px;
                        font-weight: 600;
                        line-height: 1.4;
                        margin: 6px 0 0 0;
                        font-weight: 600;
                      "
                    >
                      Total:
                    </p>
                  </div>
                  <div style="width: 50%; text-align: right">
                    <p style="font-size: 11px; line-height: 1.4; margin: 0">
                      ₱245.00
                    </p>
                    <p style="font-size: 11px; color: #9b9988; margin: 2px 0">
                      ₱${Object.values(delivery)[0].toFixed(2)}
                    </p>
                    <p
                      style="
                        font-size: 13px;
                        font-weight: 600;
                        line-height: 1.4;
                        margin: 6px 0 0 0;
                        font-weight: 600;
                      "
                    >
                      ₱${totalPayment.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    
    
`,
  };
};

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const {
      orderId,
      purchaseDate,
      line_items,
      name,
      email,
      phoneNumber,
      city,
      postalCode,
      streetAddress,
      country,
      paymentMethod,
      status,
      delivery,
      totalPayment,
    } = req.body;

    console.log(req.body);

    try {
      await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        ...GenerateEmailContent(
          orderId,
          purchaseDate,
          line_items,
          name,
          email,
          phoneNumber,
          city,
          postalCode,
          streetAddress,
          country,
          paymentMethod,
          status,
          delivery,
          totalPayment
        ),
        subject: "SUDS & SCENTS",
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
  }
}
