import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Delivery } from "@/models/Delivery";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    console.log(req.query?.id);
    if (req.query?.id) {
      res.json(await Delivery.findOne({ _id: req.query.id }));
    } else {
      res.json(await Delivery.find());
    }
  }
}
