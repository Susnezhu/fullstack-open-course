const Message = ({message}) => {

  if (message === null) {
    return null
  }

  const messageStyle = {
    background: "lightgray",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px",
    fontSize: "20px",
    color: message[1],
    border: `solid 3px ${message[1]}`
  }

  return (
    <div style={messageStyle}>
      {message[0]}
    </div>
  )
}

export { Message }