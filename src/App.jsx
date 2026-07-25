import { useState } from 'react'
import { useGuestSession } from './useGuestSession'
import { useTasks } from './useTasks'
import Board from './components/Board'
import NewTaskModal from './components/NewTaskModal'

function App() {
  const { userId, loading: sessionLoading } = useGuestSession()
  const { tasks, loading: tasksLoading, error, insertTask } = useTasks(userId)
  const [modalStatus, setModalStatus] = useState(null) // null = closed

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

  async function handleCreate(newTask) {
    return insertTask({ ...newTask, user_id: userId })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Task Board</h1>
        <button
          onClick={() => setModalStatus('todo')}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + New Task
        </button>
      </header>

      <Board tasks={tasks} onAddTask={setModalStatus} />

      {modalStatus && (
        <NewTaskModal
          defaultStatus={modalStatus}
          onClose={() => setModalStatus(null)}
          onCreate={handleCreate}
        />
      )}
    </div>
  )
}

export default App