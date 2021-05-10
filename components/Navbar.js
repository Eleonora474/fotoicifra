import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <h1>Фото и Цифра</h1>
      </div>
      <Link href="/">
        <a>Главная</a>
      </Link>
      <Link href="/categories">
        <a>Категории</a>
      </Link>
      {/* <Link href="/print">
        <a>Фото печать</a>
      </Link>
      <Link href="/cloth">
        <a>Печать на одежде</a>
      </Link>
      <Link href="/products">
        <a>Товары</a>
      </Link> */}
    </nav>
  )
}

export default Navbar
