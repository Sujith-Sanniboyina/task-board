import { useGuestSession } from './useGuestSession'

function App() {
  const { userId, loading } = useGuestSession()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Task Board</h1>
        <p className="text-sm text-gray-400 mt-2">Guest ID: {userId}</p>
      </div>
    </div>
  )
}

export default App