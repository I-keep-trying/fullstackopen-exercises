import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const title = screen.getByPlaceholderText('Title')
  const author = screen.getByPlaceholderText('Author')
  const url = screen.getByPlaceholderText('Url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'Title of test blog' },
  })
  fireEvent.change(author, {
    target: { value: 'AuthorFirst AuthorLast' },
  })
  fireEvent.change(url, {
    target: { value: 'www.examplewebsite.com' },
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe('Title of test blog')
  expect(createBlog.mock.calls[0][0].author).toBe('AuthorFirst AuthorLast')
  expect(createBlog.mock.calls[0][0].url).toBe('www.examplewebsite.com')
})

test('blog details not visible by default', () => {
  const blog = {
    title: 'Testing blog renders ok',
    author: 'Testy McTestFace',
    url: 'www.website.com',
    likes: 0,
    user: { id: 123 },
  }

  const user = {
    id: 123,
  }

  const component = render(<Blog blog={blog} user={user} />)

  expect(component.getByText('Testing blog renders ok')).toBeVisible()
  expect(component.getByText('like')).not.toBeVisible()
  expect(component.getByText('delete')).not.toBeVisible()
  expect(component.getByText(/Author:/)).not.toBeVisible()
  expect(component.getByText(/Url:/)).not.toBeVisible()
  expect(component.getByText(/Likes:/)).not.toBeVisible()
})

test('after clicking the button, blog details are displayed', () => {
  const blog = {
    title: 'Testing blog renders ok',
    author: 'Testy McTestFace',
    url: 'www.website.com',
    likes: 0,
    user: { id: 123 },
  }

  const user = {
    id: 123,
  }

  const component = render(<Blog blog={blog} user={user} />)
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.togglableContent')
  expect(div).not.toHaveStyle('display: none')
  expect(component.getByText(/Author:/)).toBeVisible()
  expect(component.getByText(/Url:/)).toBeVisible()
  expect(component.getByText(/Likes:/)).toBeVisible()
})

test('clicking the like button twice calls event handler twice', () => {
  const blog = {
    title: 'Testing blog renders ok',
    author: 'Testy McTestFace',
    url: 'www.website.com',
    likes: 0,
    user: { id: 123 },
  }

  const user = {
    id: 123,
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} addLike={mockHandler} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})
