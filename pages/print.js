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
    <div className="print">
      {prints.map((print) => (
        <PrintCard key={print.sys.id} print={print} />
      ))}

      <style jsx>{`
        .print {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
