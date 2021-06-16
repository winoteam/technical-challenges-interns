import { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Products from './Products'
import { Product as ProductComponent } from './Product'
import { Cart } from './Cart'
import { ProductDetails, Product } from './utils/types';

function App() {
  const [shop, setShop] = useState({ cart: { products: [], totalAmount: 0 } })

  const addProductHandler = (product: ProductDetails) => {
    setShop((old) => ({
      ...old,
      cart: {
        ...old.cart,
        products: [...old.cart.products, product],
        totalAmount: old.cart.totalAmount + product.price,
      }
    }))
  }

  const removeProductHandler = (product: Product) => {
    setShop((old) => {
      const index = old.cart.products.findIndex((x) => x.id === product.id)
      if (index < 0) {
        return old
      } else {
        return ({
          ...old,
          cart: {
            ...old.cart,
            products: old.cart.products.splice(index, -1),
            totalAmount: old.cart.totalAmount - product.price,
          }
        })
      }
    })
  }

  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Products />
          </Route>
          <Route path="/product/:id">
            <ProductComponent
              actions={{
                addProduct: addProductHandler,
                removeProduct: removeProductHandler
              }}
            ></ProductComponent>
          </Route>
          <Route path="/cart">
            <Cart cart={shop.cart}></Cart>
          </Route>
        </Switch>
    </Router>
  )
}

export default App;
