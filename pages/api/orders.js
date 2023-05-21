import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { transporter } from "../../config/nodemailer";

import { Box, Typography } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import { Fragment } from "react";

const CONTACT_MESSAGE_FIELDS = {
  name: "Name",
  email: "Email",
  subject: "Subject",
  message: "Message",
};

const generateEmailContent = (data) => {
  // Generate email content using MUI components
  const emailContent = (
    <Box>
      <Typography variant="h2">New Contact Message</Typography>
      <Box className="form-container">
        {Object.entries(data).map(([key, val]) => (
          <Fragment key={key}>
            <Typography variant="h3" className="form-heading">
              {CONTACT_MESSAGE_FIELDS[key]}
            </Typography>
            <Typography variant="p" className="form-answer">
              {val}
            </Typography>
          </Fragment>
        ))}
      </Box>
    </Box>
  );

  return {
    html: ReactDOMServer.renderToString(emailContent),
  };
};

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    console.log(req.query?.orderId);
    if (req.query?.orderId) {
      res.json(await Order.findOne({ orderId: req.query.orderId }));
    }
  }
  if (method === "POST") {
    const {
      orderId,
      purchaseDate,
      name,
      phoneNumber,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      paymentMethod,
      productToPurchase,
      status,
      delivery,
      totalPayment,
    } = req.body;
    const orderDoc = await Order.create({
      line_items: productToPurchase,
      orderId,
      purchaseDate,
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
    });
    console.log(orderDoc);
    res.json(orderDoc);
  }
}
