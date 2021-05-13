import createContentfulClient from '../utils/createContentfulClient'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'

const client = createContentfulClient()

export async function getStaticProps() {
  const { items } = await client.getEntries({
    content_type: 'aboutus',
  })

  return {
    props: { about: items[0].fields.about },
  }
}
export default function Home({ about }) {
  return (
    <div>
      {documentToReactComponents(about, {
        renderNode: {
          'embedded-asset-block': (node) => (
            <div style={{ maxWidth: '300px' }}>
              <Image
                src={'https:' + node.data?.target?.fields?.file?.url}
                width={100}
                height={100}
                alt={node.data?.target?.fields?.title}
                layout="responsive"
              />
            </div>
          ),
        },
      })}
    </div>
  )
}
