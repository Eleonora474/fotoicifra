import { Image } from 'semantic-ui-react'
import { Menu, Header } from 'semantic-ui-react'
import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()

  function handleItemClick(e, { href }) {
    e.preventDefault()
    router.push(href)
  }
  return (
    <Menu stackable>
      <Menu.Item href="/" onClick={handleItemClick}>
        <Image avatar src={'/logo.jpeg'} />
        <Header as="h1" className="logo">
          Фото и Цифра
        </Header>
      </Menu.Item>

      <Menu.Item href="/categories/suveniry" onClick={handleItemClick}>
        Сувениры с фото
      </Menu.Item>

      <Menu.Item href="/categories/foto-pechat" onClick={handleItemClick}>
        Фото печать
      </Menu.Item>

      <Menu.Item href="/categories/pechat-na-odezhde" onClick={handleItemClick}>
        Печать на одежде
      </Menu.Item>
      <Menu.Item href="/categories/tovary" onClick={handleItemClick}>
        Товары
      </Menu.Item>
    </Menu>
  )
}

export default Navbar
