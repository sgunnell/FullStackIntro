import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  const component = render(<BlogForm createBlog={createBlog} />)

  const titleInput = component.container.querySelector("input[name='title'")
  const authorInput = component.container.querySelector("input[name='author'")
  const urlInput = component.container.querySelector("input[name='url'")
  const sendButton = screen.getByText("create")

  await user.type(titleInput, "Jeffery")
  await user.type(authorInput, "Dahmer")
  await user.type(urlInput, "https://en.wikipedia.org/wiki/Jeffrey_Dahmer")
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toBe("Jeffery")
  expect(createBlog.mock.calls[0][1]).toBe("Dahmer")
  expect(createBlog.mock.calls[0][2]).toBe("https://en.wikipedia.org/wiki/Jeffrey_Dahmer")
})