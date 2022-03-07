import request from 'supertest'
import app from '../src'

test.skip('The application is working', async () => {
    // On veut pouvoir ajouter un nouveau product
    const response = await request(app)
      .post('/add-new-product')
      .set('Content-Type', 'application/json')
      .send({ newProductData: {
        id: 1,
        name: 'a new product',
        price: '45.78€',
        stock: 102
      } })

    expect(response).toBe(response)
    expect(response.status).toBe(200)
    expect(response.text).toMatchSnapshot()
    expect(response.ok).toBe(true)
})
