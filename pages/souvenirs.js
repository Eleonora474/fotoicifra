import { createClient } from 'contentful'
import SouvenirsCard from '../components/SouvenirsCard'

export async function getStaticProps() {
  const souv = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await souv.getEntries({ content_type: 'souvenirs' })

  return {
    props: {
      souvenir: res.items,
    },
  }
}

export default function Souvenir({ souvenir }) {
  console.log(souvenir)
  return (
    <div>
      {souvenir.map((souvenirs) => (
        <SouvenirsCard key={souvenirs.sys.id} souvenirs={souvenirs} />
      ))}
    </div>
  )
}
