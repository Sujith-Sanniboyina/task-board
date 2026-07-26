import { useState } from 'react'
import { useGuestSession } from './useGuestSession'
import { useTasks } from './useTasks'
import Board from './components/Board'
import NewTaskModal from './components/NewTaskModal'
import BoardSkeleton from './components/BoardSkeleton'
import BoardStats from './components/BoardStats'
import BoardFilters from './components/BoardFilters'

function App() {
  const { userId, loading: sessionLoading } = useGuestSession()
  const { tasks, loading: tasksLoading, error, insertTask, updateTaskStatus } = useTasks(userId)
  const [modalStatus, setModalStatus] = useState(null)
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')

  if (sessionLoading || tasksLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Task Board</h1>
        </header>
        <BoardSkeleton />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          <div className="text-4xl mb-3">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-800">Couldn't load your board</h2>
          <p className="text-sm text-gray-500 mt-1">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 text-sm bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  async function handleCreate(newTask) {
    return insertTask({ ...newTask, user_id: userId })
  }

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result
    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return
    if (destination.droppableId !== source.droppableId) {
      updateTaskStatus(draggableId, destination.droppableId)
    }
  }

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter
    return matchesSearch && matchesPriority
  })
  
  const isFiltering = search.trim() !== '' || priorityFilter !== 'all'

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Task Board</h1>
          <p className="text-xs text-gray-400 mt-0.5">{tasks.length} tasks total</p>
        </div>
        <button
          onClick={() => setModalStatus('todo')}
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm"
        >
          + New Task
        </button>
      </header>

      <BoardStats tasks={tasks} />
      <BoardFilters
        search={search}
        onSearchChange={setSearch}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <Board tasks={filteredTasks} onAddTask={setModalStatus} onDragEnd={handleDragEnd} isFiltering={isFiltering} />

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