import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  render(<Blog blog={blog} />)

  const elementTitle = screen.getByText('React patterns')
  const elementAuthor = screen.getByText('Michael Chan')
  expect(elementTitle).toBeDefined()
  expect(elementAuthor).toBeDefined()

})