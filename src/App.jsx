import { useGuestSession } from './useGuestSession'
import { useTasks } from './useTasks'
import Board from './components/Board'

function App() {
  const { userId, loading: sessionLoading } = useGuestSession()
  const { tasks, loading: tasksLoading, error } = useTasks(userId)

  if (sessionLoading || tasksLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading your board...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-500">Something went wrong: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-xl font-bold text-gray-800">Task Board</h1>
      </header>
      <Board tasks={tasks} />
    </div>
  )
}

export default App