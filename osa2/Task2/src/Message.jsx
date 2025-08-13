const Message = ({message}) => {
  const messageStyle = {
    color: "green",
    background: "lightgray",
    border: "solid 3px green",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px",
    fontSize: "20px"
  }

  if (message === null) {
    return null
    }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const ErrorMessage = ({message}) => {
  const messageStyle = {
    color: "red",
    background: "lightgray",
    border: "solid 3px red",
    borderRadius: "5px",
    padding: "15px",
    margin: "10px",
    fontSize: "20px"
  }

  if (message === null) {
    return null
    }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

export {Message, ErrorMessage}