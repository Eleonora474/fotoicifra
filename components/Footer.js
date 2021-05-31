import React from 'react'
import { List } from 'semantic-ui-react'
import { Email, Vk, Phone, Telegram, Viber, Whatsapp } from './Icons'

const Footer = () => {
  return (
    <List horizontal style={{ textAlign: 'center', marginTop: '1rem' }}>
      <List.Item href='#'>
        <Whatsapp />
      </List.Item>
      <List.Item href='#'>
        <Email />
      </List.Item>
      <List.Item href='#'>
        <Vk />
      </List.Item>

      <List.Item href='#'>
        <Telegram />
      </List.Item>
      <List.Item href='#'>
        <Viber />
      </List.Item>
      <List.Item href='#'>
        <Phone />
      </List.Item>
    </List>
  )
}

export default Footer
