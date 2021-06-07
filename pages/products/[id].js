import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Price from '../../components/Price'
import createContentfulClient from '../../utils/createContentfulClient'
import Carusel from '../../components/Carusel'
import { Grid, Card, Button, Modal, Form } from 'semantic-ui-react'
import { useState } from 'react'

const client = createContentfulClient()

export default function Product({ product }) {
  const { description, title, images, price, penny, isImagesInOrder} = product.fields
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

      <Modal open={isModalOpen} onClose={closeModal}>
        <Modal.Header>Оформление заказа</Modal.Header>
        <Modal.Content>
          <Form loading={loading} onSubmit={makeOffer}>
            {isImagesInOrder && (<Form.Input
              onChange={onFilesChange}
              required
              type='file'
              label='Ваши изображения'
              name='images'
              multiple
              accept='image/*'
            />)}
            <Form.Input
              onChange={onFormChange}
              required
              type='email'
              name='client'
              label='Введите Ваш email'
              placeholder='Ваш email'
              value={form.client}
            />
            <Form.Input
              onChange={onFormChange}
              required
              type='text'
              name='phone'
              label='Введите Ваш номер телефона'
              placeholder='Ваш номер телефона'
              value={form.phone}
            />
            <Form.Input
              onChange={onFormChange}
              required
              type='text'
              name='name'
              label='Введите Ваше имя'
              placeholder='Ваше имя'
              value={form.name}
            />
            <Form.Input
              onChange={onFormChange}
              required
              type='text'
              name='text'
              label='Введите Ваш комментарий'
              placeholder='Ваш комментарий'
              value={form.text}
            />
            <Button onClick={closeModal} disabled={loading} basic color='grey'>
              Отменить
            </Button>
            <Button disabled={loading} type='submit' color='orange'>
              {loading ? 'Отпраляется...' : 'Отправить'}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
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
