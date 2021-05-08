import { createClient } from 'contentful'
import ClothCard from '../components/ClothCard'

export async function getStaticProps() {
  const cloth = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await cloth.getEntries({ content_type: 'cloth' })

  return {
    props: {
      cloths: res.items,
    },
  }
}

export default function Cloth({ cloths }) {
  console.log(cloths)
  return (
    <div className="cloth">
      {cloths.map((cloth) => (
        <ClothCard key={cloth.sys.id} cloth={cloth} />
      ))}

      <style jsx>{`
        .cloth {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
