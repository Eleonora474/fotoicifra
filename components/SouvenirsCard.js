import Link from 'next/link'

export default function Card({ souvenirs }) {
  const { title, slug, price, thumbnail } = souvenirs.fields
  return (
    <div>
      <div>{/* image - thumbnail */}</div>
      <div>
        <div>
          <h4>{title}</h4>
          <p>Цена: {price} руб.</p>
        </div>
        <div>
          <Link href={'/categories/' + slug}>
            <a>Подробнее</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
