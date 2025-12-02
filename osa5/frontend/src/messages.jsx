const Message = ({ messageArray }) => {

  if (messageArray === null) {
    return null
  }

  const messageStyle = {
    background: 'lightgray',
    borderRadius: '5px',
    padding: '5px',
    margin: '10px',
    fontSize: '18px',
    color: messageArray[1],
    border: `solid 3px ${messageArray[1]}`
  }

  return (
    <div style={messageStyle}>
      <p>{messageArray[0]}</p>
    </div>
  )
}

export { Message }