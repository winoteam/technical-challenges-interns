import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "./Link";
import { fetchProduct } from './utils/network'
import { ProductDetails, Product as ProductType } from "./utils/types";

type ProductActions = {
  addProduct: (value: ProductDetails) => void
  removeProduct: (value: ProductType) => void
}

const Product = (props: { actions: ProductActions } ) => {
 var { id } = useParams<{ id: string }>()
 const [product, setProduct] = useState(null)
 const deps = [id]

 useEffect(() => {
  fetchProduct(id).then((data) => {
    setProduct(data)
  })
 }, deps)

 if (!product) {
  return <div>Loading ...</div>
 }

 return (
    <React.Fragment>
    <div style={{
      border: '10px solid black',
      padding: 5,
    }}>
      <b>{product.title} - {product.price}</b>
      <p>{product.category}</p>
      <img src={product.image} width={50} height={50} />
      <p>{product.description}</p>
      <button onClick={() => props.actions.addProduct(product)}>
        ADD TO CART
      </button>
      <button onClick={() => props.actions.removeProduct(product)}>
        REMOVE FROM CART
      </button>
    </div>
    <Link href="/"><p>Go Back</p></Link>
    </React.Fragment>
  )
}

export { Product }