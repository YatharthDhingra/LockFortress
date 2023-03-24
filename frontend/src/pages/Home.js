import { useEffect, useState } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className="home">

      <div className="workouts">
        <input type="text" placeholder="Search..." onChange={(event) => {
          setSearchTerm(event.target.value);
        }} />
        {workouts && workouts.filter((workout) => {
          if (searchTerm === "") {
            return workout
          } else if (workout.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return workout
          }
        }).map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home