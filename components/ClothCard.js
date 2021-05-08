import Link from 'next/link'
import Image from 'next/image'

export default function Card({ cloth }) {
  const { title, slug, price, thumbnail } = cloth.fields
  return (
    <div>
      <div className="">
        {/* <Image
          src={'https:' + thumbnail.fields.file.url}
          width={thumbnail.fields.file.details.image.width}
          height={thumbnail.fields.file.details.image.height}
        /> */}
      </div>
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
