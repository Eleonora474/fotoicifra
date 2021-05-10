import { createClient } from 'contentful'
import CategoriesCard from '../components/CategoriesCard'

export async function getStaticProps() {
  const categories = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await categories.getEntries({ content_type: 'categories' })

  return {
    props: {
      category: res.items,
    },
  }
}

export default function Categories({ categories }) {
  console.log(categories)
  return (
    <div className="categories">
      {category.map((categories) => (
        <CategoriesCard key={categories.sys.id} categories={categories} />
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
