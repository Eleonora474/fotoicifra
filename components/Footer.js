import React from 'react'
import { List } from 'semantic-ui-react'
import { Email, Vk, Phone, Telegram, Viber, Whatsapp } from './Icons'

const Footer = () => {
  return (
    <List horizontal style={{ textAlign: 'center', marginTop: '1rem' }}>
      <List.Item href='https://api.whatsapp.com/send?phone=+79536027027&text=' target="_blank">
        <Whatsapp />
      </List.Item>
      <List.Item href='print@fotoicifra.ru' target="_blank">
        <Email />
      </List.Item>
      <List.Item href='https://vk.com/printfotoicifra_1' target="_blank">
        <Vk />
      </List.Item>

      <List.Item href='https://t.me/TerritoriyaFoto' target="_blank">
        <Telegram />
      </List.Item>
      <List.Item href='#'>
        <Viber />
      </List.Item>
      <List.Item href='tel:+79536027027'>
        <Phone />
      </List.Item>
    </List>
  )
}

export default Footer
