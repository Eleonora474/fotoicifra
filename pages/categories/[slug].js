import { createClient } from 'contentful'
import ProductList from '../../components/ProductList'
import createContentfulClient from '../../utils/createContentfulClient'

const client = createContentfulClient()

export default function Category({ products }) {
  return <ProductList products={products} />
}

export const getStaticPaths = async () => {
  const categories = await client.getEntries({
    content_type: 'categories',
  })

  const paths = categories.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { items } = await client.getEntries({
    content_type: 'product',
    'fields.category.sys.contentType.sys.id': 'categories',
    'fields.category.fields.slug': params.slug,
  })
  return {
    props: { products: items },
  }
}
