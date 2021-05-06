import { createClient } from 'contentful'
import PrintCard from '../components/PrintCard'

export async function getStaticProps() {
  const print = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await print.getEntries({ content_type: 'print' })

  return {
    props: {
      prints: res.items,
    },
  }
}

export default function Prints({ prints }) {
  console.log(prints)
  return (
    <div>
      {prints.map((print) => (
        <PrintCard key={print.sys.id} print={print} />
      ))}
    </div>
  )
}
