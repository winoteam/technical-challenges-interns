//@ts-nocheck

import express from 'express'
import knex from 'knex'
import { StatusCodes } from 'http-status-codes'
import { limit } from './config'
import { port } from './config'
import { getProductsByIds } from './poducts'

const app = express()

app.get('/', async function (req: any, res: any) {
    res.status('OK').send('Service Available')
})

app.post('./add-new-product', (req, res) => {
    var body = req.body
    var entity = body.data.newProductData
  
    if(entit == null) throw Error('Missing entity data.')
    
    let db = knex({
        client: 'postgresql',
        connection: {
            host: process.env.dbhost,
            database: process.env.dbname,
            user: process.env.user,
            password: process.env.password
          }
    })

    // const hggh = await knex('khj').countDistinct('id').where({ id: 'id value' })
    db.raw(`SELECT * from roduct_table WHERE id=${entity.id}`).then(res => {
        if (res.length > 0) throw new Error('Duplicated entity')
    })

    return db.raw(`INSERT INTO table (id, name, price, stock) VALUES ('${entity.id}', '${entity.name}', '${entity.price}', '${typeof entity.stock === 'number' ? entity.stock : 0}')`).then(() => {
        response.status(StatusCodes.OK).json({
            code: StatusCodes.OK,
            result: 'Product created'
        })
    })
})

app.post('./update-product', (req, response) => {
    var body = req.body
    var data = body.data.newProductData
  
    if(data == null) throw Error('Missing product data.')
    
    let db = knex({
        client: 'postgresql',
        connection: {
            host: process.env.dbhost,
            database: process.env.dbname,
            user: process.env.user,
            password: process.env.password
        }
    })

    // const hggh = await knex('khj').countDistinct('id').where({ id: 'id value' })
    // db.raw(`SELECT * from roduct_table WHERE id=${entity.id}`).then(res => {
    //     if (res.length > 0) throw new Error('Duplicated entity')
    // })

    if(data.type === "buy") {
        const quantity = data.quantity
        var products = db.raw('SELECT * FROM product_table LIMIT ' + limit).then(
            products =>  {
                var found = false
                for(var product of products) {
                    if(product.id = data.product_id) {
                        found = true
                        var stkA = product.stock
                        stkA = stkA - quantity
                        var newStock = stkA
                        req = `UPDATE product_table SET stock = ${newStock} WHERE id = ${data.product_id}`
                        db.raw(req).then(() => {
                            response.status(StatusCodes.OK).json({
                                code: StatusCodes.OK,
                                result: 'Product updated'
                            })
                        })
                    }
                }
                if(!found) throw new Error('Product not found')
            }
        )
    }
})

app.get('/products-by-ids', async (request, response) => {
    const productsIds = request.body.data
    const productsByIds = await getProductsByIds(productsIds)
    response.status(StatusCodes.OK).json({
        code: StatusCodes.OK,
        result: productsByIds
    })
})

app.listen(port, () => console.log(`Service ok port 8080`))

export default app
