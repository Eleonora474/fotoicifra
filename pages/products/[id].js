
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Price from '../../components/Price'
import createContentfulClient from '../../utils/createContentfulClient'
import Carusel from '../../components/Carusel'
import { Grid, Card, Button } from 'semantic-ui-react'
import { useState } from 'react'

const client = createContentfulClient()



export default function Product({ product }) {
  const { description, title, images, price, penny } = product.fields
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    images: [],
    client: '',
    phone: '',
    name: '',
    text: '',
    product: title,
  })
  function closeModal() {
    setForm({
      images: [],
      client: '',
      phone: '',
      name: '',
      text: '',
      product: title,
    })
    setLoading(false)
    setIsModalOpen(false)
  }
  function openModal() {
    setIsModalOpen(true)
  }
  function onFormChange(e) {
    setForm(prevForm => ({ ...prevForm, [e.target.name]: e.target.value }))
  }
  function onFilesChange(e) {
    setForm(prevForm => ({ ...prevForm, images: e.target.files }))
  }
  function makeOffer(e) {
    e.preventDefault()
    async function send() {
      const formData = new FormData()
      for (let i = 0; i < form.images.length; i++) {
        formData.append('images', form.images[i])
      }
      const API_URL = 'https://fotoicifraserver.herokuapp.com/sendmail'

      formData.append('phone', form.phone)
      formData.append('client', form.client)
      formData.append('name', form.name)
      formData.append('text', form.text)
      formData.append('product', form.product)
      try {
        setLoading(true)

        await fetch(API_URL, { method: 'POST', body: formData })
      } catch (e) {
        console.log(e)
      } finally {
        closeModal()

      }
    }
    send()
  }
  return (
    <>
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
              <Button color={'orange'} onClick={openModal}>
                Оформить заказ
              </Button>
              <Card.Description
                content={documentToReactComponents(description)}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
      {isModalOpen && (
        <form onSubmit={makeOffer}>
          <input
            onChange={onFilesChange}
            required
            type='file'
            name='images'
            multiple
            accept='image/*'
          />
          <input
            onChange={onFormChange}
            required
            type='email'
            name='client'
            placeholder='Ваш email'
            value={form.client}
          />
          <input
            onChange={onFormChange}
            required
            type='text'
            name='phone'
            placeholder='Ваш номер телефона'
            value={form.phone}
          />
          <input
            onChange={onFormChange}
            required
            type='text'
            name='name'
            placeholder='Ваше имя'
            value={form.name}
          />
          <input
            onChange={onFormChange}
            required
            type='text'
            name='text'
            placeholder='Ваш комментарий'
            value={form.text}
          />
          <input
            onChange={onFormChange}
            type='text'
            name='product'
            value={form.product}
            hidden
          />
          <button type='submit' disabled={loading}>
            {loading ? 'Отпраляется...' : 'Отправить'}
          </button>
          <button type='button' onClick={closeModal} disabled={loading}>
            Отменить
          </button>
        </form>
      )}
    </>
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
