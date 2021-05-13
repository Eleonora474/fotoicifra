import React from 'react'
import ProductCard from './ProductCard'
import {Card} from 'semantic-ui-react'
export default function ProductList({products}) {
	if (!products.length) return <h1>Товаров нет...</h1>
	return (
    <Card.Group centered>
      {products.map(product => (
        <ProductCard
          key={product.sys.id}
          imageUrl={product.fields.image.fields.file.url}
          title={product.fields.title}
          price={product.fields.price}
          penny={product.fields.penny}
          productId={product.sys.id}
        />
      ))}
    </Card.Group>
  )
}
