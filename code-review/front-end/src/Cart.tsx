import React from 'react'
import { Product } from './utils/types'
import { useWindowDimansions } from './utils/hooks'

export function Cart(props: { cart: { products: Product[], totalAmount: number } }) {
  const { width } = useWindowDimansions()

  return (
    <>
      {width > 200 && (
        <>
        <ol>
          {props.cart.products.map(x => {
            return (<li>{x.title}, {x.price}</li>)
          })}
        </ol>
        <br/>
        <p>total amount: {props.cart.totalAmount}</p>
        </>
      )}
      {width < 200 && (<p>Sorry your screen is small !</p>)}
    </>
  )
}