import React from 'react'

export default function Price({price, penny}) {
	return (
    <p>
      {price} руб.{' '}
      {penny ? penny + ' коп.' : ''}
    </p>
  )
}
