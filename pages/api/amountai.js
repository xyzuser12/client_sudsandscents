import { prisma } from "../../lib/prismaClient";
export default async function handle(req, res) {
    const { id, amount } = JSON.parse(req.body)

    const category = await prisma.category.findUnique({
        where: {
            id: id,
        },
        include: {
            composition: {
                include: {
                    ingredients: {
                        orderBy: {
                            price: 'asc'
                        }
                    }
                }
            }
        }
    })

    const composition = category?.composition

    const ingrediens = composition?.map(value => {
        const { ingredients } = value
        return ingredients[0]
    })

    const prices = ingrediens?.map(value => value.price ? value.price : 0)

    const total_price = prices?.reduce((total, value) => total + value)

    const total_quantity = amount / total_price //total quantity 1000 / 50 = 20   
    //20 * (30 / 50)

    const final_data = ingrediens?.map(value => {
        const { price } = value
        const quantity = total_quantity
        return { ...value, quantity }
    })

    return res.json({ quantity: 0, ingredients: final_data });
}
