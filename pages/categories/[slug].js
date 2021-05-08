import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

// cloth pages
const cloth = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export const getStaticPaths = async () => {
  const res = await cloth.getEntries({
    content_type: 'cloth',
  })

  const paths = res.items.map((item) => {
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
  const { items } = await cloth.getEntries({
    content_type: 'cloth',
    'fields.slug': params.slug,
  })

  return {
    props: { cloth: items[0] },
  }
}

export default function Details({ cloth }) {
  const { featuredImage, title, description, price } = cloth.fields
  console.log(description)
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

//souvenirs
