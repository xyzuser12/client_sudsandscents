import { mongooseConnect } from "@/components/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { User } from "../../models/Users";

export default async function handle(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);

  if (req.method === "GET") {
    const address = await User.findOne({ email: user.email });
    res.json(address);
  }
}
