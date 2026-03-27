import { clearNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10
  }

  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification)

  if (notification !== '') {
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return <div style={style}>{notification}</div>
}

export default Notification
