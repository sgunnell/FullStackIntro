import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"


describe("<Blog />", () => {

  const blog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: {
      username: "username",
      name: "name",
    },
  }

  let component
  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog key={blog.id} blog={blog} updateLikes={likeMockHandler} />
    )
  })

  test("renders title and author but not url or likes by default", () => {

    expect(component.container.querySelector(".title")).toHaveTextContent(blog.title)
    expect(component.container.querySelector(".author")).toHaveTextContent(blog.author)

    expect(component.queryByText(blog.url)).not.toBeInTheDocument()
    expect(component.queryByText("like")).not.toBeInTheDocument()

  })

  test("at the start the children are non displayed", () => {
    const details = component.container.querySelector(".blog-details")

    expect(details).toEqual(null)
  })

  test("renders blog details when view button is clicked", () => {
    const viewButton = component.container.querySelector("button")
    fireEvent.click(viewButton)

    const blogDetails = component.container.querySelector(".blog-details")
    expect(blogDetails).toBeInTheDocument()
  })

  test("renders blog details when view button is clicked", () => {
    const viewButton = component.container.querySelector("button")
    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector("button")
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})