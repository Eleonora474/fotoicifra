import { createClient } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Image from 'next/image'
import Price from '../../components/Price'
import createContentfulClient from '../../utils/createContentfulClient'
import Carusel from '../../components/Carusel'
import { Grid, Card, Button } from 'semantic-ui-react'

const client = createContentfulClient()

function getOfferLink(title) {
  const mail = ''
  const subject = 'Заявка'
  const body = `Мое имя:%0AМой номер телефона:%0AХочу "${title}" с прикрепленным к письму изображением%0A*Прикрепите свое изображение`
  return `mailto:${mail}?subject=${subject}&body=${body}`
}

export default function Product({ product }) {
  const { description, title, images, price, penny } = product.fields
  function makeOffer() {
    const link = getOfferLink(title)
    window.open(link, '_blank')
  }
  return (
    <Grid stackable columns={2}>
      <Grid.Column>
        <Carusel images={images} />
      </Grid.Column>
      <Grid.Column>
        <Card fluid>
          <Card.Content>
            <Card.Header content={title} />
            <Card.Meta>
              <Price price={price} penny={penny} />
            </Card.Meta>
            <Button color={'orange'} onClick={makeOffer}>Оформить заказ</Button>
            <Card.Description
              content={documentToReactComponents(description)}
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  )
}

export const getStaticPaths = async () => {
  const products = await client.getEntries({
    content_type: 'product',
  })

  const paths = products.items.map(item => {
    return {
      params: { id: item.sys.id },
    }
  })

  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps({ params }) {
  const product = await client.getEntry(params.id)
  return {
    props: { product },
  }
}
