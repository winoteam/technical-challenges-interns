import axios from 'axios'
import { Product } from './types'

export async function fetchProducts(): Promise<Product[]> {
  const result = await axios.get('https://fakestoreapi.com/products')
  if (result) {
    return result.data
  }
  return []
}

export async function fetchProduct(id): Promise<Product> {
  const result = await axios.get(`https://fakestoreapi.com/products/${id}`)
  return result.data
}