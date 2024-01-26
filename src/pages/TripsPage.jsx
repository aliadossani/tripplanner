import { useState, useEffect } from 'react'

function TripsPage() {
  const [trips, setTrips] = useState([])

  const fetchTrips = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`)
      if (response.ok) {
        const tripData = await response.json()
        setTrips(tripData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTrips()
  }, [])

  return (
    <div>
      <h1>Trips page</h1>
      <ul>
<<<<<<< Updated upstream
        {trips.map(trip => (
          <li key={trip._id}>
            <p>{trip.title}</p>
=======
        {trips.map((trip) => (
          <li key={trip._id}>
          <Link to={`/trips/${trip._id}`}>
              <p>{trip.title}</p>
          </Link>
>>>>>>> Stashed changes
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TripsPage
