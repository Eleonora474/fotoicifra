import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

// pages
const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const categories = await contentfulClient.getEntries({
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
  // console.log('памаигте', params)
  console.log(JSON.stringify(params, null, 4))
  // const { items: categories } = await categories.getEntries({
  //   content_type: 'categories',
  //   'fields.slug': params.slug,
  // })

  return {
    props: {
      /* category: items[0]  */
    },
  }
}

export default function Details({ categories }) {
  const { featuredImage, title, description, price } = categories.fields

  console.log(categories)
  return (
    <div>
      <div className="">
        {/* <Image
          src={'https:' + featuredImage.fields.file.url}
          width={featuredImage.fields.file.details.image.width}
          height={featuredImage.fields.file.details.image.height}
        /> */}
      </div>

      <div>
        <div>
          <h3>{title}</h3>
          <p>Цена: {price} руб.</p>
        </div>

        <div className="">
          <h3>Описание товара:</h3>
          <div>{documentToReactComponents(description)}</div>
        </div>
      </div>
    </div>
  )
}
