// @ts-ignore knex is not typed
import knex from 'knex'

let db = knex({
    client: 'postgresql',
    connection: {
        // @ts-ignore process is not typed
        host: process.env.dbhost,
        // @ts-ignore process is not typed
        database: process.env.dbname,
        // @ts-ignore process is not typed
        user: process.env.user,
        // @ts-ignore process is not typed
        password: process.env.password
    }
})

type Product = {
    id: string
    name: string
    price: string
    stock: number
}

async function getProduct(productId: string): Promise<Product> {
    return db.raw(`SELECT * from product_table WHERE id=${productId}`).first()
}

export async function getProductsByIds(productsIds: string[]): Promise<Record<string, Omit<Product, 'id'>>> {
    return (
        await Promise.all(
            productsIds.map(async (productId) => {
            const product = await getProduct(productId)
            const { id, ...rest } = product
            return [id, rest]
        }),
    )).reduce(
        (acc, [id, product]) =>
        // @ts-expect-error type is not working
        ({ ...acc, [id]: product }),
        {},
    )
}

interface ProductCart {
    id: string,
    name: string,
    user: string,
    products: Product[]
}

type ProductCartProperty = 'id' | 'name' | 'user' | 'products'

export function editCart(cart: ProductCart, property: ProductCartProperty, value: any) {
    cart[property] = value
}
