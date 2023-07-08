import { prisma } from "../../lib/prismaClient";

export default async function handle(req, res) {
  const { method } = req;

  if (method === "GET") {
    const categoryId = parseInt(req.query?.categoryId);
    console.log("*********************************");
    console.log(categoryId);
    console.log(req.query);
    if (categoryId) {
      const category = await prisma.category.findFirst({
        where: {
          id: categoryId,
        },
      });
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
      console.log(category);
      return res.json(category);
    } else {
      const categories = await prisma.category.findMany();
      return res.json(categories);
    }
  }
}
