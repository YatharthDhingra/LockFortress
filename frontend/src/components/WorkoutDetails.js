import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout, verify }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [flag, setFlag] = useState(null)

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  const viewPswd = () => {
    setFlag(1)
    setTimeout(function () {
      setFlag(null)
    }, 5000);
  }
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      {!verify && <p>Verify OTP first</p>}
      {verify && !flag && <button onClick={viewPswd}>View Password</button>}
      {verify && flag && <p><strong>Password: </strong>{workout.load}</p>}
      <p><strong>Tags: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span style={{ "color": "#3D0000" }} className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails