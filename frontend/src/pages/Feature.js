// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
// import { useAuthContext } from "../hooks/useAuthContext"

// components
// import WorkoutDetails from '../components/WorkoutDetails'
// import WorkoutForm from '../components/WorkoutForm'

const Feature = () => {
    const mystyle = {
        backgroundColor: "white",
        color: "black",
        border: "2px solid #3D0000",
        padding: "10px 20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inline - block",
        fontSize: "30px"

    };
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
            <center>
                <br />
                <br />
                <br />
                <Link to="/home" style={mystyle}>🔐 Password Manager</Link>
                <br />
                <br />
                <br />
                <br />
                <Link to="" style={mystyle}>💪 Password Strength Checker/Generator</Link>
                <br />
                <br />
                <br />
                <br />
                <a href="http://localhost:4000/fileshare" style={mystyle}>📤 Doc Share</a>
                <br />
                <br />
                <br />
                <br />
                <a href="http://localhost:4000/landingpage" style={mystyle}>🔙Landing Page</a>
            </center>
        </div >
    )
}

export default Feature