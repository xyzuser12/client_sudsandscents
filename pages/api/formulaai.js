import { prisma } from "../../lib/prismaClient";
export default async function handle(req, res) {
    const { liters, ingredients } = JSON.parse(req.body)

    const ids = ingredients.filter(value => value.ingredient.isSelected)

    const datas = ids.map(values => values.ingredient.id)

    const category = await prisma.ingredients.findMany({
        where: {
            id: {
                in: datas
            }
        }
    })

    const result = category.map(values => {
        const quantity = (((liters * 1000) / ids.length) / (values.milliliter ? values.milliliter : 0))
        const data = { ...values, quantity }
        return data
    })

    return res.json({ quantity: liters * 1000, ingredients: result });
}
