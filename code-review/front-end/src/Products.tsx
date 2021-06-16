import { useEffect, useState } from 'react';

import { pageVisited } from './utils/utils'
import { fetchProducts } from './utils/network'
import { Link } from './Link';

export default function () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {
      const data = await fetchProducts()
      setProducts(data)
    })();
  }, [])

  useEffect(() => {
    pageVisited('Products')
  })

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: 4
    }}>
      {products.map((x) => {
        return (
          <div style={{
            border: '10px solid black',
            padding: 5,
          }}>
            <b>{x.title} - {x.price}</b>
            <p>{x.category}</p>
            <img src={x.image} width={50} height={50} />
            <p>{x.description}</p>
            <Link href={`/product/${x.id}`}>More details</Link>
          </div>
        )
      })}
    </div>
  );
}
