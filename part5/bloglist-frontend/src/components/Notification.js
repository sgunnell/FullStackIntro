import React from "react"

const Notification = ({ message }) => {
  // Check for null or undefined with == instead of ===
  // eslint-disable-next-line eqeqeq
  if (message == null) {
    return null
  }

  return <div className={message.type}>{message.text}</div>
}

export default Notification