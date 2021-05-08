import { createClient } from 'contentful'
import ProductsCard from '../components/ProductsCard'

export async function getStaticProps() {
  const product = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await product.getEntries({ content_type: 'products' })

  return {
    props: {
      productss: res.items,
    },
  }
}

export default function Products({ productss }) {
  console.log(productss)
  return (
    <div className="products">
      {productss.map((products) => (
        <ProductsCard key={products.sys.id} products={products} />
      ))}

      <style jsx>{`
        .products {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
