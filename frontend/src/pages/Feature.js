// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// import { useAuthContext } from "../hooks/useAuthContext"

// components
// import WorkoutDetails from '../components/WorkoutDetails'
// import WorkoutForm from '../components/WorkoutForm'

const Feature = () => {
    // const { workouts, dispatch } = useWorkoutsContext()
    // const { user } = useAuthContext()
    // const [searchTerm, setSearchTerm] = useState('')

    // useEffect(() => {
    //     const fetchWorkouts = async () => {
    //         const response = await fetch('/api/workouts', {
    //             headers: { 'Authorization': `Bearer ${user.token}` },
    //         })
    //         const json = await response.json()

    //         if (response.ok) {
    //             dispatch({ type: 'SET_WORKOUTS', payload: json })
    //         }
    //     }

    //     if (user) {
    //         fetchWorkouts()
    //     }
    // }, [dispatch, user])

    return (
        <div className="">
            <Link to="/home">Password Manager</Link>
            <br />
            <Link to="">Password Strenth Checker</Link>
            <br />
            <a href="http://localhost:4000/fileshare">Doc Share</a>
            <br />
            <Link to="">Ask AI</Link>
            <br />
            <Link to="">Hide in Images</Link>
        </div>
    )
}

export default Feature