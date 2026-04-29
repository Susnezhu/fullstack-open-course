import { useReducer, useEffect } from "react"

const messageStyle = {
  background: "lightgray",
  borderRadius: "5px",
  padding: "5px",
  margin: "10px",
  fontSize: "18px",
};

export const initialState = {
  message: "",
  type: null, // 'error' or 'confirm'
  visible: false,
}

export function notificationReducer(state, action) {
  switch (action.type) {
    case 'show_error': {
      return {
        message: action.message,
        type: "error",
        visible: true,
      }
    }
    case 'show_confirm': {
      return {
        message: action.message,
        type: "confirm",
        visible: true,
      }
    }
    case "hide": {
      return { 
        ...state, visible: false }
    }
    default: {
      return state
    }
  }
}

const Notification = ({ state, dispatch }) => {

  useEffect(() => {
    if (!state.visible) return

    const timer = setTimeout(() => {
      dispatch({ type: "hide" })
    }, 5000)

    return () => clearTimeout(timer)
  }, [state.visible, dispatch])

  if (!state.visible) return null

  const style = {
    ...messageStyle,
    color: state.type === "error" ? "red" : "green",
    border: `solid 3px ${state.type === "error" ? "red" : "green"}`
  }

  return (
    <div style={style}>
      <p>{state.message}</p>
    </div>
  )
}

export default Notification