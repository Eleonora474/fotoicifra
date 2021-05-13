import React from 'react'
import Image from 'next/image'
import Price from './Price'
import Link from 'next/link'
import { Card, Button } from 'semantic-ui-react'

export default function ProductCard({
  penny,
  price,
  title,
  imageUrl,
  productId,
}) {
  return (
    <Card>
      <Image
        src={'https:' + imageUrl}
        width={100}
        height={100}
        objectFit='cover'
        layout='responsive'
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>
          <Price price={price} penny={penny} />
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link href={'/products/' + productId}>
          <a>
            <Button basic color='orange'>
              Подробнее
            </Button>
          </a>
        </Link>
      </Card.Content>
    </Card>
  )
}
