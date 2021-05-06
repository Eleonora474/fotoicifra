import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const NotFound = () => {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 4000)
  }, [])

  return (
    <div className="not-found">
      <h1>Ошибка 404</h1>
      <h2>Страница не найдена...</h2>
      <p>То, что Вы ищите, не существует или пока не создано :(</p>
      <p>
        Вернуться на{' '}
        <Link href="/">
          <a>Главную </a>
        </Link>{' '}
        страницу?
      </p>
    </div>
  )
}

export default NotFound
